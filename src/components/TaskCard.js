// TaskCard Component

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
import { formatFriendlyDate, formatTime12Hour, isOverdue } from '../utils/dateUtils';

export const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onPress,
}) => {
  const { theme, isDark } = useTheme();

  const isTaskOverdue = !task.completed && isOverdue(task.dueDate, task.dueTime);
  const friendlyDate = formatFriendlyDate(task.dueDate);
  const formattedTime = formatTime12Hour(task.dueTime);

  return (
    <Pressable
      onPress={onPress || onEdit}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: isTaskOverdue
            ? isDark ? '#7F1D1D' : '#FCA5A5'
            : theme.border,
          shadowColor: theme.shadow,
          opacity: task.completed ? 0.72 : pressed ? 0.95 : 1,
        },
      ]}
    >
      <View style={styles.mainRow}>
        {/* Checkbox Button */}
        <TouchableOpacity
          style={[
            styles.checkbox,
            task.completed
              ? { backgroundColor: colors.accent, borderColor: colors.accent }
              : { borderColor: theme.textMuted },
          ]}
          onPress={() => onToggleComplete(task.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          )}
        </TouchableOpacity>

        {/* Content Area */}
        <View style={styles.content}>
          {/* Header Row: Title & Action icons */}
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

            <View style={styles.actions}>
              {onEdit && (
                <TouchableOpacity
                  onPress={() => onEdit(task)}
                  style={styles.iconButton}
                  hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
                >
                  <Ionicons
                    name="pencil-outline"
                    size={18}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              )}
              {onDelete && (
                <TouchableOpacity
                  onPress={() => onDelete(task.id, task.title)}
                  style={styles.iconButton}
                  hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={colors.light.danger}
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

          {/* Date, Time & Reminder badges */}
          <View style={styles.metaRow}>
            <View
              style={[
                styles.dateBadge,
                {
                  backgroundColor: isTaskOverdue
                    ? isDark ? '#3B1318' : '#FEE2E2'
                    : isDark ? 'rgba(255,255,255,0.06)' : theme.surfaceSecondary,
                },
              ]}
            >
              <Ionicons
                name={isTaskOverdue ? 'alert-circle' : 'calendar-outline'}
                size={13}
                color={isTaskOverdue ? colors.light.danger : theme.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.dateText,
                  {
                    color: isTaskOverdue
                      ? colors.light.danger
                      : theme.textSecondary,
                    fontWeight: isTaskOverdue ? '700' : '500',
                  },
                ]}
              >
                {isTaskOverdue ? `Overdue • ${friendlyDate}` : friendlyDate}
                {formattedTime ? ` • ${formattedTime}` : ''}
              </Text>
            </View>

            {task.reminder && (
              <View
                style={[
                  styles.reminderBadge,
                  {
                    backgroundColor: isDark ? 'rgba(79, 70, 229, 0.2)' : '#EEF2FF',
                  },
                ]}
              >
                <Ionicons name="notifications" size={12} color={colors.primary} />
              </View>
            )}
          </View>

          {/* Bottom Badges: Priority and Category */}
          <View style={styles.footerRow}>
            <PriorityBadge priority={task.priority} size="small" />
            <CategoryBadge category={task.category} size="small" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
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
    fontWeight: '600',
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 22,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 2,
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  metaRow: {
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
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  dateText: {
    fontSize: 11,
  },
  reminderBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.sm,
  },
});
