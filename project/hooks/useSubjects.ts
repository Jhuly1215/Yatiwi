import { useEffect, useState } from 'react';
import { getSubjects } from '../services/lessons';

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    getSubjects().then(setSubjects);
  }, []);

  return subjects;
};