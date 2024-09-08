# CodeFast Copilot - Local Commit Buddy: Author Documentation

This document provides step-by-step instructions for developing, testing, and publishing the CodeFast Copilot - Local Commit Buddy VS Code extension.

## Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 14.x or later)
2. Install [Visual Studio Code](https://code.visualstudio.com/)
3. Install [Git](https://git-scm.com/)

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/codefast-copilot-local-commit-buddy.git
   cd codefast-copilot-local-commit-buddy
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Open the project in VS Code:
   ```
   code .
   ```

## Building the Extension

To build the extension, run:

```
npm run build
```

## Testing

Run the test suite with:

```
npm test
```

## Packaging

To package the extension for distribution:

1. Install `vsce` globally:
   ```
   npm install -g vsce
   ```
2. Package the extension:
   ```
   vsce package
   ```

This will create a `.vsix` file in the project root.

## Publishing

To publish the extension to the VS Code Marketplace:

1. Ensure you have a Microsoft account and are registered as a publisher on the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode)