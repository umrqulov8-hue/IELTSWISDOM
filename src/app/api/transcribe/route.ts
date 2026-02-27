import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

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

        // Convert File to a format OpenAI SDK accepts
        const response = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
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
