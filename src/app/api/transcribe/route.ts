import { NextRequest, NextResponse } from "next/server";
import { verifyAuth, getOpenAIClient, errorResponse, logApiError } from "@/lib/api-utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const user = await verifyAuth(request);
        if (!user) {
            return errorResponse("Unauthorized", 401);
        }

        const openai = getOpenAIClient();

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return errorResponse("No file provided", 400);
        }

        // Optional: File size limit check (e.g., 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return errorResponse("File too large (max 10MB)", 400);
        }

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
            response_format: "text",
        });

        const text = (typeof transcription === 'string' ? transcription : (transcription as any).text).trim();

        return NextResponse.json({ text });

    } catch (err) {
        console.error("OpenAI Transcribe Error:", err);
        return errorResponse("Transcription failed", 500, err instanceof Error ? err.message : undefined);
    }
}
