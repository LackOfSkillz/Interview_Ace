# Network Detective's Casebook

A gamified web application to help aspiring network engineers prepare for job interviews by quizzing them on key networking concepts in the form of "detective cases."

This project was built with Vue.js, Vite, and Tailwind CSS.

## For Users: How to Use the Casebook

1.  **Select a Case:** From the main "Casebook" screen, you will see a list of available case files (e.g., "The Case of the Layered Model"). Each card shows the case title and your current progress.
2.  **Begin Investigation:** Click on a case to begin.
3.  **Solve the Clues:** Answer the questions (clues) one by one. 
    *   For multiple-choice questions, select an option and click "Submit Deduction."
    *   For fill-in-the-blank questions, type your answer and press Enter or click the button.
4.  **Review Feedback:** After each answer, the application will tell you if you were correct and provide a detailed explanation of the concept.
5.  **Track Your Progress:** As you correctly answer questions, your progress is saved automatically. You can view your overall statistics, such as total clues solved and progress per case, in the "Detective's Ledger."

Your progress is saved in your browser, so you can close the application and pick up where you left off at any time.

## For Developers: Local Setup

To run this project on your local machine, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository (or download the source code):**
    ```sh
    git clone https://github.com/LackOfSkillz/Interview_Ace.git
    cd Interview_Ace
    ```

2.  **Install project dependencies:**
    ```sh
    npm install
    ```

### Running the Development Server

To start the application in development mode with hot-reloading:

```sh
npm run dev
```

This will start a local server, typically at `http://localhost:5173`. Open this URL in your browser to use the application.

### Building for Production

To create a production-ready build of the application:

```sh
npm run build
```

This will create a `dist` directory with the optimized, static files that can be deployed to any web hosting service.
