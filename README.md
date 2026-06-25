# Firedocs

AI-powered developer documentation workspace. Generate API docs, architecture diagrams, README files, and technical specs instantly.

## Features

- **AI-Powered Documentation**: Generate docs using slash commands (`/api-doc`, `/diagram`, `/readme`, `/spec`)
- **Workspace Organization**: Create multiple workspaces to organize your documentation
- **Markdown Editor**: Clean, distraction-free editor with live preview
- **Diagram Support**: Mermaid.js integration for architecture diagrams
- **Auto-Save**: Automatic saving every 30 seconds
- **GitHub OAuth**: Seamless authentication with GitHub

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + Auth)
- **AI**: Multiple providers (Groq, OpenAI, Gemini, Hugging Face, Cohere, Anthropic)
- **Editor**: CodeMirror 6
- **Diagrams**: Mermaid.js
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account
- At least one AI provider API key (Groq recommended for free tier)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your values:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - **At least one AI provider API key** (Groq recommended for free tier):
     - `GROQ_API_KEY`: Get from [console.groq.com](https://console.groq.com) (Free tier, fast)
     - `OPENAI_API_KEY`: Get from [platform.openai.com](https://platform.openai.com) ($5 free credit)
     - `GEMINI_API_KEY`: Get from [ai.google.dev](https://ai.google.dev) (Free tier)
     - `HUGGINGFACE_API_KEY`: Get from [huggingface.co](https://huggingface.co) (Free inference)
     - `COHERE_API_KEY`: Get from [cohere.com](https://cohere.com) (Free tier)
     - `ANTHROPIC_API_KEY`: Get from [console.anthropic.com](https://console.anthropic.com) (No free tier)

4. Set up Supabase database:
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the schema from `supabase/schema.sql`

5. Configure GitHub OAuth in Supabase:
   - Go to Authentication > Providers
   - Enable GitHub provider
   - Add your GitHub OAuth credentials

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following tables:

- `profiles`: User profiles (extends Supabase auth)
- `workspaces`: Documentation workspaces
- `docs`: Individual documents
- `doc_versions`: Document version history
- `workspace_members`: Workspace sharing (Team plan)

## AI Commands

- `/api-doc`: Generate API reference documentation
- `/diagram`: Create Mermaid architecture diagrams
- `/readme`: Generate README.md files
- `/spec`: Create technical specifications

## AI Providers

Firedocs supports multiple AI providers with free tiers:

1. **Groq** (Recommended) - Fast inference with generous free tier
   - Get API key: [console.groq.com](https://console.groq.com)
   - Free tier: Very generous, fast inference
   
2. **OpenAI** - GPT-4o mini with $5 free credit for new users
   - Get API key: [platform.openai.com](https://platform.openai.com)
   - Free tier: $5 credit for new users
   
3. **Google Gemini** - Free tier with rate limits
   - Get API key: [ai.google.dev](https://ai.google.dev)
   - Free tier: Yes, with rate limits
   
4. **Hugging Face** - Free inference API access
   - Get API key: [huggingface.co](https://huggingface.co/settings/tokens)
   - Free tier: Free inference API access
   
5. **Cohere** - Free tier available
   - Get API key: [cohere.com](https://cohere.com)
   - Free tier: Yes, free tier available
   
6. **Anthropic Claude** - No free tier, requires paid plan
   - Get API key: [console.anthropic.com](https://console.anthropic.com)
   - Free tier: No, requires paid plan

You can switch between providers directly in the workspace using the provider selector in the header, or when using slash commands.

## Project Structure

```
firedocs/
├── app/
│   ├── (auth)/login/           # GitHub OAuth login
│   ├── (app)/dashboard/        # Workspace dashboard
│   ├── (app)/workspace/[slug]/ # Workspace editor
│   ├── api/                    # API routes
│   └── auth/callback/         # OAuth callback
├── components/
│   ├── editor/                 # Markdown editor, slash menu, diagram preview
│   └── workspace/              # Sidebar, header
├── lib/
│   ├── supabase/               # Supabase client configuration
│   ├── ai-providers.ts         # Multi-provider AI integration
│   └── claude.ts               # Deprecated, use ai-providers.ts
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript types
└── supabase/schema.sql        # Database schema
```

## License

MIT
