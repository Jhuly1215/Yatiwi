// File: project/hooks/useModules.ts

import { useState, useEffect } from 'react';
import { getModulesBySubject, ModuleRow } from '../src/database/modules';

interface UseModulesResult {
  items: ModuleRow[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

export function useModules(subjectId: string): UseModulesResult {
  const [items, setItems] = useState<ModuleRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getModulesBySubject(subjectId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) load();
  }, [subjectId]);

  return { items, loading, error, reload: load };
}
