import { NextResponse } from 'next/server';
import { getAvailableProviders, getProviderConfig } from '@/lib/ai-providers';

export async function GET() {
  try {
    const availableProviders = getAvailableProviders();
    const providerConfigs = availableProviders.map(provider => ({
      id: provider,
      ...getProviderConfig(provider),
    }));

    return NextResponse.json({ 
      providers: providerConfigs,
      defaultProvider: 'groq',
    });
  } catch (error) {
    console.error('Get providers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}
