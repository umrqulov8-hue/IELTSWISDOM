import { NextRequest, NextResponse } from "next/server";
import { verifyAuth, getOpenAIClient, errorResponse } from "@/lib/api-utils";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        if (!user) {
            return errorResponse("Unauthorized", 401);
        }

        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return errorResponse("Invalid messages", 400);
        }

        const openai = getOpenAIClient();

        const systemInstruction = `You are an expert IELTS tutor and AI assistant for the IELTS Wisdom platform.
You help students with:
- IELTS Writing Task 1 & Task 2 feedback and band score estimation
- IELTS Speaking practice and tips
- IELTS Reading and Listening strategies
- Grammar corrections and vocabulary improvements
- General IELTS preparation advice

Always be encouraging, specific, and provide actionable feedback. When evaluating writing, mention the band score criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.`;

        const formattedMessages: any[] = [
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
        return errorResponse("Internal server error", 500, err instanceof Error ? err.message : undefined);
    }
}
