'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Sidebar from '@/components/workspace/Sidebar';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import SlashMenu from '@/components/editor/SlashMenu';
import DiagramPreview from '@/components/editor/DiagramPreview';
import { Doc, Workspace, AIProvider } from '@/types';
import AIProviderSelector from '@/components/ui/AIProviderSelector';

export default function WorkspacePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [currentDoc, setCurrentDoc] = useState<Doc | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('groq');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkspace();
  }, [params.slug]);

  const fetchWorkspace = async () => {
    try {
      const response = await fetch(`/api/workspaces/${params.slug}`);
      if (!response.ok) {
        throw new Error('Workspace not found');
      }
      const data = await response.json();
      setWorkspace(data.workspace);
    } catch (error) {
      console.error('Failed to fetch workspace:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDocSelect = (doc: Doc) => {
    setCurrentDoc(doc);
  };

  const handleCreateDoc = async () => {
    try {
      const response = await fetch('/api/docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspace_id: workspace?.id,
          title: 'Untitled Document',
          content: '',
          doc_type: 'custom',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentDoc(data.doc);
      }
    } catch (error) {
      console.error('Failed to create doc:', error);
    }
  };

  const handleContentChange = (content: string) => {
    if (currentDoc) {
      setCurrentDoc({ ...currentDoc, content });
    }
  };

  const handleSlashCommand = (command: string) => {
    setShowSlashMenu(true);
    // Get cursor position for menu placement
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSlashMenuPosition({ x: rect.left, y: rect.bottom + 5 });
    }
  };

  const handleCommandSelect = async (commandId: string, provider?: AIProvider) => {
    setShowSlashMenu(false);
    
    const input = prompt('Enter input for ' + commandId + ':');
    if (!input) return;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          command: commandId, 
          input, 
          provider: provider || selectedProvider 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (currentDoc) {
          setCurrentDoc({
            ...currentDoc,
            content: currentDoc.content + '\n\n' + data.content,
          });
        }
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-surface-base">
      <WorkspaceHeader
        workspaceName={workspace?.name || ''}
        docTitle={currentDoc?.title}
        rightAction={<AIProviderSelector selectedProvider={selectedProvider} onProviderChange={setSelectedProvider} />}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          workspaceSlug={params.slug}
          workspaceId={workspace?.id}
          currentDocId={currentDoc?.id}
          onDocSelect={handleDocSelect}
          onCreateDoc={handleCreateDoc}
        />
        
        {currentDoc ? (
          <div className="flex-1 flex">
            <div className="flex-1">
              <MarkdownEditor
                content={currentDoc.content}
                onChange={handleContentChange}
                onSlashCommand={handleSlashCommand}
              />
            </div>
            <div className="w-96">
              <DiagramPreview content={currentDoc.content} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-primary-secondary mb-4">Select or create a document</p>
              <button
                onClick={handleCreateDoc}
                className="bg-primary-accent text-surface-base px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity duration-fast"
              >
                Create Document
              </button>
            </div>
          </div>
        )}
      </div>

      <SlashMenu
        visible={showSlashMenu}
        position={slashMenuPosition}
        onSelect={handleCommandSelect}
        onClose={() => setShowSlashMenu(false)}
      />
    </div>
  );
}
