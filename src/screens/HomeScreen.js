// HomeScreen Component

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { CATEGORIES } from '../utils/constants';

export const HomeScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const {
    tasks,
    totalTasks,
    completedTasks,
    pendingTasks,
    todayTasks,
    todayPendingTasks,
    completionRate,
    toggleTaskCompleted,
    deleteTask,
    categoryCounts,
  } = useTasks();

  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleDeleteRequest = (id, title) => {
    setTaskToDelete({ id, title });
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setDeleteModalVisible(false);
      setTaskToDelete(null);
    }
  };

  // Current Date display
  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header Greeting */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.dateText, { color: theme.textSecondary }]}>
              {currentDateFormatted}
            </Text>
            <Text style={[styles.greetingText, { color: theme.text }]}>
              Daily Dashboard 👋
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.headerActionBtn, { backgroundColor: theme.surfaceSecondary }]}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={22} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Progress Banner */}
        <View
          style={[
            styles.progressBanner,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <View style={styles.bannerHeader}>
            <View>
              <Text style={[styles.bannerTitle, { color: theme.text }]}>
                {completionRate === 100
                  ? 'All tasks completed! 🎉'
                  : completionRate > 50
                  ? 'Great progress today! 🚀'
                  : 'Let’s crush some goals today! 💪'}
              </Text>
              <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
                {completedTasks} of {totalTasks} total tasks completed
              </Text>
            </View>
            <View
              style={[
                styles.percentCircle,
                { backgroundColor: isDark ? 'rgba(79, 70, 229, 0.2)' : '#EEF2FF' },
              ]}
            >
              <Text style={[styles.percentCircleText, { color: colors.primary }]}>
                {completionRate}%
              </Text>
            </View>
          </View>

          <ProgressBar progress={completionRate} height={8} showLabel={false} />
        </View>

        {/* Stat Cards 2x2 Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              icon="calendar"
              iconColor="#3B82F6"
              iconBg={isDark ? '#0E294B' : '#DBEAFE'}
              label="Today's Tasks"
              value={todayTasks.length}
              subtext={`${todayPendingTasks.length} pending`}
              onPress={() => navigation.navigate('Tasks', { filter: 'All' })}
            />
            <StatCard
              icon="layers"
              iconColor="#8B5CF6"
              iconBg={isDark ? '#2D1B69' : '#F3E8FF'}
              label="Total Tasks"
              value={totalTasks}
              subtext="Active in app"
              onPress={() => navigation.navigate('Tasks', { filter: 'All' })}
            />
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon="checkmark-done-circle"
              iconColor="#10B981"
              iconBg={isDark ? '#064E3B' : '#D1FAE5'}
              label="Completed"
              value={completedTasks}
              subtext="Tasks finished"
              onPress={() => navigation.navigate('Tasks', { filter: 'Completed' })}
            />
            <StatCard
              icon="time"
              iconColor="#F59E0B"
              iconBg={isDark ? '#451A03' : '#FEF3C7'}
              label="Pending"
              value={pendingTasks}
              subtext="Tasks to do"
              onPress={() => navigation.navigate('Tasks', { filter: 'Pending' })}
            />
          </View>
        </View>

        {/* Category Breakdown Chips */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Categories
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tasks', { filter: 'All' })}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('Tasks', { filter: 'All', category: cat.id })
                }
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.categoryIconCircle,
                    {
                      backgroundColor: isDark
                        ? 'rgba(255,255,255,0.08)'
                        : cat.bg,
                    },
                  ]}
                >
                  <Ionicons name={cat.icon} size={18} color={cat.color} />
                </View>
                <View>
                  <Text style={[styles.categoryName, { color: theme.text }]}>
                    {cat.name}
                  </Text>
                  <Text
                    style={[styles.categoryCount, { color: theme.textSecondary }]}
                  >
                    {count} {count === 1 ? 'task' : 'tasks'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Today's Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Today's Schedule ({todayTasks.length})
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTask')}
            style={styles.addInlineBtn}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
            <Text style={[styles.addInlineText, { color: colors.primary }]}>
              New Task
            </Text>
          </TouchableOpacity>
        </View>

        {todayTasks.length === 0 ? (
          <EmptyState
            icon="sunny-outline"
            title="No tasks scheduled for today"
            subtitle="Take a breather or schedule tasks to stay on track."
            buttonText="Create Today's Task"
            onButtonPress={() => navigation.navigate('AddTask')}
          />
        ) : (
          todayTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskCompleted}
              onEdit={(t) => navigation.navigate('EditTask', { task: t })}
              onDelete={handleDeleteRequest}
            />
          ))
        )}
      </ScrollView>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Task"
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this task?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setTaskToDelete(null);
        }}
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
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  headerActionBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBanner: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  bannerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  percentCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentCircleText: {
    fontSize: 15,
    fontWeight: '800',
  },
  statsGrid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  addInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInlineText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 2,
  },
  categoryScroll: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md - 2,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    minWidth: 135,
  },
  categoryIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryCount: {
    fontSize: 11,
    marginTop: 2,
  },
});
