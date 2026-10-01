// Enhanced Application Theme - Modern, Vibrant & Glassmorphic Design Tokens

export const colors = {
  // Vibrant Brand Indigo & Violet Accents
  primary: '#6366F1', // Electric Indigo
  primaryDark: '#4F46E5',
  primaryDeep: '#3730A3',
  primaryLight: '#818CF8',
  primaryMuted: '#EEF2FF',
  primaryGlow: 'rgba(99, 102, 241, 0.35)',

  // Energetic Accents
  accent: '#10B981', // Emerald Teal
  accentLight: '#34D399',
  accentGlow: 'rgba(16, 185, 129, 0.35)',

  amber: '#F59E0B',
  rose: '#F43F5E',
  purple: '#A855F7',
  cyan: '#06B6D4',

  // Priority Palettes with rich dark & light aesthetics
  priority: {
    High: {
      color: '#F43F5E',
      glow: 'rgba(244, 63, 94, 0.3)',
      bgLight: '#FFE4E6',
      borderLight: '#FDA4AF',
      bgDark: '#2E111A',
      borderDark: '#881337',
      stripe: '#F43F5E',
    },
    Medium: {
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.3)',
      bgLight: '#FEF3C7',
      borderLight: '#FCD34D',
      bgDark: '#2C1D06',
      borderDark: '#78350F',
      stripe: '#F59E0B',
    },
    Low: {
      color: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.3)',
      bgLight: '#DBEAFE',
      borderLight: '#93C5FD',
      bgDark: '#0B2347',
      borderDark: '#1E3A8A',
      stripe: '#3B82F6',
    },
  },

  // Category Palettes with customized gradient tints & icons
  categories: {
    Personal: {
      color: '#A855F7',
      bgLight: '#F3E8FF',
      bgDark: 'rgba(168, 85, 247, 0.15)',
      borderDark: 'rgba(168, 85, 247, 0.35)',
      icon: 'person',
      gradient: ['#A855F7', '#7C3AED'],
    },
    College: {
      color: '#0EA5E9',
      bgLight: '#E0F2FE',
      bgDark: 'rgba(14, 165, 233, 0.15)',
      borderDark: 'rgba(14, 165, 233, 0.35)',
      icon: 'school',
      gradient: ['#0EA5E9', '#0284C7'],
    },
    Work: {
      color: '#10B981',
      bgLight: '#D1FAE5',
      bgDark: 'rgba(16, 185, 129, 0.15)',
      borderDark: 'rgba(16, 185, 129, 0.35)',
      icon: 'briefcase',
      gradient: ['#10B981', '#059669'],
    },
    Other: {
      color: '#F97316',
      bgLight: '#FFEDD5',
      bgDark: 'rgba(249, 115, 22, 0.15)',
      borderDark: 'rgba(249, 115, 22, 0.35)',
      icon: 'sparkles',
      gradient: ['#F97316', '#EA580C'],
    },
  },

  // Premium Light Theme
  light: {
    background: '#F8FAFC',
    backgroundSubtle: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    cardBorder: 'rgba(226, 232, 240, 0.8)',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    inputBg: '#F8FAFC',
    inputBorder: '#E2E8F0',
    tabBarBg: '#FFFFFF',
    tabBarBorder: 'rgba(226, 232, 240, 0.8)',
    headerBg: '#FFFFFF',
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowColored: 'rgba(99, 102, 241, 0.15)',
    danger: '#F43F5E',
    success: '#10B981',
    warning: '#F59E0B',
    bannerGradientStart: '#4F46E5',
    bannerGradientEnd: '#7C3AED',
  },

  // Ultra-Sleek Dark Theme (Cyber Slate / Deep Navy)
  dark: {
    background: '#090D16',
    backgroundSubtle: '#0E1422',
    surface: '#131B2E',
    surfaceSecondary: '#1A243B',
    surfaceElevated: '#1E293B',
    card: '#131B2E',
    cardBorder: 'rgba(99, 102, 241, 0.18)',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#1F2A42',
    borderLight: '#172033',
    inputBg: '#0B101D',
    inputBorder: '#23304D',
    tabBarBg: '#0D1322',
    tabBarBorder: '#1A243B',
    headerBg: '#0D1322',
    shadow: 'rgba(0, 0, 0, 0.5)',
    shadowColored: 'rgba(99, 102, 241, 0.3)',
    danger: '#FB7185',
    success: '#34D399',
    warning: '#FBBF24',
    bannerGradientStart: '#312E81',
    bannerGradientEnd: '#4C1D95',
  },
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  xxl: 28,
  full: 9999,
};

export const shadows = {
  soft: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4,
  },
  glow: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
};
