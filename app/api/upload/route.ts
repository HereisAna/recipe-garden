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
        console.error('Upload error: No file provided');
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      console.log('Uploading file:', {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // Generate unique filename
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop();
      const fileName = `recipe-${timestamp}-${random}.${extension}`;

      console.log('Generated filename:', fileName);

      // Convert File to ArrayBuffer then to Buffer for Supabase
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log('Buffer size:', buffer.length);

      // Initialize Supabase client
      let client;
      try {
        client = supabaseAdmin();
        console.log('Supabase admin client initialized');
      } catch (error) {
        console.error('Failed to initialize Supabase client:', error);
        return NextResponse.json(
          { error: `Supabase initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
          { status: 500 }
        );
      }

      // Upload to Supabase Storage
      console.log('Attempting to upload to Supabase Storage bucket: recipe-images');
      const { data, error } = await client
        .storage
        .from('recipe-images')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error('Supabase storage error:', {
          message: error.message,
          error: error,
        });
        return NextResponse.json(
          { error: `Supabase storage error: ${error.message}` },
          { status: 500 }
        );
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = client
        .storage
        .from('recipe-images')
        .getPublicUrl(fileName);

      console.log('Public URL:', publicUrl);

      return NextResponse.json({
        url: publicUrl,
        path: data.path,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json(
        { error: `Internal server error: ${errorMessage}` },
        { status: 500 }
      );
    }
  });
}
