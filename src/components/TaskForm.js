// Enhanced TaskForm Component - Polished Inputs, Glowing Selectors & Haptics

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
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

  // Focus states
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Date/Time Picker Modal states
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' | 'time'

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Please enter a task title';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
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
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: theme.text }]}>Task Title</Text>
          <Text style={[styles.requiredBadge, { color: colors.rose }]}>Required</Text>
        </View>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: errors.title
                ? colors.rose
                : titleFocused
                ? colors.primary
                : theme.inputBorder,
              shadowColor: titleFocused ? colors.primary : 'transparent',
              shadowOpacity: titleFocused ? 0.2 : 0,
            },
          ]}
          placeholder="e.g. Complete Experiment 3 Report & Testing"
          placeholderTextColor={theme.textMuted}
          value={title}
          onChangeText={(val) => {
            setTitle(val);
            if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
          }}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          maxLength={100}
        />
        {errors.title && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color={colors.rose} style={{ marginRight: 4 }} />
            <Text style={[styles.errorText, { color: colors.rose }]}>
              {errors.title}
            </Text>
          </View>
        )}
      </View>

      {/* Description Field */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Description & Notes</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: descFocused ? colors.primary : theme.inputBorder,
              shadowColor: descFocused ? colors.primary : 'transparent',
              shadowOpacity: descFocused ? 0.2 : 0,
            },
          ]}
          placeholder="Add actionable steps, references, links, or notes..."
          placeholderTextColor={theme.textMuted}
          value={description}
          onChangeText={setDescription}
          onFocus={() => setDescFocused(true)}
          onBlur={() => setDescFocused(false)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Due Date & Time Section */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Schedule</Text>
        <View style={styles.scheduleRow}>
          {/* Date Picker Button */}
          <TouchableOpacity
            style={[
              styles.pickerButton,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
              },
            ]}
            onPress={() => openPicker('date')}
            activeOpacity={0.7}
          >
            <View style={[styles.pickerIconBg, { backgroundColor: isDark ? '#1E1B4B' : '#EEF2FF' }]}>
              <Ionicons name="calendar" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.pickerSubtext, { color: theme.textMuted }]}>Due Date</Text>
              <Text style={[styles.pickerValueText, { color: theme.text }]}>
                {formatFriendlyDate(dueDate)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>

          {/* Time Picker Button */}
          <TouchableOpacity
            style={[
              styles.pickerButton,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
              },
            ]}
            onPress={() => openPicker('time')}
            activeOpacity={0.7}
          >
            <View style={[styles.pickerIconBg, { backgroundColor: isDark ? '#064E3B' : '#D1FAE5' }]}>
              <Ionicons name="time" size={18} color={colors.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.pickerSubtext, { color: theme.textMuted }]}>Due Time</Text>
              <Text style={[styles.pickerValueText, { color: theme.text }]}>
                {formatTime12Hour(dueTime)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Quick Date Chips */}
        <View style={styles.quickChipsRow}>
          {[
            { label: 'Today', offset: 0 },
            { label: 'Tomorrow', offset: 1 },
            { label: 'Next Week', offset: 7 },
          ].map((chip) => {
            const isChipActive = dueDate === getDateOffset(chip.offset);
            return (
              <TouchableOpacity
                key={chip.label}
                style={[
                  styles.quickChip,
                  {
                    backgroundColor: isChipActive
                      ? colors.primary
                      : theme.surfaceSecondary,
                    borderColor: isChipActive ? colors.primary : theme.border,
                  },
                ]}
                onPress={() => setDueDate(getDateOffset(chip.offset))}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.quickChipText,
                    {
                      color: isChipActive ? '#FFFFFF' : theme.textSecondary,
                      fontWeight: isChipActive ? '700' : '600',
                    },
                  ]}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Priority Selector */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Priority</Text>
        <View style={styles.priorityRow}>
          {PRIORITIES.map((p) => {
            const isSelected = priority === p.id;
            const pConf = colors.priority[p.id];
            return (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.priorityOption,
                  {
                    backgroundColor: isSelected
                      ? isDark
                        ? pConf.bgDark
                        : pConf.bgLight
                      : theme.inputBg,
                    borderColor: isSelected ? pConf.color : theme.inputBorder,
                  },
                  isSelected && styles.prioritySelectedShadow,
                ]}
                onPress={() => setPriority(p.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={p.icon}
                  size={16}
                  color={isSelected ? pConf.color : theme.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color: isSelected ? pConf.color : theme.textSecondary,
                      fontWeight: isSelected ? '800' : '600',
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
        <Text style={[styles.label, { color: theme.text }]}>Category Domain</Text>
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
                    borderColor: isSelected ? c.color : theme.inputBorder,
                  },
                ]}
                onPress={() => setCategory(c.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.catIconMini,
                    {
                      backgroundColor: isSelected ? c.color : isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                    },
                  ]}
                >
                  <Ionicons
                    name={c.icon}
                    size={16}
                    color={isSelected ? '#FFFFFF' : c.color}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isSelected ? c.color : theme.textSecondary,
                      fontWeight: isSelected ? '800' : '600',
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

      {/* Reminder Toggle Card */}
      <View
        style={[
          styles.reminderCard,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
          },
        ]}
      >
        <View style={styles.reminderInfo}>
          <View
            style={[
              styles.reminderIconBg,
              { backgroundColor: reminder ? (isDark ? '#1E1B4B' : '#EEF2FF') : theme.surfaceSecondary },
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
              Task Due Reminder
            </Text>
            <Text style={[styles.reminderSubtitle, { color: theme.textSecondary }]}>
              Receive an automatic alert when this task is due
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
            name="checkmark-circle"
            size={18}
            color="#FFFFFF"
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.buttonText, { color: '#FFFFFF', fontWeight: '800' }]}>
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
    marginBottom: spacing.xl,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: spacing.xs,
  },
  requiredBadge: {
    fontSize: 11,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.md,
    fontSize: 15,
  },
  textArea: {
    height: 105,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
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
    borderWidth: 1.5,
  },
  pickerIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  pickerSubtext: {
    fontSize: 11,
    fontWeight: '500',
  },
  pickerValueText: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  quickChipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm + 2,
  },
  quickChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  quickChipText: {
    fontSize: 12,
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
  prioritySelectedShadow: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
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
  catIconMini: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryText: {
    fontSize: 13,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
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
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
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
    height: 50,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderWidth: 1.5,
  },
  submitBtn: {
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 15,
  },
});
