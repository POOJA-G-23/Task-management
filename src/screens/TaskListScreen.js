// Enhanced TaskListScreen Component - Linear-style Filtering, Search & Sorting

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { FILTER_OPTIONS, SORT_OPTIONS, CATEGORIES } from '../utils/constants';

export const TaskListScreen = ({ navigation, route }) => {
  const { theme, isDark } = useTheme();
  const {
    tasks,
    totalTasks,
    completedTasks,
    pendingTasks,
    highPriorityCount,
    toggleTaskCompleted,
    deleteTask,
  } = useTasks();

  // Initial filter from params
  const initialFilter = route?.params?.filter || 'All';
  const initialCategory = route?.params?.category || null;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState('dueDate_asc');
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Deletion modal state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter & Search & Sort Logic
  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // 1. Status Filter
        if (activeFilter === 'Pending' && task.completed) return false;
        if (activeFilter === 'Completed' && !task.completed) return false;
        if (activeFilter === 'High Priority' && task.priority !== 'High') return false;

        // 2. Category Filter
        if (selectedCategory && task.category !== selectedCategory) return false;

        // 3. Search Query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = task.title.toLowerCase().includes(query);
          const matchDesc = (task.description || '').toLowerCase().includes(query);
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };

        switch (activeSort) {
          case 'dueDate_asc':
            return (a.dueDate + (a.dueTime || '')) > (b.dueDate + (b.dueTime || '')) ? 1 : -1;
          case 'dueDate_desc':
            return (a.dueDate + (a.dueTime || '')) < (b.dueDate + (b.dueTime || '')) ? 1 : -1;
          case 'priority_desc':
            return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
          case 'priority_asc':
            return (priorityWeight[a.priority] || 0) - (priorityWeight[b.priority] || 0);
          case 'created_desc':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default:
            return 0;
        }
      });
  }, [tasks, activeFilter, selectedCategory, searchQuery, activeSort]);

  const handleDeleteRequest = (id, title) => {
    setTaskToDelete({ id, title });
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setDeleteModalVisible(false);
      setTaskToDelete(null);
    }
  };

  // Badge count for filters
  const getFilterCount = (filterId) => {
    switch (filterId) {
      case 'All':
        return totalTasks;
      case 'Pending':
        return pendingTasks;
      case 'Completed':
        return completedTasks;
      case 'High Priority':
        return highPriorityCount;
      default:
        return 0;
    }
  };

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.id === activeSort)?.label || 'Due Date';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            All Tasks
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {filteredAndSortedTasks.length} {filteredAndSortedTasks.length === 1 ? 'task' : 'tasks'} shown
          </Text>
        </View>

        {/* Sort Modal Toggle Button */}
        <TouchableOpacity
          style={[
            styles.sortButton,
            {
              backgroundColor: isDark ? '#1E1B4B' : '#EEF2FF',
              borderColor: isDark ? 'rgba(99, 102, 241, 0.3)' : '#C7D2FE',
            },
          ]}
          onPress={() => setSortModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="swap-vertical" size={15} color={colors.primary} />
          <Text style={[styles.sortButtonText, { color: colors.primary }]}>
            {currentSortLabel}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modern Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.inputBg,
              borderColor: searchFocused ? colors.primary : theme.inputBorder,
              shadowColor: searchFocused ? colors.primary : 'transparent',
              shadowOpacity: searchFocused ? 0.2 : 0,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={18}
            color={searchFocused ? colors.primary : theme.textMuted}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search tasks, notes, keywords..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Status Filter Tabs (with Live Counter Badges) */}
      <View style={styles.filterTabsContainer}>
        <FlatList
          horizontal
          data={FILTER_OPTIONS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsScroll}
          renderItem={({ item }) => {
            const isActive = activeFilter === item.id;
            const count = getFilterCount(item.id);
            return (
              <TouchableOpacity
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : theme.surfaceSecondary,
                    borderColor: isActive ? colors.primary : theme.border,
                  },
                  isActive && styles.filterTabGlow,
                ]}
                onPress={() => setActiveFilter(item.id)}
                activeOpacity={0.75}
              >
                <Ionicons
                  name={item.icon}
                  size={14}
                  color={isActive ? '#FFFFFF' : theme.textSecondary}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.filterTabText,
                    {
                      color: isActive ? '#FFFFFF' : theme.textSecondary,
                      fontWeight: isActive ? '800' : '600',
                    },
                  ]}
                >
                  {item.label}
                </Text>
                <View
                  style={[
                    styles.filterCountBadge,
                    {
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.25)'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : '#E2E8F0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      { color: isActive ? '#FFFFFF' : theme.textSecondary },
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Category Pills (Horizontal) */}
      <View style={styles.categoryPillsContainer}>
        <FlatList
          horizontal
          data={[{ id: null, name: 'All Categories' }, ...CATEGORIES]}
          keyExtractor={(item) => item.id || 'all-cats'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPillsScroll}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.id;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected
                      ? isDark
                        ? 'rgba(99, 102, 241, 0.2)'
                        : '#EEF2FF'
                      : 'transparent',
                    borderColor: isSelected ? colors.primary : theme.border,
                  },
                ]}
                onPress={() => setSelectedCategory(item.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    {
                      color: isSelected ? colors.primary : theme.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={filteredAndSortedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={toggleTaskCompleted}
            onEdit={(t) => navigation.navigate('EditTask', { task: t })}
            onDelete={handleDeleteRequest}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={searchQuery ? 'search' : 'layers-outline'}
            title={searchQuery ? 'No matching tasks found' : 'No tasks in this category'}
            subtitle={
              searchQuery
                ? `No tasks matched your query "${searchQuery}". Check spelling or clear filters.`
                : 'Stay organized and ahead of schedule by adding a new task.'
            }
            buttonText={searchQuery ? 'Clear Search' : 'Add New Task'}
            onButtonPress={() => {
              if (searchQuery) setSearchQuery('');
              else navigation.navigate('AddTask');
            }}
          />
        }
      />

      {/* Sort Selection Bottom Sheet Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalBox,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <View style={styles.sheetHandle} />

                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.text }]}>
                    Sort Tasks By
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSortModalVisible(false)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close" size={20} color={theme.textSecondary} />
                  </TouchableOpacity>
                </View>

                {SORT_OPTIONS.map((opt) => {
                  const isChosen = activeSort === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[
                        styles.sortOptionRow,
                        isChosen && {
                          backgroundColor: isDark
                            ? 'rgba(99, 102, 241, 0.15)'
                            : '#EEF2FF',
                        },
                      ]}
                      onPress={() => {
                        setActiveSort(opt.id);
                        setSortModalVisible(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.sortOptionText,
                          {
                            color: isChosen ? colors.primary : theme.text,
                            fontWeight: isChosen ? '700' : '400',
                          },
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {isChosen && (
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Confirmation Modal for Deleting */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Task"
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"?`
            : 'Are you sure you want to delete this task?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setTaskToDelete(null);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: 4,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterTabsContainer: {
    marginVertical: 4,
  },
  filterTabsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  filterTabGlow: {
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  filterTabText: {
    fontSize: 12,
  },
  filterCountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
    marginLeft: 6,
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
  },
  categoryPillsContainer: {
    marginVertical: 6,
  },
  categoryPillsScroll: {
    paddingHorizontal: spacing.lg,
    gap: 6,
  },
  categoryPill: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 11,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl * 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.xl,
    borderTopWidth: 1,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(150, 150, 150, 0.4)',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sortOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginVertical: 2,
  },
  sortOptionText: {
    fontSize: 14,
  },
});
