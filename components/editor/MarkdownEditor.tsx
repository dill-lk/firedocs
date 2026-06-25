'use client';

import { useRef } from 'react';

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSlashCommand?: (command: string) => void;
}

export default function MarkdownEditor({ content, onChange, onSlashCommand }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '/' && onSlashCommand) {
      const textarea = textareaRef.current;
      if (textarea) {
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPosition);
        
        // Check if slash is at the start of a line
        const lastNewline = textBeforeCursor.lastIndexOf('\n');
        const textSinceLastNewline = textBeforeCursor.substring(lastNewline + 1);
        
        if (textSinceLastNewline.trim() === '/' || textSinceLastNewline === '/') {
          e.preventDefault();
          onSlashCommand('/');
        }
      }
    }

    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = content.substring(0, start) + '  ' + content.substring(end);
        onChange(newValue);
        
        // Set cursor position after the inserted spaces
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    }

    // Handle Ctrl/Cmd + B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newValue = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        onChange(newValue);
      }
    }

    // Handle Ctrl/Cmd + I for italic
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newValue = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        onChange(newValue);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-surface-base text-primary-text p-6 font-code text-sm resize-none focus:outline-none leading-relaxed"
          placeholder="Start typing... Use / for AI commands"
          spellCheck={false}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        />
      </div>
      <div className="px-6 py-2 border-t border-border-default bg-surface-muted flex items-center justify-between text-xs text-primary-secondary">
        <div className="flex gap-4">
          <span>**bold**</span>
          <span>*italic*</span>
          <span>`code`</span>
          <span>```block```</span>
        </div>
        <div>
          Tab: indent | Ctrl+B: bold | Ctrl+I: italic
        </div>
      </div>
    </div>
  );
}
