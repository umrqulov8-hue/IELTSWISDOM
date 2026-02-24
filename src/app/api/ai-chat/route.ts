import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const response = await fetch("https://api.bytez.com/models/openai/gpt-4o-mini/chat/completions", {
            method: "POST",
            headers: {
                Authorization: "Key 26b2c8283a455ed739dc60e7385663fc",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: `You are an expert IELTS tutor and AI assistant for the IELTS Wisdom platform. 
You help students with:
- IELTS Writing Task 1 & Task 2 feedback and band score estimation
- IELTS Speaking practice and tips
- IELTS Reading and Listening strategies
- Grammar corrections and vocabulary improvements
- General IELTS preparation advice

Always be encouraging, specific, and provide actionable feedback. When evaluating writing, mention the band score criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.`,
                    },
                    ...messages,
                ],
                max_tokens: 1024,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            return NextResponse.json({ error: err }, { status: response.status });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content ?? "No response received.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("AI chat error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
