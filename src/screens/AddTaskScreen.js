// AddTaskScreen Component

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { spacing } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { TaskForm } from '../components/TaskForm';

export const AddTaskScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { addTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      await addTask(taskData);
      // Navigate to Tasks screen
      navigation.navigate('Tasks');
    } catch (error) {
      Alert.alert('Error', 'Failed to save task. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Add New Task</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Fill in details to organize your agenda
        </Text>
      </View>

      <TaskForm
        onSubmit={handleCreateTask}
        onCancel={() => navigation.goBack()}
        submitButtonText="Create Task"
        isLoading={isSubmitting}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});
