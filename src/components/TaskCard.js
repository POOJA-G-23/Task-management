// Enhanced TaskCard Component - Linear/Modern Mobile Aesthetic

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { PriorityBadge } from './PriorityBadge';
import { CategoryBadge } from './CategoryBadge';
import { formatFriendlyDate, formatTime12Hour, isOverdue, isToday } from '../utils/dateUtils';

export const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onPress,
}) => {
  const { theme, isDark } = useTheme();

  const isTaskOverdue = !task.completed && isOverdue(task.dueDate, task.dueTime);
  const isTaskToday = !task.completed && isToday(task.dueDate);
  const friendlyDate = formatFriendlyDate(task.dueDate);
  const formattedTime = formatTime12Hour(task.dueTime);

  const priorityConfig = colors.priority[task.priority] || colors.priority.Medium;

  return (
    <Pressable
      onPress={onPress || onEdit}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: isTaskOverdue
            ? isDark ? '#881337' : '#FDA4AF'
            : theme.border,
          shadowColor: isTaskOverdue ? colors.rose : theme.shadow,
          opacity: task.completed ? 0.65 : pressed ? 0.94 : 1,
        },
      ]}
    >
      {/* Left Priority Accent Stripe */}
      <View
        style={[
          styles.priorityStripe,
          {
            backgroundColor: task.completed
              ? theme.textMuted
              : priorityConfig.stripe,
          },
        ]}
      />

      <View style={styles.cardInner}>
        {/* Main Content Area */}
        <View style={styles.mainRow}>
          {/* Custom Squircle Checkbox */}
          <TouchableOpacity
            style={[
              styles.checkbox,
              task.completed
                ? {
                    backgroundColor: colors.accent,
                    borderColor: colors.accent,
                  }
                : {
                    borderColor: isDark ? 'rgba(255,255,255,0.25)' : '#CBD5E1',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC',
                  },
            ]}
            onPress={() => onToggleComplete(task.id)}
            activeOpacity={0.65}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {task.completed && (
              <Ionicons name="checkmark" size={15} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          {/* Texts & Badges */}
          <View style={styles.content}>
            {/* Header: Title + Actions */}
            <View style={styles.titleRow}>
              <Text
                style={[
                  styles.title,
                  { color: theme.text },
                  task.completed && [
                    styles.titleCompleted,
                    { color: theme.textMuted },
                  ],
                ]}
                numberOfLines={2}
              >
                {task.title}
              </Text>

              {/* Action Buttons */}
              <View style={styles.actions}>
                {onEdit && (
                  <TouchableOpacity
                    onPress={() => onEdit(task)}
                    style={[
                      styles.actionIconButton,
                      { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9' },
                    ]}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <Ionicons
                      name="pencil"
                      size={14}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                )}
                {onDelete && (
                  <TouchableOpacity
                    onPress={() => onDelete(task.id, task.title)}
                    style={[
                      styles.actionIconButton,
                      { backgroundColor: isDark ? 'rgba(244, 63, 94, 0.12)' : '#FFE4E6' },
                    ]}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <Ionicons
                      name="trash"
                      size={14}
                      color={colors.rose}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Description */}
            {!!task.description && (
              <Text
                style={[
                  styles.description,
                  { color: theme.textSecondary },
                  task.completed && { color: theme.textMuted },
                ]}
                numberOfLines={2}
              >
                {task.description}
              </Text>
            )}

            {/* Date & Time pill */}
            <View style={styles.scheduleRow}>
              <View
                style={[
                  styles.dateBadge,
                  {
                    backgroundColor: isTaskOverdue
                      ? isDark ? '#2E111A' : '#FFE4E6'
                      : isTaskToday
                      ? isDark ? '#2C1D06' : '#FEF3C7'
                      : isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9',
                  },
                ]}
              >
                <Ionicons
                  name={
                    isTaskOverdue
                      ? 'warning'
                      : isTaskToday
                      ? 'flash'
                      : 'calendar-outline'
                  }
                  size={12}
                  color={
                    isTaskOverdue
                      ? colors.rose
                      : isTaskToday
                      ? colors.amber
                      : theme.textSecondary
                  }
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.dateText,
                    {
                      color: isTaskOverdue
                        ? colors.rose
                        : isTaskToday
                        ? colors.amber
                        : theme.textSecondary,
                      fontWeight: isTaskOverdue || isTaskToday ? '700' : '500',
                    },
                  ]}
                >
                  {isTaskOverdue
                    ? `Overdue • ${friendlyDate}`
                    : isTaskToday
                    ? `Due Today • ${formattedTime || 'Today'}`
                    : `${friendlyDate} • ${formattedTime || 'All Day'}`}
                </Text>
              </View>

              {task.reminder && (
                <View
                  style={[
                    styles.reminderBadge,
                    {
                      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : '#EEF2FF',
                    },
                  ]}
                >
                  <Ionicons name="notifications" size={11} color={colors.primary} />
                </View>
              )}
            </View>

            {/* Bottom Row Badges */}
            <View style={styles.footerRow}>
              <PriorityBadge priority={task.priority} size="small" />
              <CategoryBadge category={task.category} size="small" />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  priorityStripe: {
    width: 5,
  },
  cardInner: {
    flex: 1,
    padding: spacing.md + 2,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIconButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  dateText: {
    fontSize: 11,
  },
  reminderBadge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.sm + 2,
  },
});
