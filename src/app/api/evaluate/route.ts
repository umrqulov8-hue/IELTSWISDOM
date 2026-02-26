import { NextRequest, NextResponse } from "next/server";
import Bytez from "bytez.js";

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        const apiKey = process.env.BYTEZ_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        const sdk = new Bytez(apiKey);
        const model = sdk.model("openai/gpt-4o-mini");

        const prompt = `You are an IELTS Speaking Examiner. Evaluate the following transcription of a student's answer.
        Provide:
        1. A Band Score (e.g., 6.5, 7.0, 8.5) based on IELTS criteria.
        2. Brief constructive feedback (max 3 sentences) focusing on fluency, vocabulary, and grammar.

        Transcription: "${text}"

        Return the response in JSON format like this:
        {
            "bandScore": "value",
            "feedback": "value"
        }`;

        const { error, output } = await model.run([
            {
                "role": "user",
                "content": prompt
            }
        ]);

        if (error) {
            console.error("Bytez Evaluation Error:", error);
            return NextResponse.json({ error: "Evaluation failed" }, { status: 500 });
        }

        // Output from GPT models in Bytez usually contains the message in a specific structure
        // If it's a direct string or object, we need to parse it if it's JSON
        let result = output;
        try {
            // Clean the output if it has markdown code blocks
            const cleanOutput = typeof output === 'string'
                ? output.replace(/```json|```/g, "").trim()
                : output;

            // If output is already the content string, try parsing
            if (typeof cleanOutput === 'string') {
                result = JSON.parse(cleanOutput);
            } else if (output.choices?.[0]?.message?.content) {
                const content = output.choices[0].message.content.replace(/```json|```/g, "").trim();
                result = JSON.parse(content);
            }
        } catch (e) {
            console.error("JSON Parse Error on AI output:", e);
            // Fallback if parsing fails
            result = {
                bandScore: "N/A",
                feedback: typeof output === 'string' ? output : "Error parsing feedback"
            };
        }

        return NextResponse.json(result);

    } catch (err) {
        console.error("API Evaluate Error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
