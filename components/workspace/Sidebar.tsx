'use client';

import { useState, useEffect } from 'react';
import { Doc } from '@/types';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  workspaceSlug: string;
  workspaceId?: string;
  currentDocId?: string;
  onDocSelect: (doc: Doc) => void;
  onCreateDoc: () => void;
}

export default function Sidebar({ workspaceSlug, workspaceId, currentDocId, onDocSelect, onCreateDoc }: SidebarProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (workspaceId) {
      fetchDocs();
    }
  }, [workspaceId]);

  const fetchDocs = async () => {
    try {
      const docsResponse = await fetch(`/api/docs?workspace_id=${workspaceId}`);
      const docsData = await docsResponse.json();
      setDocs(docsData.docs || []);
    } catch (error) {
      console.error('Failed to fetch docs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 bg-surface-muted border-r border-border-default h-screen flex flex-col">
      <div className="p-4 border-b border-border-default">
        <h2 className="font-heading text-lg font-semibold text-primary-text">
          Documents
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="text-primary-secondary text-sm">Loading...</div>
        ) : docs.length === 0 ? (
          <div className="text-primary-secondary text-sm text-center py-4">
            No documents yet
          </div>
        ) : (
          <div className="space-y-1">
            {docs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => onDocSelect(doc)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-fast ${
                  currentDocId === doc.id
                    ? 'bg-surface-raised text-primary-text'
                    : 'text-primary-secondary hover:bg-surface-raised hover:text-primary-text'
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border-default">
        <button
          onClick={onCreateDoc}
          className="w-full bg-surface-raised text-primary-text px-4 py-2 rounded-lg text-sm hover:bg-surface-base transition-colors duration-fast"
        >
          New Document
        </button>
      </div>
    </div>
  );
}
