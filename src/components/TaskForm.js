// TaskForm Component
// Reusable form component for both Add and Edit task operations

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES, PRIORITIES } from '../utils/constants';
import {
  formatDateToISO,
  formatFriendlyDate,
  formatTime12Hour,
  getDateOffset,
} from '../utils/dateUtils';
import { DateTimePickerModal } from './DateTimePickerModal';

export const TaskForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitButtonText = 'Save Task',
  isLoading = false,
}) => {
  const { theme, isDark } = useTheme();

  // Form State
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [dueDate, setDueDate] = useState(
    initialValues?.dueDate || formatDateToISO(new Date())
  );
  const [dueTime, setDueTime] = useState(initialValues?.dueTime || '09:00');
  const [priority, setPriority] = useState(initialValues?.priority || 'Medium');
  const [category, setCategory] = useState(initialValues?.category || 'Personal');
  const [reminder, setReminder] = useState(
    initialValues?.reminder !== undefined ? initialValues.reminder : true
  );

  // Validation errors
  const [errors, setErrors] = useState({});

  // Date/Time Picker Modal states
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' | 'time'

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      dueTime,
      priority,
      category,
      reminder,
    });
  };

  const openPicker = (mode) => {
    setPickerMode(mode);
    setPickerVisible(true);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Title Field */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>
          Task Title <Text style={{ color: colors.light.danger }}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: errors.title ? colors.light.danger : theme.border,
            },
          ]}
          placeholder="e.g. Prepare Mobile App Presentation"
          placeholderTextColor={theme.textMuted}
          value={title}
          onChangeText={(val) => {
            setTitle(val);
            if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
          }}
          maxLength={100}
        />
        {errors.title && (
          <Text style={[styles.errorText, { color: colors.light.danger }]}>
            {errors.title}
          </Text>
        )}
      </View>

      {/* Description Field */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Add details, notes, links, or instructions..."
          placeholderTextColor={theme.textMuted}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Due Date & Time Section */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>
          Schedule (Date & Time)
        </Text>
        <View style={styles.scheduleRow}>
          {/* Date Picker Button */}
          <TouchableOpacity
            style={[
              styles.pickerButton,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.border,
              },
            ]}
            onPress={() => openPicker('date')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <View>
              <Text style={[styles.pickerSubtext, { color: theme.textMuted }]}>Due Date</Text>
              <Text style={[styles.pickerValueText, { color: theme.text }]}>
                {formatFriendlyDate(dueDate)}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Time Picker Button */}
          <TouchableOpacity
            style={[
              styles.pickerButton,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.border,
              },
            ]}
            onPress={() => openPicker('time')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="time-outline"
              size={18}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <View>
              <Text style={[styles.pickerSubtext, { color: theme.textMuted }]}>Due Time</Text>
              <Text style={[styles.pickerValueText, { color: theme.text }]}>
                {formatTime12Hour(dueTime)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Date Chips */}
        <View style={styles.quickChipsRow}>
          <TouchableOpacity
            style={[
              styles.quickChip,
              { backgroundColor: theme.surfaceSecondary },
              dueDate === getDateOffset(0) && { backgroundColor: colors.primary },
            ]}
            onPress={() => setDueDate(getDateOffset(0))}
          >
            <Text
              style={[
                styles.quickChipText,
                { color: dueDate === getDateOffset(0) ? '#FFFFFF' : theme.textSecondary },
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickChip,
              { backgroundColor: theme.surfaceSecondary },
              dueDate === getDateOffset(1) && { backgroundColor: colors.primary },
            ]}
            onPress={() => setDueDate(getDateOffset(1))}
          >
            <Text
              style={[
                styles.quickChipText,
                { color: dueDate === getDateOffset(1) ? '#FFFFFF' : theme.textSecondary },
              ]}
            >
              Tomorrow
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickChip,
              { backgroundColor: theme.surfaceSecondary },
              dueDate === getDateOffset(7) && { backgroundColor: colors.primary },
            ]}
            onPress={() => setDueDate(getDateOffset(7))}
          >
            <Text
              style={[
                styles.quickChipText,
                { color: dueDate === getDateOffset(7) ? '#FFFFFF' : theme.textSecondary },
              ]}
            >
              Next Week
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Priority Selector */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Priority Level</Text>
        <View style={styles.priorityRow}>
          {PRIORITIES.map((p) => {
            const isSelected = priority === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.priorityOption,
                  {
                    backgroundColor: isSelected
                      ? isDark
                        ? colors.priority[p.id].bgDark
                        : colors.priority[p.id].bgLight
                      : theme.inputBg,
                    borderColor: isSelected
                      ? colors.priority[p.id].color
                      : theme.border,
                  },
                ]}
                onPress={() => setPriority(p.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={p.icon}
                  size={16}
                  color={isSelected ? colors.priority[p.id].color : theme.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color: isSelected ? colors.priority[p.id].color : theme.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Category Selector */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((c) => {
            const isSelected = category === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.categoryOption,
                  {
                    backgroundColor: isSelected
                      ? isDark
                        ? 'rgba(255,255,255,0.1)'
                        : c.bg
                      : theme.inputBg,
                    borderColor: isSelected ? c.color : theme.border,
                  },
                ]}
                onPress={() => setCategory(c.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={c.icon}
                  size={18}
                  color={isSelected ? c.color : theme.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isSelected ? c.color : theme.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Reminder Toggle */}
      <View
        style={[
          styles.reminderCard,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.reminderInfo}>
          <View
            style={[
              styles.reminderIconBg,
              { backgroundColor: reminder ? 'rgba(79, 70, 229, 0.15)' : theme.surfaceSecondary },
            ]}
          >
            <Ionicons
              name={reminder ? 'notifications' : 'notifications-off-outline'}
              size={20}
              color={reminder ? colors.primary : theme.textMuted}
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={[styles.reminderTitle, { color: theme.text }]}>
              Task Notification Reminder
            </Text>
            <Text style={[styles.reminderSubtitle, { color: theme.textSecondary }]}>
              Receive an alert when this task is due
            </Text>
          </View>
        </View>
        <Switch
          value={reminder}
          onValueChange={setReminder}
          trackColor={{ false: theme.border, true: colors.primaryLight }}
          thumbColor={reminder ? colors.primary : '#FFFFFF'}
        />
      </View>

      {/* Buttons */}
      <View style={styles.actionButtons}>
        {onCancel && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelBtn,
              { borderColor: theme.border, backgroundColor: theme.surfaceSecondary },
            ]}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: theme.textSecondary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            styles.submitBtn,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleSave}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color="#FFFFFF"
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.buttonText, { color: '#FFFFFF', fontWeight: '700' }]}>
            {isLoading ? 'Saving...' : submitButtonText}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date/Time Picker Modal */}
      <DateTimePickerModal
        visible={pickerVisible}
        mode={pickerMode}
        currentValue={pickerMode === 'date' ? dueDate : dueTime}
        onConfirm={(val) => {
          if (pickerMode === 'date') setDueDate(val);
          else setDueTime(val);
        }}
        onClose={() => setPickerVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl * 2,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs + 2,
  },
  input: {
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  scheduleRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  pickerSubtext: {
    fontSize: 11,
    fontWeight: '500',
  },
  pickerValueText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  quickChipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  quickChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
  },
  priorityText: {
    fontSize: 13,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
  },
  categoryText: {
    fontSize: 13,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  reminderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  reminderSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderWidth: 1,
  },
  submitBtn: {
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 15,
  },
});
