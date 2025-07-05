// File: context/UserContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextProps {
  userId: string;
  setUserId: (id: string) => void;
}

export const UserContext = createContext<UserContextProps>({
  userId: 'anon',
  setUserId: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserIdState] = useState<string>('anon');

  useEffect(() => {
    // Al montar, cargamos el userId almacenado (si existe)
    AsyncStorage.getItem('user_id').then(id => {
      if (id) setUserIdState(id);
    });
  }, []);

  const setUserId = (id: string) => {
    setUserIdState(id);
    AsyncStorage.setItem('user_id', id);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
