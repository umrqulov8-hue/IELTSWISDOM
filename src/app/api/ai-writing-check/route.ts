import { NextRequest, NextResponse } from "next/server";
// @ts-ignore no types
import Bytez from "bytez.js";

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

Calculate overallBand as the mean of all 4 criteria, rounded to nearest 0.5. Be honest and realistic in your assessment.`;

export async function POST(req: NextRequest) {
  try {
    const { taskType, prompt, essay } = await req.json();

    if (!essay || essay.trim().length < 20) {
      return NextResponse.json({ error: "Essay too short to evaluate." }, { status: 400 });
    }

    // Use environment variable or fallback to the provided key
    const apiKey = process.env.IELTS_API_KEY?.trim() || "26b2c8283a455ed739dc60e7385663fc";

    const sdk = new Bytez(apiKey);
    const model = sdk.model("openai/gpt-5.2");

    const userMessage = {
      role: "user",
      content: `Please evaluate this IELTS ${taskType === "task-1" ? "Writing Task 1" : "Writing Task 2"} response.

TASK PROMPT:
${prompt}

STUDENT'S ESSAY:
${essay}

Respond ONLY with the JSON evaluation.`
    };

    const { error, output } = await model.run([
      { role: "system", content: SYSTEM_PROMPT },
      userMessage
    ]);

    if (error) {
      console.error("Bytez writing check error:", error);
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    const raw =
      typeof output === "string"
        ? output
        : (output as any)?.content
        ?? (output as any)?.choices?.[0]?.message?.content
        ?? JSON.stringify(output);

    if (!raw) {
      throw new Error("No response from AI");
    }

    // Extract JSON from the response (in case there's extra text)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Invalid AI response format." }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (err) {
    console.error("AI writing check error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
