import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.IELTS_API_KEY?.trim();
        if (!apiKey) {
            return NextResponse.json({ error: "IELTS_API_KEY not configured" }, { status: 500 });
        }

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: apiKey,
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "IELTS Wisdom",
            }
        });

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

        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [systemMessage, ...messages]
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("AI chat error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
