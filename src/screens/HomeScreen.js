// Enhanced HomeScreen Component - Modern Executive Dashboard

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
  const { theme, isDark, toggleTheme } = useTheme();
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
  const [todayFilter, setTodayFilter] = useState('all'); // 'all' | 'pending'

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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const displayedTodayTasks =
    todayFilter === 'pending'
      ? todayTasks.filter((t) => !t.completed)
      : todayTasks;

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
        {/* Top Header Row */}
        <View style={styles.topHeader}>
          <View>
            <View style={styles.dateBadge}>
              <Ionicons name="calendar-outline" size={13} color={colors.primary} style={{ marginRight: 4 }} />
              <Text style={[styles.dateText, { color: colors.primary }]}>
                {currentDateFormatted}
              </Text>
            </View>
            <Text style={[styles.greetingText, { color: theme.text }]}>
              Daily Focus ✨
            </Text>
          </View>

          {/* Header Action Buttons */}
          <View style={styles.headerActions}>
            {/* Quick Dark/Light Mode Switcher */}
            <TouchableOpacity
              style={[
                styles.headerIconBtn,
                { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
              ]}
              onPress={toggleTheme}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={18}
                color={isDark ? colors.amber : colors.primary}
              />
            </TouchableOpacity>

            {/* Quick Settings Icon */}
            <TouchableOpacity
              style={[
                styles.headerIconBtn,
                { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
              ]}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="cog-outline" size={19} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO GRADIENT PRODUCTIVITY BANNER */}
        <View
          style={[
            styles.heroBanner,
            {
              backgroundColor: isDark ? '#101524' : '#4F46E5',
              borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(79, 70, 229, 0.3)',
            },
          ]}
        >
          {/* Decorative Background Circles */}
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />

          <View style={styles.heroTopRow}>
            <View style={{ flex: 1, paddingRight: spacing.md }}>
              <View style={styles.streakPill}>
                <Ionicons name="flame" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                <Text style={styles.streakText}>Active Productivity Flow</Text>
              </View>
              <Text style={styles.heroTitle}>
                {completionRate === 100 && totalTasks > 0
                  ? 'All tasks completed!'
                  : completionRate >= 50
                  ? 'Great momentum today!'
                  : 'Start your agenda today!'}
              </Text>
              <Text style={styles.heroSubtitle}>
                {completedTasks} completed out of {totalTasks} total tasks
              </Text>
            </View>

            {/* Glowing Percentage Badge */}
            <View style={styles.heroProgressBadge}>
              <Text style={styles.heroProgressNumber}>{completionRate}%</Text>
              <Text style={styles.heroProgressLabel}>DONE</Text>
            </View>
          </View>

          {/* Slim Progress Bar */}
          <View style={styles.heroBarTrack}>
            <View
              style={[
                styles.heroBarFill,
                { width: `${Math.min(Math.max(completionRate, 4), 100)}%` },
              ]}
            />
          </View>
        </View>

        {/* 2x2 METRICS GRID */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              icon="calendar"
              iconColor="#3B82F6"
              iconBg={isDark ? '#0B2347' : '#DBEAFE'}
              label="Today's Tasks"
              value={todayTasks.length}
              subtext={`${todayPendingTasks.length} to do`}
              onPress={() => navigation.navigate('Tasks', { filter: 'All' })}
            />
            <StatCard
              icon="layers"
              iconColor="#A855F7"
              iconBg={isDark ? '#2E1065' : '#F3E8FF'}
              label="Total Tasks"
              value={totalTasks}
              subtext="Stored in app"
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
              subtext="Finished tasks"
              onPress={() => navigation.navigate('Tasks', { filter: 'Completed' })}
            />
            <StatCard
              icon="time"
              iconColor="#F59E0B"
              iconBg={isDark ? '#451A03' : '#FEF3C7'}
              label="Pending"
              value={pendingTasks}
              subtext="Awaiting action"
              onPress={() => navigation.navigate('Tasks', { filter: 'Pending' })}
            />
          </View>
        </View>

        {/* CATEGORY EXPLORER */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Task Categories
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
              Tap to browse by domain
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tasks', { filter: 'All' })}
            style={styles.viewAllPill}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View All
            </Text>
            <Ionicons name="arrow-forward" size={12} color={colors.primary} style={{ marginLeft: 2 }} />
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
                  styles.categoryCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('Tasks', { filter: 'All', category: cat.id })
                }
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.catIconWrap,
                    {
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : cat.bg,
                    },
                  ]}
                >
                  <Ionicons name={cat.icon} size={20} color={cat.color} />
                </View>

                <Text style={[styles.catName, { color: theme.text }]}>
                  {cat.name}
                </Text>
                <Text style={[styles.catCount, { color: theme.textSecondary }]}>
                  {count} {count === 1 ? 'task' : 'tasks'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* TODAY'S TASKS SCHEDULE */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Today's Agenda ({todayTasks.length})
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
              {todayPendingTasks.length} pending • {todayTasks.length - todayPendingTasks.length} done
            </Text>
          </View>

          {/* Quick Add Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTask')}
            style={[styles.addQuickButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
            <Text style={styles.addQuickButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Filter toggle for Today */}
        {todayTasks.length > 0 && (
          <View style={styles.todayToggleRow}>
            <TouchableOpacity
              style={[
                styles.todayToggleBtn,
                todayFilter === 'all' && [
                  styles.todayToggleBtnActive,
                  { backgroundColor: colors.primary },
                ],
              ]}
              onPress={() => setTodayFilter('all')}
            >
              <Text
                style={[
                  styles.todayToggleText,
                  { color: todayFilter === 'all' ? '#FFFFFF' : theme.textSecondary },
                ]}
              >
                All Today ({todayTasks.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.todayToggleBtn,
                todayFilter === 'pending' && [
                  styles.todayToggleBtnActive,
                  { backgroundColor: colors.primary },
                ],
              ]}
              onPress={() => setTodayFilter('pending')}
            >
              <Text
                style={[
                  styles.todayToggleText,
                  { color: todayFilter === 'pending' ? '#FFFFFF' : theme.textSecondary },
                ]}
              >
                Pending ({todayPendingTasks.length})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {displayedTodayTasks.length === 0 ? (
          <EmptyState
            icon="sunny-outline"
            title={
              todayFilter === 'pending' && todayTasks.length > 0
                ? "All today's tasks completed!"
                : 'No tasks scheduled for today'
            }
            subtitle={
              todayFilter === 'pending' && todayTasks.length > 0
                ? 'Outstanding work! All of your agenda for today is checked off.'
                : 'Plan your day in advance. Tap "+ Add Task" to set your goals.'
            }
            buttonText="Create Today's Task"
            onButtonPress={() => navigation.navigate('AddTask')}
          />
        ) : (
          displayedTodayTasks.map((task) => (
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
            ? `Are you sure you want to delete "${taskToDelete.title}"? This cannot be undone.`
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
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBanner: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    elevation: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
  },
  decorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  streakText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginTop: 4,
  },
  heroProgressBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroProgressNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  heroProgressLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  heroBarFill: {
    height: '100%',
    backgroundColor: '#34D399',
    borderRadius: 4,
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
    alignItems: 'flex-end',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  viewAllPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryScroll: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    minWidth: 125,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  catIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  catName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  catCount: {
    fontSize: 11,
    fontWeight: '500',
  },
  addQuickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    elevation: 2,
  },
  addQuickButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  todayToggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  todayToggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: 'transparent',
  },
  todayToggleBtnActive: {
    elevation: 2,
  },
  todayToggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
