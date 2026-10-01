// PriorityBadge Component

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

export const PriorityBadge = ({ priority = 'Medium', size = 'medium' }) => {
  const { isDark } = useTheme();
  const config = colors.priority[priority] || colors.priority.Medium;

  const isSmall = size === 'small';

  const iconName =
    priority === 'High'
      ? 'flame'
      : priority === 'Medium'
      ? 'alert-circle'
      : 'checkmark-circle-outline';

  const iconSize = isSmall ? 11 : 13;

  return (
    <View
      style={[
        styles.badge,
        isSmall && styles.badgeSmall,
        {
          backgroundColor: isDark ? config.bgDark : config.bgLight,
          borderColor: isDark ? config.borderDark : config.borderLight,
        },
      ]}
    >
      <Ionicons
        name={iconName}
        size={iconSize}
        color={config.color}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          isSmall && styles.textSmall,
          { color: config.color },
        ]}
      >
        {priority}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  textSmall: {
    fontSize: 10,
    fontWeight: '700',
  },
});
