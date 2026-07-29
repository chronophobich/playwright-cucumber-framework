# Playwright Automation Framework - Technical Assessment

## Overview

This repository contains a scalable UI and API automation framework developed as part of the technical assessment.

The framework is built using **Playwright**, **Cucumber (BDD)**, and the **Page Object Model (POM)** design pattern. It includes UI automation, API validation, SQL solutions, environment configuration, and an AI self-healing design exercise.

---

# Tech Stack

- Playwright
- Cucumber (playwright-bdd)
- JavaScript (ES Modules)
- Node.js
- Page Object Model (POM)

---

# Project Structure

```
playwright-cucumber-framework/
│
├── features/
├── steps/
├── pages/
├── helpers/
├── tests/
│   └── api/
├── sql/
├── AI_SELF_HEALING.md
├── playwright.config.js
├── playwright.api.config.js
├── package.json
└── README.md
```

---

# Setup

Clone the repository

```bash
git clone https://github.com/chronophobich/playwright-cucumber-framework.git
cd playwright-cucumber-framework
```

Install dependencies

```bash
npm install
```

---

# Execute UI Tests

```bash
npm test
```

or

```bash
npm run test:headed
```

---

# Execute API Tests

```bash
npx playwright test --config=playwright.api.config.js
```

---

# UI Test Cases

## Test Case 1 – EMI Pie Chart

Automated scenarios:

### Scenario A

- Home Loan Amount: ₹25,00,000
- Interest Rate: 10%
- Tenure: 10 Years

Validations:

- EMI calculated within the framework
- Application EMI matches calculated EMI
- Total Interest validation
- Total Amount validation
- Pie chart visibility
- Pie chart values greater than zero

---

### Scenario B

- Home Loan Amount: ₹50,00,000
- Interest Rate: 7.5%
- Tenure: 15 Years

Validations:

- EMI calculation
- Application value validation
- Pie chart validation

---

## Test Case 2 – EMI Bar Chart

Scenario:

- Personal Loan Amount: ₹10,00,000
- Interest Rate: 12%
- Loan Tenure: 5 Years

Validations:

- Calendar widget interaction
- Bar chart visibility
- Number of bars
- Tooltip values

---

# API Testing

Target API

```
POST https://jsonplaceholder.typicode.com/posts
```

Scenarios Covered

- Excessively long title
- Unsupported special characters
- Missing required field (userId)

## Observation

JSONPlaceholder is a mock REST API and does not perform server-side validation for invalid payloads. During testing, the service returned **HTTP 201 (Created)** for all submitted requests. The tests validate the observed behaviour of the target API rather than assuming validation that the service does not implement.

---

# SQL Solutions

Included:

- Scenario 1 – Round-trip transaction detection
- Scenario 2 – IPL consecutive 30+ run streaks

Table schemas and query outputs are included with the submission.

---

# AI Self-Healing Exercise

As required by the assessment:

- Intentionally broken locators were added for demonstration.
- `AI_SELF_HEALING.md` describes:
  - Failure detection
  - AI prompt strategy
  - Validation process
  - Proposed self-healing workflow

A simple proof-of-concept fallback helper was also implemented to demonstrate how multiple locator strategies can be attempted before reporting failure.

---

# Continuous Integration

A GitHub Actions workflow has been configured to automatically:

- Install dependencies
- Install Playwright browsers
- Generate BDD tests
- Execute UI tests
- Execute API tests
- Upload the Playwright report as a workflow artifact

# Design Principles

- Page Object Model
- Environment configuration
- Reusable helper methods
- Separation of test logic from page interactions
- Modular folder structure
- Dynamic and maintainable locator strategy

---

# Claude / ChatGPT Reflection

AI was used throughout the development process as a pair programmer rather than simply generating an initial project template.

It assisted with:

- Scaffolding the Playwright + Cucumber framework
- Organising the project structure
- Creating Page Objects and step definitions
- Debugging Playwright configuration issues
- Troubleshooting ES Module imports
- Designing API test scenarios
- Developing SQL solutions
- Discussing an AI-assisted self-healing strategy

The generated code was not accepted blindly. Several AI suggestions required manual verification and correction. For example, the calendar widget on the EMI Calculator application was initially assumed to be a standard HTML `<select>` element, but inspection of the DOM showed that it used clickable `<span>` elements instead. The automation was updated after manually analysing the page structure.

Similarly, the API tests were adjusted after verifying that JSONPlaceholder intentionally accepts most payloads and returns HTTP 201 rather than performing strict validation.

This project demonstrates using AI to accelerate development while relying on manual validation, debugging, and testing to ensure correctness.

# Test Results

The submission includes:

- SQL query output screenshots

---

# Author

Mukund Sharma
