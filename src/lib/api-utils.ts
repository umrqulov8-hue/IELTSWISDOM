import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * Verifies the request is from an authenticated user.
 * Returns the user object if authenticated, otherwise returns null.
 */
export async function verifyAuth(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Singleton OpenAI client to avoid multiple instances and config duplication.
 */
let openaiInstance: OpenAI | null = null;

export function getOpenAIClient() {
    if (!openaiInstance) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not configured");
        }
        openaiInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            timeout: 30_000,    // 30-second request timeout — prevents hung requests
            maxRetries: 2,      // Auto-retry on transient errors (rate limits, 5xx)
        });
    }
    return openaiInstance;
}

/**
 * Creates a standardized error JSON response.
 */
export function errorResponse(message: string, status: number = 500, details?: string) {
    return NextResponse.json(
        {
            error: message,
            ...(process.env.NODE_ENV === 'development' && details ? { details } : {}),
        },
        { status }
    );
}

/**
 * Standardized structured logging for API errors.
 */
export function logApiError(context: string, error: unknown) {
    console.error(`[API ERROR] ${context}:`, {
        message: error instanceof Error ? error.message : String(error),
        stack: process.env.NODE_ENV === 'development'
            ? (error instanceof Error ? error.stack : undefined)
            : undefined,
        timestamp: new Date().toISOString()
    });
}
