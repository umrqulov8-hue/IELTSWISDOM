import { NextRequest, NextResponse } from "next/server";
import { verifyAuth, getOpenAIClient, errorResponse, logApiError } from "@/lib/api-utils";

export const dynamic = 'force-dynamic';

import { z } from "zod";

const chatSchema = z.object({
    messages: z.array(z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(4000), // Prevent single giant messages
    }))
        .min(1)
        .max(50), // Prevent token flooding from huge message histories
});

export async function POST(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        if (!user) {
            return errorResponse("Unauthorized", 401);
        }

        const body = await req.json().catch(() => ({}));
        const validation = chatSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(validation.error.issues[0].message, 400);
        }

        const { messages } = validation.data;

        const openai = getOpenAIClient();

        const systemInstruction = `You are an expert IELTS tutor and AI assistant for the IELTS Wisdom platform.
You help students with:
- IELTS Writing Task 1 & Task 2 feedback and band score estimation
- IELTS Speaking practice and tips
- IELTS Reading and Listening strategies
- Grammar corrections and vocabulary improvements
- General IELTS preparation advice

Always be encouraging, specific, and provide actionable feedback. When evaluating writing, mention the band score criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.`;

        // Use last 20 messages max — keeps context but prevents runaway token costs
        const recentMessages = messages.slice(-20);

        const formattedMessages = [
            { role: "system" as const, content: systemInstruction },
            ...recentMessages.map((msg) => ({
                role: msg.role === "assistant" ? "assistant" as const : "user" as const,
                content: msg.content,
            }))
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: formattedMessages,
            max_tokens: 1500, // Prevent runaway responses
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (err) {
        logApiError("AI Chat", err);
        return errorResponse("Chat request failed. Please try again.", 500, err instanceof Error ? err.message : undefined);
    }
}
