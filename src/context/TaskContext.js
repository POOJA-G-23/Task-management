// Task Context for state management and CRUD operations

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  resetAppData,
} from '../services/storageService';
import {
  scheduleTaskReminder,
  cancelTaskReminder,
} from '../services/notificationService';
import { isToday } from '../utils/dateUtils';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks = await loadTasksFromStorage();
        setTasks(loadedTasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  /**
   * Helper to persist tasks to storage and state
   */
  const updateTasksStateAndStorage = async (newTasks) => {
    setTasks(newTasks);
    await saveTasksToStorage(newTasks);
  };

  /**
   * Add a new task
   */
  const addTask = async (taskInput) => {
    try {
      const newTask = {
        id: Date.now().toString(),
        title: taskInput.title.trim(),
        description: (taskInput.description || '').trim(),
        dueDate: taskInput.dueDate,
        dueTime: taskInput.dueTime || '09:00',
        priority: taskInput.priority || 'Medium',
        category: taskInput.category || 'Personal',
        completed: false,
        createdAt: new Date().toISOString(),
        reminder: !!taskInput.reminder,
        notificationId: null,
      };

      // Schedule notification if reminder is requested
      if (newTask.reminder) {
        const notificationId = await scheduleTaskReminder(newTask);
        newTask.notificationId = notificationId;
      }

      const updated = [newTask, ...tasks];
      await updateTasksStateAndStorage(updated);
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  /**
   * Update an existing task
   */
  const updateTask = async (id, updatedFields) => {
    try {
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) return null;

      const currentTask = tasks[taskIndex];
      const updatedTask = {
        ...currentTask,
        ...updatedFields,
        title: updatedFields.title ? updatedFields.title.trim() : currentTask.title,
        description: updatedFields.description !== undefined ? updatedFields.description.trim() : currentTask.description,
      };

      // Check if reminder notification needs rescheduling
      const reminderChanged = currentTask.reminder !== updatedTask.reminder;
      const dateChanged = currentTask.dueDate !== updatedTask.dueDate || currentTask.dueTime !== updatedTask.dueTime;

      if (reminderChanged || dateChanged) {
        if (currentTask.notificationId) {
          await cancelTaskReminder(currentTask.notificationId);
          updatedTask.notificationId = null;
        }

        if (updatedTask.reminder && !updatedTask.completed) {
          const newNotificationId = await scheduleTaskReminder(updatedTask);
          updatedTask.notificationId = newNotificationId;
        }
      }

      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = updatedTask;
      await updateTasksStateAndStorage(updatedTasks);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  /**
   * Toggle task completion status
   */
  const toggleTaskCompleted = async (id) => {
    try {
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) return;

      const currentTask = tasks[taskIndex];
      const nextCompleted = !currentTask.completed;

      let notificationId = currentTask.notificationId;

      // If marked as completed, cancel upcoming notification
      if (nextCompleted && notificationId) {
        await cancelTaskReminder(notificationId);
        notificationId = null;
      } else if (!nextCompleted && currentTask.reminder) {
        // If marked uncompleted and has reminder, reschedule
        notificationId = await scheduleTaskReminder(currentTask);
      }

      const updatedTask = {
        ...currentTask,
        completed: nextCompleted,
        notificationId,
      };

      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = updatedTask;
      await updateTasksStateAndStorage(updatedTasks);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  /**
   * Delete a task by ID
   */
  const deleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find((t) => t.id === id);
      if (taskToDelete && taskToDelete.notificationId) {
        await cancelTaskReminder(taskToDelete.notificationId);
      }

      const updatedTasks = tasks.filter((t) => t.id !== id);
      await updateTasksStateAndStorage(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  /**
   * Clear all completed tasks
   */
  const clearCompletedTasks = async () => {
    try {
      const completedTasks = tasks.filter((t) => t.completed);
      for (const t of completedTasks) {
        if (t.notificationId) {
          await cancelTaskReminder(t.notificationId);
        }
      }

      const activeTasks = tasks.filter((t) => !t.completed);
      await updateTasksStateAndStorage(activeTasks);
      return completedTasks.length;
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
      throw error;
    }
  };

  /**
   * Reset application data to default sample tasks
   */
  const resetWithSamples = async () => {
    try {
      // Cancel all existing scheduled notifications
      for (const t of tasks) {
        if (t.notificationId) {
          await cancelTaskReminder(t.notificationId);
        }
      }

      const samples = await resetAppData();
      setTasks(samples);
      return samples;
    } catch (error) {
      console.error('Error resetting tasks:', error);
      throw error;
    }
  };

  // Statistics Computations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const todayTasks = tasks.filter((t) => isToday(t.dueDate));
  const todayPendingTasks = todayTasks.filter((t) => !t.completed);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityCount = tasks.filter((t) => !t.completed && t.priority === 'High').length;

  const categoryCounts = {
    Personal: tasks.filter((t) => t.category === 'Personal' && !t.completed).length,
    College: tasks.filter((t) => t.category === 'College' && !t.completed).length,
    Work: tasks.filter((t) => t.category === 'Work' && !t.completed).length,
    Other: tasks.filter((t) => t.category === 'Other' && !t.completed).length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompleted,
        clearCompletedTasks,
        resetWithSamples,
        totalTasks,
        completedTasks,
        pendingTasks,
        todayTasks,
        todayPendingTasks,
        completionRate,
        highPriorityCount,
        categoryCounts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
