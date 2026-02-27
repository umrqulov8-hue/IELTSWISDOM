import { NextRequest, NextResponse } from "next/server";
// @ts-ignore no types
import Bytez from "bytez.js";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        // Use environment variable or fallback to the provided key
        const apiKey = process.env.IELTS_API_KEY?.trim() || "26b2c8283a455ed739dc60e7385663fc";

        const sdk = new Bytez(apiKey);
        const model = sdk.model("openai/gpt-5.2");

        const systemMessage = {
            role: "system",
            content: `You are an expert IELTS tutor and AI assistant for the IELTS Wisdom platform.
You help students with:
- IELTS Writing Task 1 & Task 2 feedback and band score estimation
- IELTS Speaking practice and tips
- IELTS Reading and Listening strategies
- Grammar corrections and vocabulary improvements
- General IELTS preparation advice

Always be encouraging, specific, and provide actionable feedback. When evaluating writing, mention the band score criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.`,
        };

        const { error, output } = await model.run([systemMessage, ...messages]);

        if (error) {
            console.error("Bytez chat error:", error);
            return NextResponse.json({ error: String(error) }, { status: 500 });
        }

        const reply =
            typeof output === "string"
                ? output
                : (output as any)?.content
                ?? (output as any)?.choices?.[0]?.message?.content
                ?? JSON.stringify(output);

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("AI chat error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
