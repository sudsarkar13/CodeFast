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
		const commitType = await vscode.window.showQuickPick(['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'], {
			placeHolder: 'Select commit type'
		});

		if (!commitType) {
			vscode.window.showErrorMessage('Commit type is required');
			return;
		}

		const commitMessage = await gcm(commitType);
		await vscode.env.clipboard.writeText(commitMessage);
		vscode.window.showInformationMessage(`Commit message copied to clipboard: ${commitMessage}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// Perform any cleanup tasks here
	console.log('CodeFast extension is deactivating');
}
