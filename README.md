# CodeFast Copilot - Local Commit Buddy

CodeFast Copilot - Local Commit Buddy is a VS Code extension that generates commit messages and descriptions using local AI models through Ollama. It provides a seamless, offline experience for creating meaningful commit messages with minimal setup.

## Features

- 🤖 Generate commit messages and descriptions using local AI models
- 🎛️ Select your preferred AI model and customize the generated text
- 😊 Incorporate relevant emojis into commit messages and descriptions
- 🌡️ Control the creativity of the AI model with temperature setting
- 🔌 Native-like experience within VS Code
- 🏠 Offline functionality - no cloud services or API keys required
- 🆕 Compatible with the latest VS Code versions

## Requirements

- [VS Code](https://code.visualstudio.com/) (version 1.60.0 or higher)
- [Ollama](https://ollama.ai/) installed on your system

## Installation

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "CodeFast Copilot - Local Commit Buddy"
4. Click Install

## Usage

1. Stage your changes in Git
2. Open the Source Control view (Ctrl+Shift+G)
3. Click on the "Generate Commit Message" button in the Source Control title bar or use the command palette (Ctrl+Shift+P) and search for "Generate Commit Message"
4. Wait for the AI to generate the commit message
5. Review and edit the generated commit message in the Source Control input box
6. Commit your changes

## Configuration

You can customize the extension's behavior in the VS Code settings:

- `codefast.aiModel`: Select the AI model to use (default: "codellama")
- `codefast.useEmojis`: Enable or disable emoji incorporation (default: true)
- `codefast.customPrompt`: Set a custom prompt for the AI model
- `codefast.emojiMapping`: Customize the emoji mapping for commit message prefixes
- `codefast.temperature`: Control the randomness of the AI model's output (default: 0.7, range: 0-1)

To access these settings, search for "CodeFast" in the VS Code settings.

### Customizing Emoji Mapping

You can customize the emoji mapping for different commit message prefixes. The default mapping is:
