import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const protectedPaths = [
        '/dashboard',
        '/welcome',
        '/leaderboard',
        '/results',
        '/ai-check',
        '/lessons',
        '/practice',
        '/articles',
        '/mock-exams',
        '/materials',
        '/samples',
        '/vocabulary'
    ]

    const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

    // PERFORMANCE FIX: Skip network calls and cookie updates for completely public static pages
    if (!isProtected) {
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (isProtected && !user) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}
