import { useState, useEffect } from 'react';
import { getProgress, ProgressRow } from '../src/database/progress';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

interface UseUserProgressResult {
items: ProgressRow[];
loading: boolean;
error: Error | null;
reload: () => void;
}

export function useUserProgress(): UseUserProgressResult {
const { userId } = useContext(UserContext);
const [items, setItems] = useState<ProgressRow[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

const load = async () => {
setLoading(true);
try {
const data = await getProgress(userId);
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

return { items, loading, error, reload: load };
}

