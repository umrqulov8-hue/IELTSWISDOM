import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { verifyAuth, errorResponse } from "@/lib/api-utils";

export async function POST(request: Request): Promise<NextResponse> {
    const user = await verifyAuth(request as any); // Cast as any for compatibility if needed
    if (!user) {
        return errorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || !request.body) {
        return errorResponse('Filename and body are required', 400);
    }

    // Security: Validate file extension (optional but recommended)
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext || !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
        return errorResponse('Invalid file type. Only JPG, PNG, and WEBP are allowed.', 400);
    }

    const blob = await put(filename, request.body, {
        access: 'public',
    });

    return NextResponse.json(blob);
}
