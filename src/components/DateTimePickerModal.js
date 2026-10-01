// DateTimePickerModal Component
// Cross-platform, beautiful date & time picker for Android, iOS, and Web

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { formatDateToISO, formatTime12Hour } from '../utils/dateUtils';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DateTimePickerModal = ({
  visible,
  mode = 'date', // 'date' | 'time'
  currentValue,
  onConfirm,
  onClose,
}) => {
  const { theme, isDark } = useTheme();

  // Internal state for Date picking
  const initialDate = currentValue ? new Date(currentValue) : new Date();
  const [displayYear, setDisplayYear] = useState(
    isNaN(initialDate.getTime()) ? new Date().getFullYear() : initialDate.getFullYear()
  );
  const [displayMonth, setDisplayMonth] = useState(
    isNaN(initialDate.getTime()) ? new Date().getMonth() : initialDate.getMonth()
  );
  const [selectedDateStr, setSelectedDateStr] = useState(
    currentValue && mode === 'date' ? currentValue : formatDateToISO(new Date())
  );

  // Internal state for Time picking (12h model)
  const parseInitialTime = (timeStr) => {
    if (!timeStr) return { hour: '09', minute: '00', ampm: 'AM' };
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    let h12 = h % 12;
    h12 = h12 ? h12 : 12;
    return {
      hour: String(h12).padStart(2, '0'),
      minute: String(m || 0).padStart(2, '0'),
      ampm,
    };
  };

  const initialTimeObj = parseInitialTime(currentValue);
  const [selectedHour, setSelectedHour] = useState(initialTimeObj.hour);
  const [selectedMinute, setSelectedMinute] = useState(initialTimeObj.minute);
  const [selectedAmPm, setSelectedAmPm] = useState(initialTimeObj.ampm);

  // Month navigation
  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear((prev) => prev - 1);
    } else {
      setDisplayMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear((prev) => prev + 1);
    } else {
      setDisplayMonth((prev) => prev + 1);
    }
  };

  // Calendar days calculation
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(displayYear, displayMonth);
  const firstDay = getFirstDayOfMonth(displayYear, displayMonth);

  const daysGrid = [];
  for (let i = 0; i < firstDay; i++) {
    daysGrid.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    daysGrid.push(day);
  }

  // Handle Date Selection
  const handleSelectDay = (day) => {
    if (!day) return;
    const formatted = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDateStr(formatted);
  };

  // Handle Confirmation
  const handleDone = () => {
    if (mode === 'date') {
      onConfirm(selectedDateStr);
    } else {
      // Convert 12h to 24h
      let h = parseInt(selectedHour, 10);
      if (selectedAmPm === 'PM' && h < 12) h += 12;
      if (selectedAmPm === 'AM' && h === 12) h = 0;
      const formattedTime = `${String(h).padStart(2, '0')}:${selectedMinute}`;
      onConfirm(formattedTime);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              {/* Header */}
              <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <View style={styles.headerTitleRow}>
                  <Ionicons
                    name={mode === 'date' ? 'calendar-outline' : 'time-outline'}
                    size={20}
                    color={colors.primary}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={[styles.headerTitle, { color: theme.text }]}>
                    {mode === 'date' ? 'Select Due Date' : 'Select Due Time'}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name="close" size={22} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* DATE PICKER VIEW */}
              {mode === 'date' && (
                <View style={styles.datePickerContainer}>
                  {/* Month navigation */}
                  <View style={styles.monthNav}>
                    <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
                      <Ionicons name="chevron-back" size={20} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.monthYearText, { color: theme.text }]}>
                      {MONTH_NAMES[displayMonth]} {displayYear}
                    </Text>
                    <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
                      <Ionicons name="chevron-forward" size={20} color={theme.text} />
                    </TouchableOpacity>
                  </View>

                  {/* Weekday headers */}
                  <View style={styles.weekDaysRow}>
                    {WEEK_DAYS.map((wd) => (
                      <Text
                        key={wd}
                        style={[styles.weekDayText, { color: theme.textMuted }]}
                      >
                        {wd}
                      </Text>
                    ))}
                  </View>

                  {/* Days Grid */}
                  <View style={styles.daysGrid}>
                    {daysGrid.map((day, idx) => {
                      if (!day) {
                        return <View key={`empty-${idx}`} style={styles.dayCell} />;
                      }
                      const dateStr = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isSelected = selectedDateStr === dateStr;

                      return (
                        <TouchableOpacity
                          key={dateStr}
                          onPress={() => handleSelectDay(day)}
                          style={[
                            styles.dayCell,
                            isSelected && {
                              backgroundColor: colors.primary,
                              borderRadius: 20,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayText,
                              { color: isSelected ? '#FFFFFF' : theme.text },
                              isSelected && { fontWeight: '700' },
                            ]}
                          >
                            {day}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* Quick Select presets */}
                  <View style={styles.quickPresetsRow}>
                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: theme.surfaceSecondary }]}
                      onPress={() => {
                        const now = new Date();
                        setDisplayYear(now.getFullYear());
                        setDisplayMonth(now.getMonth());
                        setSelectedDateStr(formatDateToISO(now));
                      }}
                    >
                      <Text style={[styles.presetText, { color: theme.textSecondary }]}>Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: theme.surfaceSecondary }]}
                      onPress={() => {
                        const tmrw = new Date();
                        tmrw.setDate(tmrw.getDate() + 1);
                        setDisplayYear(tmrw.getFullYear());
                        setDisplayMonth(tmrw.getMonth());
                        setSelectedDateStr(formatDateToISO(tmrw));
                      }}
                    >
                      <Text style={[styles.presetText, { color: theme.textSecondary }]}>Tomorrow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: theme.surfaceSecondary }]}
                      onPress={() => {
                        const nextWk = new Date();
                        nextWk.setDate(nextWk.getDate() + 7);
                        setDisplayYear(nextWk.getFullYear());
                        setDisplayMonth(nextWk.getMonth());
                        setSelectedDateStr(formatDateToISO(nextWk));
                      }}
                    >
                      <Text style={[styles.presetText, { color: theme.textSecondary }]}>Next Week</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* TIME PICKER VIEW */}
              {mode === 'time' && (
                <View style={styles.timePickerContainer}>
                  <View style={styles.timeSelectorRow}>
                    {/* Hours */}
                    <View style={styles.timeColumn}>
                      <Text style={[styles.timeColHeader, { color: theme.textMuted }]}>Hour</Text>
                      <ScrollView style={styles.timeScroll} showsVerticalScrollIndicator={false}>
                        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((h) => (
                          <TouchableOpacity
                            key={h}
                            style={[
                              styles.timeItem,
                              selectedHour === h && { backgroundColor: colors.primary, borderRadius: 8 },
                            ]}
                            onPress={() => setSelectedHour(h)}
                          >
                            <Text
                              style={[
                                styles.timeItemText,
                                { color: selectedHour === h ? '#FFFFFF' : theme.text },
                                selectedHour === h && { fontWeight: '700' },
                              ]}
                            >
                              {h}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <Text style={[styles.timeColon, { color: theme.text }]}>:</Text>

                    {/* Minutes */}
                    <View style={styles.timeColumn}>
                      <Text style={[styles.timeColHeader, { color: theme.textMuted }]}>Min</Text>
                      <ScrollView style={styles.timeScroll} showsVerticalScrollIndicator={false}>
                        {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((m) => (
                          <TouchableOpacity
                            key={m}
                            style={[
                              styles.timeItem,
                              selectedMinute === m && { backgroundColor: colors.primary, borderRadius: 8 },
                            ]}
                            onPress={() => setSelectedMinute(m)}
                          >
                            <Text
                              style={[
                                styles.timeItemText,
                                { color: selectedMinute === m ? '#FFFFFF' : theme.text },
                                selectedMinute === m && { fontWeight: '700' },
                              ]}
                            >
                              {m}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    {/* AM / PM */}
                    <View style={styles.ampmColumn}>
                      <Text style={[styles.timeColHeader, { color: theme.textMuted }]}>Period</Text>
                      <View style={styles.ampmButtons}>
                        {['AM', 'PM'].map((period) => (
                          <TouchableOpacity
                            key={period}
                            style={[
                              styles.ampmButton,
                              selectedAmPm === period
                                ? { backgroundColor: colors.primary }
                                : { backgroundColor: theme.surfaceSecondary, borderWidth: 1, borderColor: theme.border },
                            ]}
                            onPress={() => setSelectedAmPm(period)}
                          >
                            <Text
                              style={[
                                styles.ampmText,
                                { color: selectedAmPm === period ? '#FFFFFF' : theme.text },
                              ]}
                            >
                              {period}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Quick Time Presets */}
                  <View style={styles.quickPresetsRow}>
                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: theme.surfaceSecondary }]}
                      onPress={() => {
                        setSelectedHour('09');
                        setSelectedMinute('00');
                        setSelectedAmPm('AM');
                      }}
                    >
                      <Text style={[styles.presetText, { color: theme.textSecondary }]}>09:00 AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: theme.surfaceSecondary }]}
                      onPress={() => {
                        setSelectedHour('02');
                        setSelectedMinute('00');
                        setSelectedAmPm('PM');
                      }}
                    >
                      <Text style={[styles.presetText, { color: theme.textSecondary }]}>02:00 PM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: theme.surfaceSecondary }]}
                      onPress={() => {
                        setSelectedHour('06');
                        setSelectedMinute('00');
                        setSelectedAmPm('PM');
                      }}
                    >
                      <Text style={[styles.presetText, { color: theme.textSecondary }]}>06:00 PM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={[styles.footer, { borderTopColor: theme.border }]}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.cancelBtn, { borderColor: theme.border }]}
                  onPress={onClose}
                >
                  <Text style={[styles.actionBtnText, { color: theme.textSecondary }]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.saveBtn, { backgroundColor: colors.primary }]}
                  onPress={handleDone}
                >
                  <Text style={[styles.actionBtnText, { color: '#FFFFFF', fontWeight: '700' }]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 350,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  datePickerContainer: {
    padding: spacing.md,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  navButton: {
    padding: spacing.xs,
  },
  monthYearText: {
    fontSize: 15,
    fontWeight: '700',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  weekDayText: {
    width: 38,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: '14.28%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 13,
    fontWeight: '500',
  },
  quickPresetsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  presetText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timePickerContainer: {
    padding: spacing.lg,
  },
  timeSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  timeColumn: {
    width: 65,
    alignItems: 'center',
  },
  timeColHeader: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  timeScroll: {
    maxHeight: 140,
    width: '100%',
  },
  timeItem: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  timeItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeColon: {
    fontSize: 24,
    fontWeight: '800',
    marginHorizontal: spacing.sm,
    paddingTop: 15,
  },
  ampmColumn: {
    marginLeft: spacing.lg,
    alignItems: 'center',
  },
  ampmButtons: {
    gap: spacing.sm,
    marginTop: 10,
  },
  ampmButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  ampmText: {
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
  },
  actionBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
  },
  cancelBtn: {
    borderWidth: 1,
  },
  saveBtn: {
    elevation: 2,
  },
  actionBtnText: {
    fontSize: 14,
  },
});
