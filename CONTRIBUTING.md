# Contributing to Network Detective's Casebook

We welcome contributions to the Network Detective's Casebook project! By contributing, you help us create a better resource for aspiring network engineers.

## How to Contribute

### 1. Fork the Repository

First, fork the [main repository](https://github.com/LackOfSkillz/Interview_Ace.git) to your GitHub account.

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```sh
git clone https://github.com/YOUR_USERNAME/Interview_Ace.git
cd Interview_Ace
```

### 3. Install Dependencies

Ensure you have Node.js (v18 or higher recommended) and npm installed. Then, install the project dependencies:

```sh
npm install
```

### 4. Create a New Branch

Before making any changes, create a new branch for your feature or bug fix:

```sh
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/fix-description
```

### 5. Make Your Changes

*   **Code Style:** Please adhere to the existing code style. The project uses ESLint and Prettier (configured via `eslint.config.js`). Your IDE should pick up these configurations.
*   **New Questions:** If adding new questions, ensure they follow the format in `src/data/questions.json` and include a clear `clue`, `answer`, and `explanation`.
*   **Testing:** If you add new features or fix bugs, please consider adding or updating tests in the `tests/` directory.

### 6. Test Your Changes

Before committing, run the tests to ensure your changes haven't introduced any regressions:

```sh
npm run test:unit
npm run test:e2e
```

### 7. Commit Your Changes

Write clear and concise commit messages. A good commit message explains *what* was changed and *why*.

```sh
git add .
git commit -m "feat: Add new feature X" # or "fix: Resolve bug Y"
```

### 8. Push to Your Fork

```sh
git push origin feature/your-feature-name
```

### 9. Create a Pull Request

Go to your forked repository on GitHub and create a new Pull Request (PR) to the `main` branch of the original repository. Please provide a detailed description of your changes in the PR.

## Code of Conduct

We expect all contributors to adhere to a respectful and inclusive code of conduct. Please be polite and constructive in your interactions.

## Reporting Issues

If you find a bug or have a feature request, please open an issue on the [GitHub Issues page](https://github.com/LackOfSkillz/Interview_Ace/issues).
