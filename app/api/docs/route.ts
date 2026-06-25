import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspace_id');

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      );
    }

    const { data: docs } = await supabase
      .from('docs')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    return NextResponse.json({ docs });
  } catch (error) {
    console.error('Get docs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch docs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { workspace_id, title, content, doc_type } = await request.json();

    if (!workspace_id || !title) {
      return NextResponse.json(
        { error: 'Workspace ID and title are required' },
        { status: 400 }
      );
    }

    const { data: doc } = await supabase
      .from('docs')
      .insert({
        workspace_id,
        title,
        content: content || '',
        doc_type: doc_type || 'custom',
        is_published: false,
      })
      .select()
      .single();

    return NextResponse.json({ doc });
  } catch (error) {
    console.error('Create doc error:', error);
    return NextResponse.json(
      { error: 'Failed to create doc' },
      { status: 500 }
    );
  }
}
