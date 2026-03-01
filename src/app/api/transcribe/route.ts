import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
        }

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
            response_format: "text",
        });

        // The exact type returned depends on response_format, for "text" it returns a string directly
        const text = (typeof transcription === 'string' ? transcription : (transcription as any).text).trim();

        return NextResponse.json({ text });

    } catch (err) {
        console.error("OpenAI Transcribe Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        return NextResponse.json({
            error: "Transcription failed",
            details: errorMessage
        }, { status: 500 });
    }
}
