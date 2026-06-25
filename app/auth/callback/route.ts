import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${error}&description=${encodeURIComponent(errorDescription || '')}`, requestUrl.origin)
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      return NextResponse.redirect(
        new URL(`/login?error=exchange_failed&description=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
