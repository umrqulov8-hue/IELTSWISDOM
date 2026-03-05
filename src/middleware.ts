import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

// In-memory rate limit store.
// NOTE: In a multi-instance production deploy (Vercel, etc.) consider Redis for global rate limits.
// This in-memory store is per-instance but still provides protection against burst abuse.
const rateLimitStore = new Map<string, { count: number, lastReset: number }>();

// Tiered rate limits: AI routes are more expensive, so they get a stricter limit
const RATE_LIMITS = {
    ai: { limit: 12, window: 60_000 },      // 12 AI requests per minute per IP
    api: { limit: 60, window: 60_000 },     // 60 general API requests per minute per IP
};

function isRateLimited(ip: string, key: 'ai' | 'api'): { limited: boolean; remaining: number } {
    const { limit, window } = RATE_LIMITS[key];
    const storeKey = `${key}:${ip}`;
    const now = Date.now();
    const record = rateLimitStore.get(storeKey) ?? { count: 0, lastReset: now };

    if (now - record.lastReset > window) {
        record.count = 1;
        record.lastReset = now;
    } else {
        record.count++;
    }

    rateLimitStore.set(storeKey, record);

    // Periodically clean up stale entries to prevent memory leaks
    if (rateLimitStore.size > 10_000) {
        for (const [k, v] of rateLimitStore.entries()) {
            if (now - v.lastReset > window * 2) rateLimitStore.delete(k);
        }
    }

    return {
        limited: record.count > limit,
        remaining: Math.max(0, limit - record.count),
    };
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/api')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1';

        // Apply stricter limits to AI-heavy endpoints
        const isAiRoute = ['/api/ai-chat', '/api/ai-writing-check', '/api/evaluate', '/api/transcribe']
            .some(r => pathname.startsWith(r));

        const { limited, remaining } = isRateLimited(ip, isAiRoute ? 'ai' : 'api');

        if (limited) {
            return new NextResponse(
                JSON.stringify({ error: 'Too Many Requests. Please wait before sending another request.' }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60',
                        'X-RateLimit-Limit': String(isAiRoute ? RATE_LIMITS.ai.limit : RATE_LIMITS.api.limit),
                        'X-RateLimit-Remaining': '0',
                    },
                }
            );
        }

        // Add rate limit headers to successful responses too
        const response = await updateSession(request);
        response.headers.set('X-RateLimit-Remaining', String(remaining));
        return response;
    }

    return await updateSession(request);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
