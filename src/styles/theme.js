// Application Theme - Light and Dark Mode Color Tokens & Typography
export const colors = {
  primary: '#4F46E5', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',
  primaryMuted: '#EEF2FF',

  accent: '#10B981', // Emerald
  accentLight: '#6EE7B7',

  // Priority Colors
  priority: {
    High: {
      color: '#EF4444',
      bgLight: '#FEE2E2',
      borderLight: '#FCA5A5',
      bgDark: '#3B1318',
      borderDark: '#7F1D1D',
    },
    Medium: {
      color: '#F59E0B',
      bgLight: '#FEF3C7',
      borderLight: '#FCD34D',
      bgDark: '#3D2708',
      borderDark: '#78350F',
    },
    Low: {
      color: '#3B82F6',
      bgLight: '#DBEAFE',
      borderLight: '#93C5FD',
      bgDark: '#0E294B',
      borderDark: '#1E3A8A',
    },
  },

  // Category Colors
  categories: {
    Personal: {
      color: '#8B5CF6',
      bgLight: '#F3E8FF',
      icon: 'person-outline',
    },
    College: {
      color: '#0284C7',
      bgLight: '#E0F2FE',
      icon: 'school-outline',
    },
    Work: {
      color: '#059669',
      bgLight: '#D1FAE5',
      icon: 'briefcase-outline',
    },
    Other: {
      color: '#EA580C',
      bgLight: '#FFEDD5',
      icon: 'grid-outline',
    },
  },

  // Light Theme
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    inputBg: '#F8FAFC',
    tabBarBg: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    headerBg: '#FFFFFF',
    shadow: 'rgba(15, 23, 42, 0.08)',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },

  // Dark Theme
  dark: {
    background: '#0B0F19',
    surface: '#151D2F',
    surfaceSecondary: '#1E293B',
    card: '#151D2F',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#26344B',
    borderLight: '#1E293B',
    inputBg: '#101726',
    tabBarBg: '#131A29',
    tabBarBorder: '#1E293B',
    headerBg: '#131A29',
    shadow: 'rgba(0, 0, 0, 0.35)',
    danger: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 15, fontWeight: '500' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
  badge: { fontSize: 11, fontWeight: '600', letterSpacing: 0.2 },
};
