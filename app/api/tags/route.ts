import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface Tag {
  id: string;
  name: string;
  slug: string;
  category: 'primary' | 'secondary' | 'topic';
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface GroupedTags {
  primary: Tag[];
  secondary: Tag[];
  topic: Tag[];
}

/**
 * GET /api/tags
 * Returns all tags grouped by category
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: tags, error } = await supabase
      .from('tags')
      .select('*')
      .order('category, name');

    if (error) {
      console.error('Error fetching tags:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tags', details: error.message },
        { status: 500 }
      );
    }

    // Group tags by category
    const grouped: GroupedTags = {
      primary: [],
      secondary: [],
      topic: [],
    };

    tags?.forEach((tag: Tag) => {
      if (tag.category && grouped[tag.category]) {
        grouped[tag.category].push(tag);
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          tags: tags || [],
          grouped,
          total: tags?.length || 0,
        },
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: any) {
    console.error('Unexpected error in /api/tags:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
