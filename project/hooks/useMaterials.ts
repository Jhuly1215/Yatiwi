import { useEffect, useState } from 'react';
import { getMaterialsByLesson } from '../services/materials';

export const useMaterials = (lessonId: string) => {
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    if (!lessonId) return;
    getMaterialsByLesson(lessonId).then(setMaterials);
  }, [lessonId]);

  return materials;
};