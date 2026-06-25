import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { AIProvider } from '@/types';

// Provider configurations
const PROVIDER_CONFIGS = {
  anthropic: {
    name: 'Anthropic Claude',
    model: 'claude-sonnet-4-6',
    maxTokens: 2000,
    envKey: 'ANTHROPIC_API_KEY',
    freeTier: 'No free tier, requires API key',
  },
  openai: {
    name: 'OpenAI GPT',
    model: 'gpt-4o-mini',
    maxTokens: 2000,
    envKey: 'OPENAI_API_KEY',
    freeTier: '$5 free credit for new users',
  },
  groq: {
    name: 'Groq',
    model: 'llama-3.3-70b-versatile',
    maxTokens: 2000,
    envKey: 'GROQ_API_KEY',
    freeTier: 'Generous free tier with fast inference',
  },
  huggingface: {
    name: 'Hugging Face',
    model: 'mistralai/Mistral-7B-Instruct-v0.3',
    maxTokens: 2000,
    envKey: 'HUGGINGFACE_API_KEY',
    freeTier: 'Free tier available for inference API',
  },
  cohere: {
    name: 'Cohere',
    model: 'command-r-plus',
    maxTokens: 2000,
    envKey: 'COHERE_API_KEY',
    freeTier: 'Free tier available',
  },
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-1.5-flash',
    maxTokens: 2000,
    envKey: 'GEMINI_API_KEY',
    freeTier: 'Free tier with rate limits',
  },
};

// Prompt templates
const getPrompt = (command: string, input: string): string => {
  const prompts: Record<string, string> = {
    '/api-doc': `You are a technical documentation writer. Given the following API endpoint or code, generate a complete API reference document in Markdown format. Include:
- Overview section
- Endpoint URL and method (if applicable)
- Request parameters table (name, type, required, description)
- Response schema with example JSON
- Code examples in curl, JavaScript, and Python
- Error responses table

Input: ${input}`,

    '/diagram': `You are a software architect. Given the following description, generate a Mermaid.js diagram. Choose the most appropriate diagram type (flowchart, sequenceDiagram, erDiagram, or graph). Return ONLY the raw Mermaid code block, no explanation.

Input: ${input}`,

    '/readme': `You are a developer advocate. Given the following project description or code, generate a complete README.md. Include: project title, one-line description, features list, installation steps, usage examples, and license section. Use clear, friendly language.

Input: ${input}`,

    '/spec': `You are a senior software engineer writing a technical specification. Given the following feature description, generate a structured spec document with: overview, goals, non-goals, technical approach, data model changes, API changes, open questions.

Input: ${input}`,
  };

  return prompts[command] || input;
};

// Anthropic provider
async function generateWithAnthropic(prompt: string): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  const message = await anthropic.messages.create({
    model: PROVIDER_CONFIGS.anthropic.model,
    max_tokens: PROVIDER_CONFIGS.anthropic.maxTokens,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].type === 'text' ? message.content[0].text : '';
}

// OpenAI provider
async function generateWithOpenAI(prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const completion = await openai.chat.completions.create({
    model: PROVIDER_CONFIGS.openai.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: PROVIDER_CONFIGS.openai.maxTokens,
  });

  return completion.choices[0].message.content || '';
}

// Groq provider
async function generateWithGroq(prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY!,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  const completion = await openai.chat.completions.create({
    model: PROVIDER_CONFIGS.groq.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: PROVIDER_CONFIGS.groq.maxTokens,
  });

  return completion.choices[0].message.content || '';
}

// Hugging Face provider
async function generateWithHuggingFace(prompt: string): Promise<string> {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${PROVIDER_CONFIGS.huggingface.model}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: PROVIDER_CONFIGS.huggingface.maxTokens,
          return_full_text: false,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0]?.generated_text || '' : data?.generated_text || '';
}

// Cohere provider
async function generateWithCohere(prompt: string): Promise<string> {
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: PROVIDER_CONFIGS.cohere.model,
      prompt: prompt,
      max_tokens: PROVIDER_CONFIGS.cohere.maxTokens,
    }),
  });

  if (!response.ok) {
    throw new Error(`Cohere API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data?.generations?.[0]?.text || '';
}

// Gemini provider
async function generateWithGemini(prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDER_CONFIGS.gemini.model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: PROVIDER_CONFIGS.gemini.maxTokens,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Main generation function
export async function generateContent(
  command: string,
  input: string,
  provider: AIProvider = 'groq' // Default to Groq for free tier
): Promise<{ content: string; provider: AIProvider }> {
  const prompt = getPrompt(command, input);

  try {
    let content: string;

    switch (provider) {
      case 'anthropic':
        content = await generateWithAnthropic(prompt);
        break;
      case 'openai':
        content = await generateWithOpenAI(prompt);
        break;
      case 'groq':
        content = await generateWithGroq(prompt);
        break;
      case 'huggingface':
        content = await generateWithHuggingFace(prompt);
        break;
      case 'cohere':
        content = await generateWithCohere(prompt);
        break;
      case 'gemini':
        content = await generateWithGemini(prompt);
        break;
      default:
        content = await generateWithGroq(prompt);
    }

    return { content, provider };
  } catch (error) {
    console.error(`${provider} API error:`, error);
    throw new Error(`Failed to generate content with ${PROVIDER_CONFIGS[provider].name}`);
  }
}

// Get available providers (those with API keys configured)
export function getAvailableProviders(): AIProvider[] {
  const providers: AIProvider[] = [];

  if (process.env.ANTHROPIC_API_KEY) providers.push('anthropic');
  if (process.env.OPENAI_API_KEY) providers.push('openai');
  if (process.env.GROQ_API_KEY) providers.push('groq');
  if (process.env.HUGGINGFACE_API_KEY) providers.push('huggingface');
  if (process.env.COHERE_API_KEY) providers.push('cohere');
  if (process.env.GEMINI_API_KEY) providers.push('gemini');

  return providers;
}

// Get provider config
export function getProviderConfig(provider: AIProvider) {
  return PROVIDER_CONFIGS[provider];
}
