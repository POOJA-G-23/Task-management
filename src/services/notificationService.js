// Notification Service using Expo Notifications

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getFullDateTime } from '../utils/dateUtils';

// Configure foreground notification behavior
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
} catch (e) {
  console.log('Notification handler config notice:', e.message);
}

/**
 * Configure Android notification channels
 */
export const setupNotificationChannels = async () => {
  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('task-reminders', {
        name: 'Task Reminders',
        description: 'Notifications for due tasks and custom reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4F46E5',
        sound: 'default',
      });
    } catch (e) {
      console.log('Error creating notification channel:', e.message);
    }
  }
};

/**
 * Request notification permissions from the user
 */
export const requestNotificationPermissions = async () => {
  try {
    if (!Device.isDevice && Platform.OS !== 'web') {
      console.log('Notifications test mode: Running in simulator/emulator');
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    await setupNotificationChannels();
    return finalStatus === 'granted';
  } catch (error) {
    console.log('Notification permissions error:', error.message);
    return false;
  }
};

/**
 * Schedule a local notification reminder for a task
 * Returns notification identifier if scheduled, null otherwise
 */
export const scheduleTaskReminder = async (task) => {
  if (!task.reminder || !task.dueDate) return null;

  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.log('Notification permission not granted');
      return null;
    }

    const targetDate = getFullDateTime(task.dueDate, task.dueTime || '09:00');
    const now = new Date();

    // If target date is in the past, do not schedule
    if (targetDate.getTime() <= now.getTime()) {
      console.log('Task due time is in the past, skipping future notification schedule');
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Task Due: ${task.title}`,
        body: task.description ? task.description : `Priority: ${task.priority} | Category: ${task.category}`,
        data: { taskId: task.id },
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: targetDate,
        channelId: 'task-reminders',
      },
    });

    console.log(`Scheduled reminder ${notificationId} for task "${task.title}" at ${targetDate.toLocaleString()}`);
    return notificationId;
  } catch (error) {
    console.log('Failed to schedule reminder notification:', error.message);
    return null;
  }
};

/**
 * Cancel a scheduled reminder notification
 */
export const cancelTaskReminder = async (notificationId) => {
  if (!notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Cancelled reminder ${notificationId}`);
  } catch (error) {
    console.log('Error cancelling notification:', error.message);
  }
};

/**
 * Trigger an immediate test notification (used on Settings screen)
 */
export const sendTestNotification = async () => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return { success: false, message: 'Permission not granted' };
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'TaskMaster Reminder Test',
        body: 'Notifications are working perfectly! You will receive timely alerts for your tasks.',
        sound: 'default',
        channelId: 'task-reminders',
      },
      trigger: null, // immediate
    });

    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
