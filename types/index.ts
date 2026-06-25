export interface User {
  id: string;
  username: string;
  plan: 'free' | 'pro' | 'team';
  ai_credits: number;
  created_at: string;
}

export interface Workspace {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  is_public: boolean;
  created_at: string;
}

export interface Doc {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  doc_type: 'api-doc' | 'diagram' | 'readme' | 'spec' | 'custom';
  is_published: boolean;
  published_slug: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocVersion {
  id: string;
  doc_id: string;
  content: string;
  created_at: string;
}

export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  joined_at: string;
}

export type AIProvider = 'anthropic' | 'openai' | 'groq' | 'huggingface' | 'cohere' | 'gemini';

export interface GenerateRequest {
  command: '/api-doc' | '/diagram' | '/readme' | '/spec';
  input: string;
  provider?: AIProvider;
}

export interface GenerateResponse {
  content: string;
  error?: string;
  provider?: AIProvider;
}
