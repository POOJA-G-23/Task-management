// Application Constants

export const CATEGORIES = [
  { id: 'Personal', name: 'Personal', icon: 'person-outline', color: '#8B5CF6', bg: '#F3E8FF' },
  { id: 'College', name: 'College', icon: 'school-outline', color: '#0284C7', bg: '#E0F2FE' },
  { id: 'Work', name: 'Work', icon: 'briefcase-outline', color: '#059669', bg: '#D1FAE5' },
  { id: 'Other', name: 'Other', icon: 'grid-outline', color: '#EA580C', bg: '#FFEDD5' },
];

export const PRIORITIES = [
  { id: 'High', label: 'High', color: '#EF4444', icon: 'alert-circle', weight: 3 },
  { id: 'Medium', label: 'Medium', color: '#F59E0B', icon: 'information-circle', weight: 2 },
  { id: 'Low', label: 'Low', color: '#3B82F6', icon: 'checkmark-circle-outline', weight: 1 },
];

export const FILTER_OPTIONS = [
  { id: 'All', label: 'All Tasks', icon: 'layers-outline' },
  { id: 'Pending', label: 'Pending', icon: 'time-outline' },
  { id: 'Completed', label: 'Completed', icon: 'checkmark-done-outline' },
  { id: 'High Priority', label: 'High Priority', icon: 'flame-outline' },
];

export const SORT_OPTIONS = [
  { id: 'dueDate_asc', label: 'Due Date: Earliest First' },
  { id: 'dueDate_desc', label: 'Due Date: Latest First' },
  { id: 'priority_desc', label: 'Priority: High to Low' },
  { id: 'priority_asc', label: 'Priority: Low to High' },
  { id: 'created_desc', label: 'Recently Added' },
];

export const STORAGE_KEYS = {
  TASKS: '@taskmaster_tasks_v1',
  THEME_MODE: '@taskmaster_theme_mode',
  NOTIFICATIONS_ENABLED: '@taskmaster_notifications_enabled',
};
