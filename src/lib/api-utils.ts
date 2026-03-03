import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * Verifies that the request is coming from an authenticated user.
 * Returns the user object if authenticated, otherwise returns null.
 */
export async function verifyAuth(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Singleton OpenAI client to avoid multiple instances.
 */
let openaiInstance: OpenAI | null = null;

export function getOpenAIClient() {
    if (!openaiInstance) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not configured");
        }
        openaiInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openaiInstance;
}

/**
 * Standard error response for API routes.
 */
export function errorResponse(message: string, status: number = 500, details?: any) {
    return NextResponse.json(
        { error: message, ...(details && { details }) },
        { status }
    );
}
