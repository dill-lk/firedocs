// This file is deprecated - use lib/ai-providers.ts instead
// Kept for backward compatibility
import { generateContent as generateWithProviders } from './ai-providers';
import { AIProvider } from '@/types';

export async function generateContent(
  command: string,
  input: string,
  provider?: AIProvider
): Promise<{ content: string; provider: AIProvider }> {
  return generateWithProviders(command, input, provider);
}
