# Incubyte ParaBank Automation Assignment

Automated test suite for ParaBank web application using Playwright and Cucumber BDD.

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Test Framework:** Playwright
- **BDD Framework:** Cucumber.js
- **Design Pattern:** Page Object Model (POM)
- **Version Control:** Git + GitHub

## 📁 Project Structure

src/
├── pages/ # Page Object Models
│ ├── HomePage.ts
│ ├── RegisterPage.ts
│ └── AccountPage.ts
├── tests/ # Playwright test specs
│ └── parabank.spec.ts
├── features/ # Cucumber BDD
│ ├── parabank.feature
│ └── step-definitions/
│ └── parabank.steps.ts
└── config.ts # Central configuration

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
git clone https://github.com/GitHubPrasad/Incubyte-Parabank-Assignment.git
cd Incubyte-Parabank-Assignment
npm install
npx playwright install
```

## ▶️ Running Tests

### Run Playwright Tests

```bash
npm test
```

### Run Cucumber BDD Tests

```bash
npm run cucumber
```

### View HTML Report

```bash
npm run test:report
```

## 🧪 Test Cases

| ID   | Scenario                             | Framework             |
| ---- | ------------------------------------ | --------------------- |
| TC01 | User Registration with valid details | Playwright + Cucumber |
| TC02 | Login with registered credentials    | Playwright + Cucumber |
| TC03 | Verify and log account balance       | Playwright + Cucumber |

## 📊 Test Results

- ✅ Playwright: 3/3 tests passing
- ✅ Cucumber BDD: 3/3 scenarios passing

## 🏗️ Design Patterns Used

- **Page Object Model:** Each page has its own class with locators and actions
- **BDD:** Feature files written in Gherkin for business readability
- **Central Config:** Base URL managed in `src/config.ts`
