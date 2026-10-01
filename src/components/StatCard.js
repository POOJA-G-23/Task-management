// Enhanced StatCard Component - Obsidian Glassmorphic Metric Tile

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
      activeOpacity={0.75}
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
      {/* Top subtle colored bar */}
      <View
        style={[
          styles.topColorBar,
          {
            backgroundColor: iconColor,
            opacity: isDark ? 0.8 : 0.6,
          },
        ]}
      />

      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  iconBg ||
                  (isDark ? 'rgba(255,255,255,0.06)' : '#EEF2FF'),
              },
            ]}
          >
            <Ionicons name={icon} size={18} color={iconColor} />
          </View>
          <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
        </View>

        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </Text>

        {subtext && (
          <Text style={[styles.subtext, { color: theme.textMuted }]}>
            {subtext}
          </Text>
        )}
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    flex: 1,
    minWidth: 130,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  topColorBar: {
    height: 3,
    width: '100%',
  },
  cardContent: {
    padding: spacing.md,
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
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: -0.2,
  },
  subtext: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});
