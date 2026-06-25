'use client';

import { useState } from 'react';
import { AIProvider } from '@/types';

interface AIProviderSelectorProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

const providers: { id: AIProvider; label: string; description: string; recommended: boolean }[] = [
  { id: 'groq', label: 'Groq', description: 'Fast, generous free tier', recommended: true },
  { id: 'openai', label: 'OpenAI', description: 'GPT-4o mini, $5 free credit', recommended: false },
  { id: 'gemini', label: 'Gemini', description: 'Google AI, free tier', recommended: false },
  { id: 'huggingface', label: 'Hugging Face', description: 'Free inference API', recommended: false },
  { id: 'cohere', label: 'Cohere', description: 'Free tier available', recommended: false },
  { id: 'anthropic', label: 'Anthropic', description: 'Claude, no free tier', recommended: false },
];

export default function AIProviderSelector({ selectedProvider, onProviderChange }: AIProviderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-surface-raised border border-border-default rounded-lg hover:bg-surface-muted transition-colors duration-fast"
      >
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm text-primary-text">
          {providers.find(p => p.id === selectedProvider)?.label || 'Select Provider'}
        </span>
        <svg className="w-4 h-4 text-primary-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-surface-raised border border-border-default rounded-lg shadow-1 z-50">
            <div className="p-2">
              <div className="text-primary-secondary text-xs mb-2 px-2">AI Provider</div>
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    onProviderChange(provider.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-fast ${
                    selectedProvider === provider.id
                      ? 'bg-surface-muted text-primary-text'
                      : 'text-primary-secondary hover:bg-surface-muted hover:text-primary-text'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{provider.label}</span>
                    {provider.recommended && (
                      <span className="text-xs bg-primary-accent text-surface-base px-2 py-0.5 rounded">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="text-xs">{provider.description}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
