import * as vscode from 'vscode';
import { generateCommitMessage as gcm } from './commitGenerator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
	console.log('Congratulations, your extension "codefast" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('codefast.generateCommitMessage', async () => {
		const commitTypes = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'];
		const selectedType = await vscode.window.showQuickPick(commitTypes, {
			placeHolder: 'Select the type of commit'
		});

		if (!selectedType) {
			return; // User cancelled the selection
		}

		try {
			const message = await gcm(selectedType);
			await vscode.env.clipboard.writeText(message);
			vscode.window.showInformationMessage(`Commit message copied to clipboard: ${message}`);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to generate commit message: ${error}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// Perform any cleanup tasks here
	console.log('CodeFast extension is deactivating');
}

// Export the generateCommitMessage function for testing
export const generateCommitMessage = gcm;