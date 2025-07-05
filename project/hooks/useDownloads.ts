// File: project/hooks/useLocalDownloads.ts

import { useState, useEffect } from 'react';
import {
  getDownloads,
  insertDownload,
  deleteDownload,
  DownloadRow
} from '../src/database/downloads';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function useDownloads() {
  const { userId } = useContext(UserContext);
  const [items, setItems] = useState<DownloadRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getDownloads(userId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [userId]);

  const addDownload = async (material_id: string, version: number, local_path: string) => {
    try {
      const id = await insertDownload({ user_id: userId, material_id, version, local_path });
      await load();
      return id;
    } catch (e) {
      throw e;
    }
  };

  const removeDownload = async (downloadId: string) => {
    try {
      await deleteDownload(downloadId);
      await load();
    } catch (e) {
      throw e;
    }
  };

  return {
    items,
    loading,
    error,
    reload: load,
    addDownload,
    removeDownload
  };
}
