// Initial Sample Tasks for demonstration and testing

import { getDateOffset } from './dateUtils';

export const INITIAL_SAMPLE_TASKS = [
  {
    id: 'sample-task-1',
    title: 'Submit Mobile App Development Lab',
    description: 'Prepare report, code walkthrough, and test on Android emulator for Experiment 3.',
    dueDate: getDateOffset(0), // Today
    dueTime: '17:00',
    priority: 'High',
    category: 'College',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    reminder: true,
  },
  {
    id: 'sample-task-2',
    title: 'Review Sprint Deliverables & Code PRs',
    description: 'Review pending pull requests for the backend API and verify integration endpoints.',
    dueDate: getDateOffset(0), // Today
    dueTime: '14:30',
    priority: 'High',
    category: 'Work',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    reminder: false,
  },
  {
    id: 'sample-task-3',
    title: 'Weekly Grocery Shopping & Meal Prep',
    description: 'Buy fresh vegetables, fruits, almond milk, and organize weekly lunch containers.',
    dueDate: getDateOffset(1), // Tomorrow
    dueTime: '10:00',
    priority: 'Medium',
    category: 'Personal',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    reminder: true,
  },
  {
    id: 'sample-task-4',
    title: 'Study Database Indexing & B-Trees',
    description: 'Read Chapter 4 on composite indexes, hash indexes, and query execution plans.',
    dueDate: getDateOffset(2), // 2 days later
    dueTime: '18:00',
    priority: 'Medium',
    category: 'College',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    reminder: false,
  },
  {
    id: 'sample-task-5',
    title: 'Renew Vehicle Insurance Policy',
    description: 'Compare comprehensive coverage quotes online and renew before expiration date.',
    dueDate: getDateOffset(5), // 5 days later
    dueTime: '11:00',
    priority: 'Low',
    category: 'Other',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    reminder: true,
  },
  {
    id: 'sample-task-6',
    title: 'Morning 5K Jog & Stretch',
    description: 'Completed 30 minutes cardio and full-body stretch routine in the park.',
    dueDate: getDateOffset(0),
    dueTime: '07:00',
    priority: 'Low',
    category: 'Personal',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    reminder: false,
  },
  {
    id: 'sample-task-7',
    title: 'Design UI Mockups for Client Dashboard',
    description: 'Completed Figma high-fidelity wireframes and exported SVG assets.',
    dueDate: getDateOffset(-1),
    dueTime: '16:00',
    priority: 'High',
    category: 'Work',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    reminder: false,
  },
];
