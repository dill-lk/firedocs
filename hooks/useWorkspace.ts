import { useState, useEffect } from 'react';
import { Workspace } from '@/types';

export function useWorkspace(slug: string) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkspace();
  }, [slug]);

  const fetchWorkspace = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/workspaces/${slug}`);
      if (!response.ok) {
        throw new Error('Workspace not found');
      }
      const data = await response.json();
      setWorkspace(data.workspace);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workspace');
    } finally {
      setLoading(false);
    }
  };

  return { workspace, loading, error, refetch: fetchWorkspace };
}
