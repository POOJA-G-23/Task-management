// CategoryBadge Component

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

export const CategoryBadge = ({ category = 'Other', size = 'medium' }) => {
  const { isDark } = useTheme();
  const config = colors.categories[category] || colors.categories.Other;

  const isSmall = size === 'small';
  const iconSize = isSmall ? 11 : 13;

  return (
    <View
      style={[
        styles.badge,
        isSmall && styles.badgeSmall,
        {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : config.bgLight,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
        },
      ]}
    >
      <Ionicons
        name={config.icon}
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
        {category}
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
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 10,
    fontWeight: '600',
  },
});
