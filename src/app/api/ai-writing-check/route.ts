import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
- Band 6: Addresses requirements but some parts inadequately. Format generally appropriate.
- Band 5: Generally addresses task but there may be significant omissions.
- Band 4: Attempts to address task but is tangential or has limited response.

COHERENCE & COHESION:
- Band 9: Cohesion used skillfully. Paragraphing managed skillfully.
- Band 8: Logically sequenced. Cohesion well managed. Paragraphing used sufficiently.
- Band 7: Clear progression. Cohesive devices used flexibly.
- Band 6: Information organized coherently. Cohesion may be faulty.
- Band 5: Organization evident but not wholly logical. May lack overall progression.
- Band 4: Information/ideas not arranged coherently. Limited use of cohesive devices.

LEXICAL RESOURCE:
- Band 9: Full flexibility and precise use. Rare errors in spelling/word formation.
- Band 8: Wide resource used fluently and flexibly. Occasional inaccuracies.
- Band 7: Sufficient range. Less common vocabulary used. Few errors.
- Band 6: Adequate range. Variety but higher degrees of inaccuracy.
- Band 5: Limited range but minimally adequate. Noticeable errors.
- Band 4: Limited vocabulary. Inappropriate word choice may impede meaning.

GRAMMATICAL RANGE & ACCURACY:
- Band 9: Wide range used with full flexibility and control. Rare errors.
- Band 8: Wide range used flexibly and accurately. Occasional non-systematic errors.
- Band 7: Variety of complex structures. Frequent error-free sentences.
- Band 6: Mix of simple/complex. Errors occur but rarely impede communication.
- Band 5: Limited range. Errors may cause difficulty for reader.
- Band 4: Attempts complex structures. Frequent grammatical errors.

Calculate overallBand as the mean of all 4 criteria, rounded to nearest 0.5. Be honest and realistic in your assessment. Always return JSON.`;

export async function POST(req: NextRequest) {
  try {
    const { taskType, prompt, essay } = await req.json();

    if (!essay || essay.trim().length < 20) {
      return NextResponse.json({ error: "Essay too short to evaluate." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }

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
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;

    if (!raw) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (err) {
    console.error("AI writing check error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
