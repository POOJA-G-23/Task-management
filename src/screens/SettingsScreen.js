// SettingsScreen Component

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { sendTestNotification } from '../services/notificationService';

export const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate,
    clearCompletedTasks,
    resetWithSamples,
  } = useTasks();

  // Modal dialog states
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [notificationStatusMsg, setNotificationStatusMsg] = useState(null);

  const handleClearCompleted = async () => {
    try {
      const count = await clearCompletedTasks();
      setClearModalVisible(false);
      Alert.alert('Success', `Cleared ${count} completed task(s).`);
    } catch (e) {
      Alert.alert('Error', 'Failed to clear completed tasks.');
    }
  };

  const handleResetData = async () => {
    try {
      await resetWithSamples();
      setResetModalVisible(false);
      Alert.alert('Success', 'Application data reset to default sample tasks.');
    } catch (e) {
      Alert.alert('Error', 'Failed to reset application data.');
    }
  };

  const handleTestNotification = async () => {
    const res = await sendTestNotification();
    if (res.success) {
      Alert.alert('Test Notification Sent', 'Check your device notification drawer!');
    } else {
      Alert.alert('Notice', 'Notification permission may not be enabled or supported on this device/simulator.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Preferences, analytics, and data management
          </Text>
        </View>

        {/* SECTION 1: APPEARANCE */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          APPEARANCE & THEME
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: isDark ? '#2D1B69' : '#EEF2FF' },
                ]}
              >
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Dark Theme
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  {isDark ? 'Dark theme is currently active' : 'Light theme is currently active'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: colors.primaryLight }}
              thumbColor={isDark ? colors.primary : '#FFFFFF'}
            />
          </View>
        </View>

        {/* SECTION 2: NOTIFICATIONS */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          NOTIFICATIONS & ALERTS
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <TouchableOpacity
            style={styles.settingRow}
            onPress={handleTestNotification}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: isDark ? '#064E3B' : '#D1FAE5' },
                ]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={colors.accent}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Send Test Notification
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Verify that task alert notifications work on your device
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECTION 3: PRODUCTIVITY OVERVIEW */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          TASK ANALYTICS SUMMARY
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.analyticRow}>
            <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
              Total Tasks
            </Text>
            <Text style={[styles.analyticValue, { color: theme.text }]}>
              {totalTasks}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
              Tasks Completed
            </Text>
            <Text style={[styles.analyticValue, { color: colors.accent }]}>
              {completedTasks}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
              Tasks Pending
            </Text>
            <Text style={[styles.analyticValue, { color: colors.light.warning }]}>
              {pendingTasks}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
              Overall Completion Rate
            </Text>
            <Text style={[styles.analyticValue, { color: colors.primary }]}>
              {completionRate}%
            </Text>
          </View>
        </View>

        {/* SECTION 4: DATA MANAGEMENT */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          DATA STORAGE & ACTIONS
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setClearModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: isDark ? '#451A03' : '#FEF3C7' },
                ]}
              >
                <Ionicons
                  name="trash-bin-outline"
                  size={20}
                  color={colors.light.warning}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Clear Completed Tasks
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Remove finished tasks while keeping pending ones
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setResetModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: isDark ? '#3B1318' : '#FEE2E2' },
                ]}
              >
                <Ionicons
                  name="refresh-outline"
                  size={20}
                  color={colors.light.danger}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: colors.light.danger }]}>
                  Reset All Application Data
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Restores original sample tasks for testing
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECTION 5: APP INFO */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          APPLICATION INFORMATION
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              App Name
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              TaskMaster Mobile
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Version
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              1.0.0 (Release)
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Framework
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              React Native + Expo SDK 57
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Lab Course
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              Application Development Lab - Exp 3
            </Text>
          </View>
        </View>

        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          Crafted with modern mobile standards & clean JavaScript.
        </Text>
      </ScrollView>

      {/* Confirmation Modal for Clearing Completed Tasks */}
      <ConfirmationModal
        visible={clearModalVisible}
        title="Clear Completed Tasks?"
        message={`This will permanently delete ${completedTasks} completed task(s) from your storage.`}
        confirmText="Clear Completed"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleClearCompleted}
        onCancel={() => setClearModalVisible(false)}
      />

      {/* Confirmation Modal for Resetting App Data */}
      <ConfirmationModal
        visible={resetModalVisible}
        title="Reset Application Data?"
        message="This will wipe your current tasks and restore initial sample tasks for demonstration."
        confirmText="Reset Everything"
        cancelText="Cancel"
        isDestructive={true}
        icon="refresh-circle-outline"
        onConfirm={handleResetData}
        onCancel={() => setResetModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl * 2,
  },
  header: {
    marginBottom: spacing.xl,
    marginTop: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.md,
  },
  analyticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  analyticLabel: {
    fontSize: 14,
  },
  analyticValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  infoLabel: {
    fontSize: 13,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
