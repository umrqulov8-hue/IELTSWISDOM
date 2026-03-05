import { NextRequest, NextResponse } from "next/server";
import { verifyAuth, getOpenAIClient, errorResponse, logApiError } from "@/lib/api-utils";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const writingCheckSchema = z.object({
  taskType: z.enum(["task-1", "task-2"]),
  prompt: z.string().min(1).max(2000),
  essay: z.string().min(20, "Essay is too short").max(5000, "Essay is too long (max 5000 characters)"),
});

const SYSTEM_PROMPT = `You are an official IELTS examiner with 20+ years of experience. Your job is to evaluate IELTS Writing responses using the official band descriptors.

You MUST respond ONLY with valid JSON in this exact format:
{
  "overallBand": number,
  "criteria": {
    "taskAchievement": {
      "band": number,
      "title": "Task Achievement",
      "feedback": "string (2-3 sentences of specific feedback)",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "coherenceCohesion": {
      "band": number,
      "title": "Coherence & Cohesion",
      "feedback": "string (2-3 sentences of specific feedback)",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "lexicalResource": {
      "band": number,
      "title": "Lexical Resource",
      "feedback": "string (2-3 sentences of specific feedback)",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "grammaticalRange": {
      "band": number,
      "title": "Grammatical Range & Accuracy",
      "feedback": "string (2-3 sentences of specific feedback)",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    }
  },
  "summaryComment": "string (overall encouraging 2-3 sentence summary)",
  "topTips": ["string", "string", "string"]
}

IELTS Band Descriptors for reference:

TASK ACHIEVEMENT (Task 1) / TASK RESPONSE (Task 2):
- Band 9: Fully addresses all parts. Format is appropriate.
- Band 8: Covers requirements relevantly/sufficiently. Key features highlighted.
- Band 7: Covers requirements. Format is appropriate.
- Band 6: Addresses requirements but some parts inadequately.
- Band 5: Generally addresses task but there may be significant omissions.
- Band 4: Attempts to address task but is tangential or limited.

COHERENCE & COHESION:
- Band 9: Cohesion used skillfully. Paragraphing managed skillfully.
- Band 8: Logically sequenced. Cohesion well managed.
- Band 7: Clear progression. Cohesive devices used flexibly.
- Band 6: Information organized coherently. Cohesion may be faulty.
- Band 5: Organization evident but not wholly logical.
- Band 4: Information/ideas not arranged coherently.

LEXICAL RESOURCE:
- Band 9: Full flexibility and precise use. Rare errors.
- Band 8: Wide resource used fluently and flexibly.
- Band 7: Sufficient range. Less common vocabulary used.
- Band 6: Adequate range. Higher degrees of inaccuracy.
- Band 5: Limited range but minimally adequate.
- Band 4: Limited vocabulary. Inappropriate word choice.

GRAMMATICAL RANGE & ACCURACY:
- Band 9: Wide range with full flexibility. Rare errors.
- Band 8: Wide range flexibly and accurately used.
- Band 7: Variety of complex structures. Frequent error-free sentences.
- Band 6: Mix of simple/complex. Errors rarely impede communication.
- Band 5: Limited range. Errors may cause difficulty.
- Band 4: Attempts complex structures. Frequent errors.

Calculate overallBand as the mean of all 4 criteria, rounded to nearest 0.5. Be honest and realistic. Always return JSON.`;

export async function POST(req: NextRequest) {
  try {
    // 🔐 Authentication — previously missing, now required
    const user = await verifyAuth(req);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    // 📋 Input validation with zod
    const body = await req.json().catch(() => ({}));
    const validation = writingCheckSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const { taskType, prompt, essay } = validation.data;

    // 🤖 Use shared OpenAI client (with built-in 30s timeout + 2 retries)
    const openai = getOpenAIClient();

    const userMessage = `Please evaluate this IELTS ${taskType === "task-1" ? "Writing Task 1" : "Writing Task 2"} response.

TASK PROMPT:
${prompt}

STUDENT'S ESSAY:
${essay}

Respond ONLY with the JSON evaluation.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;
    if (!raw) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(raw);
    return NextResponse.json(result);

  } catch (err) {
    logApiError("AI Writing Check", err);
    return errorResponse(
      "Writing evaluation failed. Please try again.",
      500,
      err instanceof Error ? err.message : undefined
    );
  }
}
