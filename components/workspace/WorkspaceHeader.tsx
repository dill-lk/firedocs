'use client';

import { ReactNode } from 'react';

interface WorkspaceHeaderProps {
  workspaceName: string;
  docTitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
}

export default function WorkspaceHeader({ workspaceName, docTitle, onBack, rightAction }: WorkspaceHeaderProps) {
  return (
    <div className="h-16 bg-surface-muted border-b border-border-default flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-primary-secondary hover:text-primary-text transition-colors duration-fast"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div>
          <h1 className="font-heading text-lg font-semibold text-primary-text">
            {workspaceName}
          </h1>
          {docTitle && (
            <p className="text-primary-secondary text-sm">{docTitle}</p>
          )}
        </div>
      </div>
      {rightAction}
    </div>
  );
}
