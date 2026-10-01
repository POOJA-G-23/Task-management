# TaskMaster Mobile - Task Management Application 📱✨

A modern, full-featured, mobile-first Task Management Application built with **JavaScript**, **React Native**, and **Expo**. 

Designed for students, professionals, and daily planners to create, organize, prioritize, and track their daily to-dos with real-time local storage persistence and reminders.

---

## 🌟 Features Overview

### 1. 🏠 Home / Dashboard
- **Daily Agenda**: Instant view of today's scheduled tasks.
- **Productivity Progress Bar**: Dynamic completion rate calculation (`%`) with motivational status indicators.
- **Metric Cards (2x2 Grid)**: Quick glance at **Today's Tasks**, **Total Tasks**, **Completed**, and **Pending** counts.
- **Category Filter Chips**: Direct task counts for **Personal**, **College**, **Work**, and **Other**.
- **Quick Actions**: Inline task creation and settings access.

### 2. 📝 Add & Edit Tasks
- **Full Validation**: Required field verification with clear error messages.
- **Title & Description**: Clean inputs supporting multiline details, notes, and links.
- **Visual Schedule Selector**:
  - Custom cross-platform **Calendar Date Picker** modal (prev/next month, day grid, quick chips: *Today*, *Tomorrow*, *Next Week*).
  - Custom **Time Picker** modal (12-hour AM/PM format with quick chips: *09:00 AM*, *02:00 PM*, *06:00 PM*).
- **Priority Selector**: *High* (Red), *Medium* (Amber), *Low* (Blue) with visual weight and icons.
- **Category Selector**: *Personal*, *College*, *Work*, *Other* with dedicated badges and colors.
- **Reminder Alert Toggle**: Enables local notification reminders.

### 3. 📋 Task List Screen
- **Real-Time Search**: Search instantly by task title or description.
- **Segmented Status Filters**:
  - *All Tasks*
  - *Pending Tasks*
  - *Completed Tasks*
  - *High Priority Tasks*
- **Category Filter Bar**: Horizontally scrollable category pills.
- **Sorting Modal**:
  - Due Date (Earliest First / Latest First)
  - Priority (High to Low / Low to High)
  - Recently Added
- **Task Counter**: Live counter of matched tasks vs. total tasks.
- **Interactive Task Cards**:
  - Checkbox toggle with instant status update.
  - Strikethrough style for completed tasks.
  - Overdue warning pill with clock/alert icon for past-due items.
  - Category & Priority badges.
  - Quick action buttons for **Edit** and **Delete**.

### 4. 🔔 Reminders & Notifications
- Powered by `expo-notifications`.
- Configured with high-priority Android notification channels.
- Automatic scheduling when tasks with reminders are created or updated.
- Automatic cancellation of reminders when a task is completed or deleted.
- **Test Notification** button in Settings to verify device support.

### 5. 🌓 Dark Mode & Customization
- Built-in **Light Theme** and **Dark Theme** support with smooth color tokens.
- Persistent theme preference saved via `@react-native-async-storage/async-storage`.

### 6. ⚙️ Settings & Data Management
- **Task Analytics Breakdown**: Comprehensive summary of total tasks, completed, pending, and rate.
- **Clear Completed Tasks**: Bulk-delete finished tasks with confirmation.
- **Reset Application Data**: Restores initial rich sample tasks for demonstration and evaluation.
- **Safety Dialogs**: Confirmation modals before any destructive action.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Language** | JavaScript (ES6+) |
| **Framework** | React Native (v0.86) + Expo SDK 57 |
| **Navigation** | `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack` |
| **Local Persistence** | `@react-native-async-storage/async-storage` |
| **Notifications** | `expo-notifications`, `expo-device` |
| **Icons & Typography** | `@expo/vector-icons` (Ionicons), `expo-font` |
| **Layout & Styling** | StyleSheet API, Safe Area Insets, Custom Design System |

---

## 📂 Project Structure

