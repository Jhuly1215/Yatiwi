import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'app_language';

export function useLanguage() {
  const [language, setLanguageState] = useState('es');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (newLanguage: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return { language, setLanguage };
}