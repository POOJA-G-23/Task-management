// Ultra-Professional Dark Theme & High-Tech Design System (Linear / Raycast Style)

export const colors = {
  // Brand Accents
  primary: '#6366F1', // Electric Violet / Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  primaryMuted: '#1E1B4B',
  primaryGlow: 'rgba(99, 102, 241, 0.4)',

  // Neon Functional Accents
  accent: '#10B981', // Emerald Teal
  accentLight: '#34D399',
  accentGlow: 'rgba(16, 185, 129, 0.35)',

  rose: '#FF4565',
  amber: '#FBBF24',
  purple: '#C084FC',
  cyan: '#38BDF8',
  slate: '#94A3B8',

  // Priority Palettes - Professional Cyber Dark Aesthetics
  priority: {
    High: {
      color: '#FF4565',
      glow: 'rgba(255, 69, 101, 0.35)',
      bgLight: '#FFE4E6',
      borderLight: '#FDA4AF',
      bgDark: '#260B12',
      borderDark: '#5E1624',
      stripe: '#FF4565',
    },
    Medium: {
      color: '#FBBF24',
      glow: 'rgba(251, 191, 36, 0.35)',
      bgLight: '#FEF3C7',
      borderLight: '#FCD34D',
      bgDark: '#261904',
      borderDark: '#5C3807',
      stripe: '#FBBF24',
    },
    Low: {
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.35)',
      bgLight: '#DBEAFE',
      borderLight: '#93C5FD',
      bgDark: '#081D33',
      borderDark: '#123C66',
      stripe: '#38BDF8',
    },
  },

  // Category Palettes with Neon Accents
  categories: {
    Personal: {
      color: '#C084FC',
      bgLight: '#F3E8FF',
      bgDark: 'rgba(192, 132, 252, 0.12)',
      borderDark: 'rgba(192, 132, 252, 0.28)',
      icon: 'person',
      gradient: ['#C084FC', '#9333EA'],
    },
    College: {
      color: '#38BDF8',
      bgLight: '#E0F2FE',
      bgDark: 'rgba(56, 189, 248, 0.12)',
      borderDark: 'rgba(56, 189, 248, 0.28)',
      icon: 'school',
      gradient: ['#38BDF8', '#0284C7'],
    },
    Work: {
      color: '#34D399',
      bgLight: '#D1FAE5',
      bgDark: 'rgba(52, 211, 153, 0.12)',
      borderDark: 'rgba(52, 211, 153, 0.28)',
      icon: 'briefcase',
      gradient: ['#34D399', '#059669'],
    },
    Other: {
      color: '#FB923C',
      bgLight: '#FFEDD5',
      bgDark: 'rgba(251, 146, 60, 0.12)',
      borderDark: 'rgba(251, 146, 60, 0.28)',
      icon: 'sparkles',
      gradient: ['#FB923C', '#EA580C'],
    },
  },

  // ULTRA-SLEEK PROFESSIONAL DARK THEME (Linear/Raycast inspired)
  dark: {
    background: '#080A0F', // Obsidian pitch black canvas
    backgroundSubtle: '#0E121B',
    surface: '#111622', // Elevated Obsidian card
    surfaceSecondary: '#161D2E',
    surfaceElevated: '#1A2338',
    card: '#111622',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#F8FAFC', // Ultra crisp white
    textSecondary: '#94A3B8', // Slate grey
    textMuted: '#64748B', // Muted slate
    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.04)',
    borderHighlight: 'rgba(99, 102, 241, 0.4)',
    inputBg: '#0B0E17',
    inputBorder: '#1E2638',
    tabBarBg: '#090C13',
    tabBarBorder: 'rgba(255, 255, 255, 0.07)',
    headerBg: '#080A0F',
    shadow: 'rgba(0, 0, 0, 0.65)',
    shadowColored: 'rgba(99, 102, 241, 0.35)',
    danger: '#FF4565',
    success: '#34D399',
    warning: '#FBBF24',
    bannerBg: '#0E1324',
    bannerBorder: 'rgba(99, 102, 241, 0.35)',
  },

  // Premium Light Theme (Fallback option)
  light: {
    background: '#F8FAFC',
    backgroundSubtle: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    borderHighlight: '#6366F1',
    inputBg: '#F8FAFC',
    inputBorder: '#E2E8F0',
    tabBarBg: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    headerBg: '#FFFFFF',
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowColored: 'rgba(99, 102, 241, 0.15)',
    danger: '#F43F5E',
    success: '#10B981',
    warning: '#F59E0B',
    bannerBg: '#4F46E5',
    bannerBorder: 'rgba(79, 70, 229, 0.3)',
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
