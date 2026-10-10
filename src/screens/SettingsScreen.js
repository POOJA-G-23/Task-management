// Enhanced SettingsScreen Component - Executive Preferences & Analytics

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
    highPriorityCount,
    clearCompletedTasks,
    resetWithSamples,
  } = useTasks();

  // Modal dialog states
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [isTestingNotification, setIsTestingNotification] = useState(false);

  const handleClearCompleted = async () => {
    try {
      const count = await clearCompletedTasks();
      setClearModalVisible(false);
      Alert.alert('Cleared Completed Tasks', `Removed ${count} completed task(s) from your storage.`);
    } catch (_e) {
      Alert.alert('Error', 'Failed to clear completed tasks.');
    }
  };

  const handleResetData = async () => {
    try {
      await resetWithSamples();
      setResetModalVisible(false);
      Alert.alert('Data Reset Successful', 'Original sample tasks have been restored for demonstration.');
    } catch (_e) {
      Alert.alert('Error', 'Failed to reset application data.');
    }
  };

  const handleTestNotification = async () => {
    setIsTestingNotification(true);
    const res = await sendTestNotification();
    setIsTestingNotification(false);
    if (res.success) {
      Alert.alert('Notification Alert Sent', 'Look at your Android notification bar or banner!');
    } else {
      Alert.alert(
        'Notification Info',
        'Notification sent or running in a simulator environment without native push hardware.'
      );
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
          <Text style={[styles.title, { color: theme.text }]}>Settings & Info</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Preferences, appearance, analytics & data controls
          </Text>
        </View>

        {/* PROFILE CARD */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileNameRow}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                Student Developer
              </Text>
              <View style={[styles.proBadge, { backgroundColor: 'rgba(99, 102, 241, 0.2)' }]}>
                <Text style={[styles.proBadgeText, { color: colors.primary }]}>PRO</Text>
              </View>
            </View>
            <Text style={[styles.profileRole, { color: theme.textSecondary }]}>
              Application Development Lab • Exp 3
            </Text>
          </View>
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
                  { backgroundColor: isDark ? '#1E1B4B' : '#EEF2FF' },
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
                  {isDark ? 'Cyber Slate Dark palette enabled' : 'Clean Modern Light palette enabled'}
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
          NOTIFICATIONS & REMINDERS
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
            disabled={isTestingNotification}
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
                  name="notifications"
                  size={20}
                  color={colors.accent}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Send Test Notification
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  {isTestingNotification ? 'Sending notification alert...' : 'Trigger an instant local alert notification'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECTION 3: PRODUCTIVITY ANALYTICS */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          PRODUCTIVITY OVERVIEW
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.analyticRow}>
            <View style={styles.analyticIconLabel}>
              <Ionicons name="layers-outline" size={18} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
                Total Created Tasks
              </Text>
            </View>
            <Text style={[styles.analyticValue, { color: theme.text }]}>
              {totalTasks}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <View style={styles.analyticIconLabel}>
              <Ionicons name="checkmark-done-circle-outline" size={18} color={colors.accent} style={{ marginRight: 8 }} />
              <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
                Tasks Completed
              </Text>
            </View>
            <Text style={[styles.analyticValue, { color: colors.accent }]}>
              {completedTasks}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <View style={styles.analyticIconLabel}>
              <Ionicons name="time-outline" size={18} color={colors.amber} style={{ marginRight: 8 }} />
              <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
                Tasks Pending
              </Text>
            </View>
            <Text style={[styles.analyticValue, { color: colors.amber }]}>
              {pendingTasks}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <View style={styles.analyticIconLabel}>
              <Ionicons name="flame-outline" size={18} color={colors.rose} style={{ marginRight: 8 }} />
              <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
                High Priority Pending
              </Text>
            </View>
            <Text style={[styles.analyticValue, { color: colors.rose }]}>
              {highPriorityCount}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.analyticRow}>
            <View style={styles.analyticIconLabel}>
              <Ionicons name="pie-chart-outline" size={18} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={[styles.analyticLabel, { color: theme.textSecondary }]}>
                Completion Rate
              </Text>
            </View>
            <Text style={[styles.analyticValue, { color: colors.primary }]}>
              {completionRate}%
            </Text>
          </View>
        </View>

        {/* SECTION 4: DATA MANAGEMENT */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          STORAGE & DATA CONTROLS
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
                  color={colors.amber}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Clear Completed Tasks
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Safely remove finished tasks and keep pending ones
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
                  { backgroundColor: isDark ? '#2E111A' : '#FFE4E6' },
                ]}
              >
                <Ionicons
                  name="refresh"
                  size={20}
                  color={colors.rose}
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: colors.rose }]}>
                  Reset All Application Data
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Restores initial sample tasks for evaluation & demo
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECTION 5: APP INFORMATION */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          APPLICATION SPECIFICATIONS
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>App Name</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>TaskMaster Mobile</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Version</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>1.0.0 (Release)</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Technology</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>JavaScript + React Native + Expo</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Persistence</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>AsyncStorage Engine</Text>
          </View>
        </View>

        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          TaskMaster Mobile • Application Development Lab
        </Text>
      </ScrollView>

      {/* Confirmation Modal for Clearing Completed Tasks */}
      <ConfirmationModal
        visible={clearModalVisible}
        title="Clear Completed Tasks?"
        message={`Are you sure you want to remove ${completedTasks} completed task(s)? This cannot be undone.`}
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
        message="This will wipe your current tasks and re-seed the starter demonstration tasks."
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
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    marginBottom: spacing.xl,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
  },
  proBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  profileRole: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
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
    padding: spacing.md + 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
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
  analyticIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analyticLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  analyticValue: {
    fontSize: 15,
    fontWeight: '800',
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
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