```text
exp 3/
├── App.js                         # Root entry point, Context & Navigation providers
├── app.json                       # Expo configuration & Android permissions
├── eas.json                       # EAS build profile for Android APK generation
├── package.json                   # Dependencies & build scripts
├── assets/                        # App icons, splash screens, and adaptive assets
└── src/
    ├── components/                # Reusable UI components
    │   ├── CategoryBadge.js       # Category pill badge with icon
    │   ├── ConfirmationModal.js   # Safety dialog for delete/clear actions
    │   ├── DateTimePickerModal.js # Cross-platform calendar & clock picker modal
    │   ├── EmptyState.js          # Empty list / search fallback state
    │   ├── PriorityBadge.js       # High/Medium/Low priority pill
    │   ├── ProgressBar.js         # Animated progress bar with percentage
    │   ├── StatCard.js            # Metric card for dashboard statistics
    │   ├── TaskCard.js            # Main task item card with actions
    │   └── TaskForm.js            # Shared form for Add and Edit tasks
    ├── context/                   # Global React Contexts
    │   ├── TaskContext.js         # CRUD state management & metrics
    │   └── ThemeContext.js        # Light/Dark mode state & persistence
    ├── navigation/                # App routing & navigators
    │   ├── AppNavigator.js        # Root Native Stack (Tabs + Modals)
    │   └── BottomTabNavigator.js  # Bottom navigation (Home, Tasks, Add, Settings)
    ├── screens/                   # Application screens
    │   ├── HomeScreen.js          # Dashboard & today's agenda
    │   ├── TaskListScreen.js      # Search, filter, sort & task management
    │   ├── AddTaskScreen.js       # New task creation
    │   ├── EditTaskScreen.js      # Task modification
    │   └── SettingsScreen.js      # Theme toggle, notification test & reset
    ├── services/                  # Persistent storage & notifications
    │   ├── notificationService.js # Expo notification scheduling & permissions
    │   └── storageService.js      # AsyncStorage wrapper
    ├── styles/                    # Design tokens & color system
    │   └── theme.js               # Light/Dark palettes, spacing, typography
    └── utils/                     # Helpers & sample data
        ├── constants.js           # Categories, priorities, sort options
        ├── dateUtils.js           # Date/time formatting & overdue logic
        └── sampleData.js          # Pre-populated demonstration tasks
```

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x, v20.x, or v22.x recommended)
- `npm` or `bun`
- [Expo Go app](https://play.google.com/store/apps/details?id=host.exp.exponent) installed on your physical Android phone (optional, for real-device testing).

### Step 1: Install Dependencies
Open your terminal in the project directory:
```bash
npm install
```

### Step 2: Verify Project Configuration
Run the automated project diagnostic tool:
```bash
npx expo-doctor
```
*(All 21 checks should pass).*

---

## 🚀 Running the Application

### Option A: Run on Android Phone with Expo Go (Recommended)
1. Start the Expo development server:
   ```bash
   npx expo start
   ```
2. A QR code will appear in your terminal.
3. Open the **Expo Go** app on your Android phone.
4. Tap **Scan QR code** and point your phone's camera at the terminal QR code.
5. The application will bundle and load directly on your phone!

> **Tip**: Ensure your computer and your phone are connected to the same Wi-Fi network. If you are on a restricted college/office network, start Expo with tunnel mode:
> ```bash
> npx expo start --tunnel
> ```

### Option B: Run on Android Emulator (Android Studio)
1. Launch your Android Virtual Device (AVD) from Android Studio.
2. Run:
   ```bash
   npx expo run:android
   # or
   npx expo start --android
   ```

### Option C: Run in Web Browser
To quickly preview and test the UI in your desktop browser:
```bash
npx expo start --web
```

---

## 📱 Generating an Android APK

You can generate a standalone `.apk` file that can be distributed and installed directly on any Android device without Expo Go.

### Method 1: Using EAS Build Cloud (Easiest, No Android Studio Required)

1. Install EAS CLI globally or run via `npx`:
   ```bash
   npx eas-cli@latest login
   ```
   *(Create a free Expo account at https://expo.dev if you don't already have one).*

2. Configure your project with EAS:
   ```bash
   npx eas-cli@latest project:init
   ```

3. Build the standalone Android APK using the pre-configured `preview` profile:
   ```bash
   npx eas-cli@latest build --platform android --profile preview
   ```

4. Once the build finishes on Expo's cloud servers, you will receive a direct link to download the `.apk` file.
5. Transfer the `.apk` to your phone and install it directly!

---

### Method 2: Local APK Build (Using Local Android Studio & SDK)

If you have Android Studio, Java JDK 17+, and Android SDK configured locally on your computer:

1. Generate the native Android project folder:
   ```bash
   npx expo prebuild --platform android
   ```

2. Assemble the Release APK locally:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. Your output APK will be located at:
   `android/app/build/outputs/apk/release/app-release.apk`

---

## 🧪 Testing Features Checklist

- [x] **Home Dashboard**: View progress bar, today's schedule, and real-time task counts.
- [x] **Create Task**: Create a task with Title, Description, Date, Time, Priority, and Category.
- [x] **Date & Time Picker**: Open the modal picker to choose custom calendar dates and 12-hour AM/PM times.
- [x] **Search & Filter**: Search by keyword; filter by *Pending*, *Completed*, or *High Priority*; filter by *College*, *Work*, etc.
- [x] **Sorting**: Sort by *Due Date: Earliest First*, *Priority: High to Low*, or *Recently Added*.
- [x] **Complete / Uncomplete**: Tap the checkbox on any task card to mark it finished.
- [x] **Edit Task**: Tap the pencil icon to modify any task field.
- [x] **Delete Task**: Tap the trash icon and confirm deletion via the modal dialog.
- [x] **Dark Mode**: Go to Settings and toggle Dark Theme. Notice instant visual theme transition.
- [x] **Notifications**: Tap "Send Test Notification" in Settings to test local alerts.
- [x] **Persistence**: Close the app completely and reopen it — all your tasks and theme preference remain intact.
- [x] **Data Reset**: Tap "Reset All Application Data" in Settings to restore the starter demonstration dataset.

---

## 📄 License
This project is open-source under the MIT License. Developed for Application Development Lab Experiment 3.
