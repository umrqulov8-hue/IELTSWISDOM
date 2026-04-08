import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { verifyAuth, errorResponse } from "@/lib/api-utils";

export async function POST(request: Request): Promise<NextResponse> {
    const user = await verifyAuth(request as any);
    if (!user) {
        return errorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || !request.body) {
        return errorResponse('Filename and body are required', 400);
    }

    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext || !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
        return errorResponse('Invalid file type. Only JPG, PNG, and WEBP are allowed.', 400);
    }

    const supabase = await createClient();
    
    // Convert ReadableStream to ArrayBuffer for Supabase upload
    const arrayBuffer = await request.arrayBuffer();
    
    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}/${filename}`, arrayBuffer, {
            contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
            upsert: true
        });

    if (error) {
        return errorResponse(error.message, 500);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl });
}
