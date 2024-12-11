# Contributing to Caelus Platform

First off, thank you for considering contributing to Caelus Platform! It's people like you that make Caelus such a great tool for sustainable fashion.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* A clear and descriptive title
* A detailed description of the proposed feature
* Explain why this enhancement would be useful
* Include mockups or examples if applicable

### Pull Requests

* Fill in the required template
* Follow the TypeScript styleguide
* Include appropriate test cases
* End all files with a newline

## Development Process

1. Fork the repo
2. Create a new branch from `main`
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Setting up your development environment

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Run database migrations:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Style Guide

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use type annotations
* Prefer interfaces over type aliases
* Use functional components with hooks
* Follow the project's existing patterns

### Testing

* Write tests for new features
* Update tests when modifying existing features
* Ensure all tests pass before submitting PR

## Community

* Join our Discord server
* Follow us on Twitter
* Read our blog

Thank you for contributing to Caelus Platform! 🌟