import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

// In-memory rate limit store (Note: In production with multi-instance, use Redis)
const rateLimitStore = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT = 50; // 50 requests
const WINDOW_MS = 60 * 1000; // per 1 minute

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Apply rate limiting to API routes only
    if (pathname.startsWith('/api')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const now = Date.now();
        const userData = rateLimitStore.get(ip) || { count: 0, lastReset: now };

        if (now - userData.lastReset > WINDOW_MS) {
            userData.count = 1;
            userData.lastReset = now;
        } else {
            userData.count++;
        }

        rateLimitStore.set(ip, userData);

        if (userData.count > RATE_LIMIT) {
            return new NextResponse('Too Many Requests', {
                status: 429,
                headers: {
                    'Retry-After': '60',
                    'X-RateLimit-Limit': RATE_LIMIT.toString(),
                    'X-RateLimit-Remaining': '0',
                }
            });
        }
    }

    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
