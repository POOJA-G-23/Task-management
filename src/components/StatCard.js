// StatCard Component for Dashboard

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borderRadius, spacing } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

export const StatCard = ({
  icon,
  iconColor,
  iconBg,
  label,
  value,
  subtext,
  onPress,
  style,
}) => {
  const { theme, isDark } = useTheme();

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
        style,
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: iconBg || (isDark ? 'rgba(255,255,255,0.08)' : '#EEF2FF'),
            },
          ]}
        >
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      </View>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      {subtext && (
        <Text style={[styles.subtext, { color: theme.textMuted }]}>{subtext}</Text>
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    flex: 1,
    minWidth: 130,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  subtext: {
    fontSize: 11,
    marginTop: 2,
  },
});
