'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Workspace } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceSlug, setNewWorkspaceSlug] = useState('');

  useEffect(() => {
    checkAuth();
    fetchWorkspaces();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch('/api/workspaces');
      const data = await response.json();
      setWorkspaces(data.workspaces || []);
    } catch (error) {
      console.error('Failed to fetch workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newWorkspaceName,
          slug: newWorkspaceSlug,
        }),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewWorkspaceName('');
        setNewWorkspaceSlug('');
        fetchWorkspaces();
      }
    } catch (error) {
      console.error('Failed to create workspace:', error);
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
    <div className="min-h-screen bg-surface-base p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary-text">
            Your Workspaces
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-accent text-surface-base px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity duration-fast"
          >
            New Workspace
          </button>
        </div>

        {workspaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary-secondary mb-4">No workspaces yet</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-primary-accent hover:underline"
            >
              Create your first workspace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                onClick={() => router.push(`/workspace/${workspace.slug}`)}
                className="bg-surface-muted border border-border-default rounded-lg p-6 cursor-pointer hover:border-border-muted transition-colors duration-fast"
              >
                <h3 className="font-heading text-xl font-semibold text-primary-text mb-2">
                  {workspace.name}
                </h3>
                <p className="text-primary-secondary text-sm">
                  /{workspace.slug}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface-muted border border-border-default rounded-lg p-6 w-full max-w-md">
            <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">
              Create Workspace
            </h2>
            <form onSubmit={handleCreateWorkspace}>
              <div className="mb-4">
                <label className="block text-primary-secondary text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  className="w-full bg-surface-base border border-border-default rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-accent"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-primary-secondary text-sm mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={newWorkspaceSlug}
                  onChange={(e) => setNewWorkspaceSlug(e.target.value)}
                  className="w-full bg-surface-base border border-border-default rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-accent"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-surface-raised text-primary-text px-4 py-2 rounded-lg hover:bg-surface-base transition-colors duration-fast"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-accent text-surface-base px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity duration-fast"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
