import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai-providers';
import { createClient } from '@/lib/supabase/server';
import { AIProvider } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { command, input, provider = 'groq' } = await request.json();

    if (!command || !input) {
      return NextResponse.json(
        { error: 'Command and input are required' },
        { status: 400 }
      );
    }

    // Check user credits
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user profile to check credits
    const { data: profile } = await supabase
      .from('profiles')
      .select('ai_credits')
      .eq('id', user.id)
      .single();

    if (!profile || profile.ai_credits <= 0) {
      return NextResponse.json(
        { error: 'No AI credits remaining' },
        { status: 403 }
      );
    }

    // Generate content
    const { content, provider: usedProvider } = await generateContent(command, input, provider as AIProvider);

    // Decrement credits
    await supabase
      .from('profiles')
      .update({ ai_credits: profile.ai_credits - 1 })
      .eq('id', user.id);

    return NextResponse.json({ content, provider: usedProvider });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
