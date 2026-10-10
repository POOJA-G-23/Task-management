// ProgressBar Component

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

export const ProgressBar = ({ progress = 0, height = 10, showLabel = true }) => {
  const { theme } = useTheme();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Dynamic progress color based on completion
  const getProgressColor = () => {
    if (clampedProgress >= 100) return colors.accent;
    if (clampedProgress >= 50) return colors.primary;
    return colors.primaryLight;
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={[styles.labelText, { color: theme.textSecondary }]}>
            Completion Progress
          </Text>
          <Text style={[styles.percentText, { color: getProgressColor() }]}>
            {clampedProgress}%
          </Text>
        </View>
      )}
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: theme.border,
            borderRadius: height / 2,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: getProgressColor(),
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '500',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '700',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
