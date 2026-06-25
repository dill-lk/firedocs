'use client';

import { useState } from 'react';
import { AIProvider } from '@/types';

interface SlashMenuProps {
  visible: boolean;
  position: { x: number; y: number };
  onSelect: (command: string, provider?: AIProvider) => void;
  onClose: () => void;
}

const commands = [
  { id: '/api-doc', label: 'API Documentation', description: 'Generate API reference docs' },
  { id: '/diagram', label: 'Diagram', description: 'Create Mermaid diagrams' },
  { id: '/readme', label: 'README', description: 'Generate README.md' },
  { id: '/spec', label: 'Specification', description: 'Create technical specs' },
];

const providers: { id: AIProvider; label: string; description: string }[] = [
  { id: 'groq', label: 'Groq (Free)', description: 'Fast, generous free tier' },
  { id: 'openai', label: 'OpenAI', description: 'GPT-4o mini, $5 free credit' },
  { id: 'gemini', label: 'Gemini', description: 'Google AI, free tier' },
  { id: 'huggingface', label: 'Hugging Face', description: 'Free inference API' },
  { id: 'cohere', label: 'Cohere', description: 'Free tier available' },
  { id: 'anthropic', label: 'Anthropic', description: 'Claude, no free tier' },
];

export default function SlashMenu({ visible, position, onSelect, onClose }: SlashMenuProps) {
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <div
      className="fixed bg-surface-raised border border-border-default rounded-lg shadow-1 z-50 w-80"
      style={{ left: position.x, top: position.y }}
    >
      <div className="p-2">
        {!selectedCommand ? (
          <>
            <div className="text-primary-secondary text-xs mb-2 px-2">AI Commands</div>
            {commands.map((command) => (
              <button
                key={command.id}
                onClick={() => setSelectedCommand(command.id)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-muted transition-colors duration-fast"
              >
                <div className="text-primary-text text-sm font-medium">{command.label}</div>
                <div className="text-primary-secondary text-xs">{command.description}</div>
              </button>
            ))}
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedCommand(null)}
              className="text-primary-secondary text-xs mb-2 px-2 hover:text-primary-text flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to commands
            </button>
            <div className="text-primary-secondary text-xs mb-2 px-2">Select AI Provider</div>
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onSelect(selectedCommand, provider.id)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-muted transition-colors duration-fast"
              >
                <div className="text-primary-text text-sm font-medium">{provider.label}</div>
                <div className="text-primary-secondary text-xs">{provider.description}</div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
