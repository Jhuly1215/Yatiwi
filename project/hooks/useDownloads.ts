import { useEffect, useState } from 'react';
import { getDownloadsByUser } from '../services/downloads';

export const useDownloads = (userId: string) => {
  const [downloads, setDownloads] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;
    getDownloadsByUser(userId).then(setDownloads);
  }, [userId]);

  return downloads;
};
