// Theme Context for Dark and Light Mode management

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../styles/theme';
import { loadThemeFromStorage, saveThemeToStorage } from '../services/storageService';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeTheme = async () => {
      const savedTheme = await loadThemeFromStorage();
      if (savedTheme) {
        setThemeMode(savedTheme);
      } else if (systemColorScheme) {
        setThemeMode(systemColorScheme);
      }
      setIsReady(true);
    };

    initializeTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    await saveThemeToStorage(nextMode);
  };

  const isDark = themeMode === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDark,
        theme,
        toggleTheme,
        isReady,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
