// Root App Component
// Provides SafeArea, ThemeContext, TaskContext, and NavigationContainer

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { TaskProvider } from './src/context/TaskContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import {
  setupNotificationChannels,
  requestNotificationPermissions,
} from './src/services/notificationService';
import { colors } from './src/styles/theme';

function AppContent() {
  const { isDark, theme } = useTheme();

  useEffect(() => {
    // Configure notifications on app startup
    setupNotificationChannels();
    requestNotificationPermissions();
  }, []);

  const navigationTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: colors.accent,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '800' },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.background}
      />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
