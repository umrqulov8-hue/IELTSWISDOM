import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const apiKey = process.env.IELTSWISDOM_API_KEY?.trim();

        if (!apiKey) {
            return NextResponse.json({ error: "IELTSWISDOM_API_KEY not configured" }, { status: 500 });
        }

        const openai = new OpenAI({
            baseURL: "https://api.groq.com/openai/v1",
            apiKey: apiKey,
        });

        // Convert File to a format OpenAI SDK accepts
        const response = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-large-v3",
            response_format: "text",
        });

        return NextResponse.json({ text: response });

    } catch (err) {
        console.error("OpenAI Transcribe Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        return NextResponse.json({
            error: "Transcription failed",
            details: errorMessage
        }, { status: 500 });
    }
}
