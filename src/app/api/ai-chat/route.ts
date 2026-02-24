import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error no types
import Bytez from "bytez.js";

const sdk = new Bytez("26b2c8283a455ed739dc60e7385663fc");
const model = sdk.model("openai/gpt-4o-mini");

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

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
            console.error("Bytez error:", error);
            return NextResponse.json({ error: String(error) }, { status: 500 });
        }

        // output may be the full completion object or just text
        const reply =
            typeof output === "string"
                ? output
                : output?.choices?.[0]?.message?.content ?? JSON.stringify(output);

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("AI chat error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
