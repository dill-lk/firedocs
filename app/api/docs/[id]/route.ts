import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: doc } = await supabase
      .from('docs')
      .select('*')
      .eq('id', id)
      .single();

    if (!doc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this doc's workspace
    const { data: workspace } = await supabase
      .from('workspaces')
      .select('owner_id')
      .eq('id', doc.workspace_id)
      .single();

    if (!workspace || workspace.owner_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({ doc });
  } catch (error) {
    console.error('Get doc error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doc' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, content, doc_type, is_published } = await request.json();

    // First check if user has access to this doc
    const { data: existingDoc } = await supabase
      .from('docs')
      .select('workspace_id')
      .eq('id', id)
      .single();

    if (!existingDoc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const { data: workspace } = await supabase
      .from('workspaces')
      .select('owner_id')
      .eq('id', existingDoc.workspace_id)
      .single();

    if (!workspace || workspace.owner_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Create version before updating
    if (content !== undefined) {
      await supabase
        .from('doc_versions')
        .insert({
          doc_id: id,
          content: existingDoc.content || '',
        });
    }

    const { data: doc } = await supabase
      .from('docs')
      .update({
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(doc_type !== undefined && { doc_type }),
        ...(is_published !== undefined && { is_published }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    return NextResponse.json({ doc });
  } catch (error) {
    console.error('Update doc error:', error);
    return NextResponse.json(
      { error: 'Failed to update doc' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has access to this doc
    const { data: doc } = await supabase
      .from('docs')
      .select('workspace_id')
      .eq('id', id)
      .single();

    if (!doc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const { data: workspace } = await supabase
      .from('workspaces')
      .select('owner_id')
      .eq('id', doc.workspace_id)
      .single();

    if (!workspace || workspace.owner_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    await supabase
      .from('docs')
      .delete()
      .eq('id', id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete doc error:', error);
    return NextResponse.json(
      { error: 'Failed to delete doc' },
      { status: 500 }
    );
  }
}
