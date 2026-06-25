import { useState, useEffect } from 'react';
import { Doc } from '@/types';

export function useDoc(doc: Doc | null, autoSave: boolean = true) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (!doc || !autoSave || !doc.id) return;

    const saveTimeout = setTimeout(async () => {
      try {
        setSaving(true);
        const response = await fetch(`/api/docs/${doc.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: doc.title,
            content: doc.content,
          }),
        });

        if (response.ok) {
          setLastSaved(new Date());
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setSaving(false);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(saveTimeout);
  }, [doc?.content, doc?.title, doc?.id, autoSave]);

  return { saving, lastSaved };
}
