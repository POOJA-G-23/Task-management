// Local Storage Service using AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import { INITIAL_SAMPLE_TASKS } from '../utils/sampleData';

/**
 * Load all tasks from AsyncStorage.
 * If no tasks found (first launch), populates initial sample tasks.
 */
export const loadTasksFromStorage = async () => {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
    if (rawData !== null) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    // First time launch: save and return sample data
    await saveTasksToStorage(INITIAL_SAMPLE_TASKS);
    return INITIAL_SAMPLE_TASKS;
  } catch (error) {
    console.error('Error loading tasks from AsyncStorage:', error);
    return INITIAL_SAMPLE_TASKS;
  }
};

/**
 * Save tasks array to AsyncStorage
 */
export const saveTasksToStorage = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEYS.TASKS, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving tasks to AsyncStorage:', error);
    return false;
  }
};

/**
 * Load saved theme mode ('light', 'dark', 'system')
 */
export const loadThemeFromStorage = async () => {
  try {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
    return theme || 'dark';
  } catch (error) {
    console.error('Error loading theme preference:', error);
    return 'dark';
  }
};

/**
 * Save theme mode to AsyncStorage
 */
export const saveThemeToStorage = async (themeMode) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, themeMode);
    return true;
  } catch (error) {
    console.error('Error saving theme preference:', error);
    return false;
  }
};

/**
 * Reset all application data to default sample tasks
 */
export const resetAppData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TASKS);
    await saveTasksToStorage(INITIAL_SAMPLE_TASKS);
    return INITIAL_SAMPLE_TASKS;
  } catch (error) {
    console.error('Error resetting application data:', error);
    return INITIAL_SAMPLE_TASKS;
  }
};
