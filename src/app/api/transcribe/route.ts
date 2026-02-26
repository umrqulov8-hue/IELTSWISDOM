import { NextRequest, NextResponse } from "next/server";
import Bytez from "bytez.js";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const apiKey = process.env.BYTEZ_API_KEY;
        if (!apiKey) {
            console.error("Available ENV keys:", Object.keys(process.env));
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        // 1. Upload to Vercel Blob to get a public URL (Bytez needs a URL for models like Whisper)
        // We'll give it a short TTL/random name to keep it temporary
        const blob = await put(`temp_speaking/${Date.now()}_${file.name}`, file, {
            access: 'public',
        });

        // 2. Transcribe with Bytez Whisper
        const sdk = new Bytez(apiKey);
        const model = sdk.model("hyojin99/whisper");

        const { error, output } = await model.run(blob.url);

        if (error) {
            console.error("Bytez Transcription Error Details:", {
                error,
                blobUrl: blob.url
            });
            const errorMessage = typeof error === 'string' ? error : (error as any)?.message || JSON.stringify(error);
            return NextResponse.json({
                error: "Transcription failed",
                details: errorMessage
            }, { status: 500 });
        }

        // Output from Whisper is usually { text: "..." }
        return NextResponse.json({ text: output?.text || output });

    } catch (err) {
        console.error("API Transcribe Error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
