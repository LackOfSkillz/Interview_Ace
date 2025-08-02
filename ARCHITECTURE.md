# Network Detective's Casebook - Architecture Overview

This document provides a high-level overview of the architecture of the Network Detective's Casebook application.

## Technology Stack

*   **Frontend Framework:** Vue.js 3
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** Vue Router
*   **Data Storage:** Local Storage (for user progress)
*   **Question Data:** Stored in a local JSON file (`questions.json`)

## Core Components and Their Interactions

The application follows a component-based architecture, typical for Vue.js applications, with a clear separation of concerns.

### 1. Entry Point (`main.js`)

*   Initializes the Vue application.
*   Mounts the root `App.vue` component.
*   Integrates Vue Router for navigation.
*   Imports global CSS (`main.css`).

### 2. Root Component (`App.vue`)

*   Serves as the main layout of the application.
*   Contains the global navigation bar (`<nav>`).
*   Uses `<router-view />` to dynamically render different views based on the current route.

### 3. Routing (`router/index.js`)

*   Defines the application's navigation paths and their corresponding components.
*   Utilizes `createWebHistory` for clean URLs.
*   **Routes:**
    *   `/`: `HomeView.vue` (Displays a list of available cases).
    *   `/case/:caseId`: `CaseView.vue` (Displays questions for a specific case, `caseId` is a dynamic parameter). This view is lazy-loaded for performance.
    *   `/ledger`: `LedgerView.vue` (Displays user's progress and statistics). This view is also lazy-loaded.

### 4. Views (`src/views/`)

These are the top-level components representing different pages of the application.

*   **`HomeView.vue`**:
    *   Responsible for displaying all available "cases" to the user.
    *   Likely uses the `CaseCard.vue` component to render each case.
    *   Interacts with `questions.json` to fetch case details.
*   **`CaseView.vue`**:
    *   The interactive quiz interface for a selected case.
    *   Receives `caseId` from the route parameters.
    *   Fetches relevant questions from `questions.json`.
    *   Uses `QuestionDisplay.vue` to render individual questions.
    *   Manages user input, checks answers, and provides feedback.
    *   Integrates `ProgressBar.vue` to show progress within the case.
    *   May trigger `RewardModal.vue` upon case completion.
    *   Utilizes `useProgress.js` composable for managing and persisting user progress.
*   **`LedgerView.vue`**:
    *   Displays the user's overall progress, statistics, and potentially a history of completed cases.
    *   Interacts with the local storage via `useProgress.js` to retrieve saved progress data.

### 5. Components (`src/components/`)

Reusable UI elements used across different views.

*   **`CaseCard.vue`**:
    *   Displays a single case's information (e.g., title, progress).
    *   Navigates to `CaseView.vue` when clicked.
*   **`ProgressBar.vue`**:
    *   Visualizes progress (e.g., within a case, or overall).
    *   Receives progress data as props.
*   **`QuestionDisplay.vue`**:
    *   Renders a single question, handling different question types (multiple-choice, fill-in-the-blank).
    *   Manages user input for the current question.
    *   Emits events for answer submission.
*   **`RewardModal.vue`**:
    *   A modal dialog displayed for achievements or case completion.

### 6. Composables (`src/composables/useProgress.js`)

*   Provides reusable logic for managing user progress.
*   Likely handles:
    *   Loading/saving progress to local storage.
    *   Updating progress for individual questions/cases.
    *   Calculating overall statistics.

### 7. Data (`src/data/questions.json`)

*   A static JSON file containing all the quiz questions.
*   Each question object includes:
    *   `id`: Unique identifier.
    *   `caseName`: The case to which the question belongs.
    *   `type`: `multiple-choice` or `fill-in-the-blank`.
    *   `clue`: The question text.
    *   `options`: Array of choices (for multiple-choice questions).
    *   `answer`: The correct answer.
    *   `explanation`: Detailed explanation for the answer.

## Data Flow

1.  **Application Load:** `main.js` loads `App.vue` and configures `vue-router`.
2.  **Home View:** `HomeView.vue` fetches case information (likely derived from `questions.json`) and displays `CaseCard` components.
3.  **Case Selection:** Clicking a `CaseCard` navigates to `CaseView.vue` with the specific `caseId`.
4.  **Question Display:** `CaseView.vue` retrieves questions for the `caseId` from `questions.json` and renders them using `QuestionDisplay.vue`.
5.  **User Interaction & Progress:** `QuestionDisplay.vue` captures answers. `CaseView.vue` processes answers, updates progress via `useProgress.js`, which then persists data to local storage.
6.  **Ledger View:** `LedgerView.vue` retrieves and displays overall progress and statistics from local storage via `useProgress.js`.

## Future Considerations

*   **Backend Integration:** For more complex features like user accounts, persistent progress across devices, or dynamic question updates, a backend API would be necessary.
*   **Database:** Migrating `questions.json` to a database would allow for easier management, scaling, and dynamic content updates.
*   **Authentication/Authorization:** Implementing user authentication would enable personalized experiences and secure progress tracking.
*   **Testing Frameworks:** Further development of unit and end-to-end tests to ensure application stability and correctness.
