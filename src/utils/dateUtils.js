// Date & Time Utility Functions

/**
 * Format a Date object or YYYY-MM-DD string into YYYY-MM-DD
 */
export const formatDateToISO = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format a Date object to HH:MM (24-hour format)
 */
export const formatTimeToISO = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Format 24-hr time string (e.g. "14:30") to 12-hour format ("02:30 PM")
 */
export const formatTime12Hour = (timeStr) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  const formattedHours = String(hours).padStart(2, '0');
  return `${formattedHours}:${minutes} ${ampm}`;
};

/**
 * Format YYYY-MM-DD into human-readable string:
 * "Today", "Tomorrow", "Yesterday", or "Oct 15, 2026"
 */
export const formatFriendlyDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  const targetDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[targetDate.getMonth()]} ${targetDate.getDate()}, ${targetDate.getFullYear()}`;
};

/**
 * Check if a date string is today
 */
export const isToday = (dateStr) => {
  if (!dateStr) return false;
  const todayISO = formatDateToISO(new Date());
  return dateStr === todayISO;
};

/**
 * Check if a task is overdue given dateStr and optional timeStr
 */
export const isOverdue = (dateStr, timeStr) => {
  if (!dateStr) return false;
  const now = new Date();
  const todayISO = formatDateToISO(now);

  if (dateStr < todayISO) return true;
  if (dateStr > todayISO) return false;

  // If date is today, check time if provided
  if (timeStr) {
    const [taskHours, taskMinutes] = timeStr.split(':').map(Number);
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    if (taskHours < nowHours || (taskHours === nowHours && taskMinutes < nowMinutes)) {
      return true;
    }
  }

  return false;
};

/**
 * Combine YYYY-MM-DD and HH:MM into a JavaScript Date object
 */
export const getFullDateTime = (dateStr, timeStr) => {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = (timeStr || '09:00').split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
};

/**
 * Get date string for N days from now
 */
export const getDateOffset = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return formatDateToISO(d);
};
