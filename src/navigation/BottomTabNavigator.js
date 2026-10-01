// Enhanced BottomTabNavigator Component - Floating Center Action & Badges

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { TaskListScreen } from '../screens/TaskListScreen';
import { AddTaskScreen } from '../screens/AddTaskScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { theme, isDark } = useTheme();
  const { pendingTasks } = useTasks();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.tabBarBg,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 66,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: -2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarBadge: pendingTasks > 0 ? pendingTasks : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.rose,
            fontSize: 10,
            fontWeight: '800',
            color: '#FFFFFF',
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'checkbox' : 'checkbox-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.addBtnContainer}>
              <View
                style={[
                  styles.addIconCircle,
                  {
                    backgroundColor: colors.primary,
                    borderColor: isDark ? '#0D1322' : '#FFFFFF',
                  },
                ]}
              >
                <Ionicons name="add" size={26} color="#FFFFFF" />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addBtnContainer: {
    top: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
  },
});
