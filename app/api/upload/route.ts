import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { withAuth } from '@/lib/auth';

// POST /api/upload - Upload image to Supabase Storage (protected)
export async function POST(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop();
      const fileName = `recipe-${timestamp}-${random}.${extension}`;

      // Convert File to ArrayBuffer then to Buffer for Supabase
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Supabase Storage
      const { data, error } = await supabaseAdmin()
        .storage
        .from('recipe-images')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error('Supabase storage error:', error);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin()
        .storage
        .from('recipe-images')
        .getPublicUrl(fileName);

      return NextResponse.json({
        url: publicUrl,
        path: data.path,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}
