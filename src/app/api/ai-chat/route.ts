import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
        }

        const systemInstruction = `You are an expert IELTS tutor and AI assistant for the IELTS Wisdom platform.
You help students with:
- IELTS Writing Task 1 & Task 2 feedback and band score estimation
- IELTS Speaking practice and tips
- IELTS Reading and Listening strategies
- Grammar corrections and vocabulary improvements
- General IELTS preparation advice

Always be encouraging, specific, and provide actionable feedback. When evaluating writing, mention the band score criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.`;

        const formattedMessages = [
            { role: "system", content: systemInstruction },
            ...messages.map((msg: any) => ({
                role: msg.role === "assistant" ? "assistant" : "user",
                content: msg.content,
            }))
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: formattedMessages,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("AI chat error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
