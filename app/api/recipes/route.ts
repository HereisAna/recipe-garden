import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { withAuth } from '@/lib/auth';
import type { RecipeInsert } from '@/lib/types';

// GET /api/recipes - Fetch recipes with filtering, search, and pagination
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching recipes...');
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    console.log('Query params:', { search, categories, page, limit, offset });

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    let query = supabase
      .from('recipes')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply category filter
    if (categories.length > 0) {
      query = query.overlaps('categories', categories);
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    console.log('Executing Supabase query...');
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return NextResponse.json(
        { error: `Failed to fetch recipes: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Query successful, found:', count, 'recipes');

    return NextResponse.json({
      recipes: data,
      total: count,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// POST /api/recipes - Create new recipe (protected)
export async function POST(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const body = await request.json();
      console.log('Creating recipe:', body.title);

      let client;
      try {
        client = supabaseAdmin();
        console.log('Supabase admin client initialized for recipe creation');
      } catch (error) {
        console.error('Failed to initialize Supabase client:', error);
        return NextResponse.json(
          { error: `Supabase initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
          { status: 500 }
        );
      }

      const { data, error } = await client
        .from('recipes')
        .insert(body)
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating recipe:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        return NextResponse.json(
          { error: `Failed to create recipe: ${error.message}` },
          { status: 500 }
        );
      }

      console.log('Recipe created successfully:', data.id);
      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      console.error('Error creating recipe:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json(
        { error: `Internal server error: ${errorMessage}` },
        { status: 500 }
      );
    }
  });
}
