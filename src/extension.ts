import * as vscode from 'vscode';
import { generateCommitMessage } from './commitGenerator';

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeFast Copilot - Local Commit Buddy is now active!');

    let disposable = vscode.commands.registerCommand('codefast.generateCommitMessage', async () => {
        const scm = vscode.scm.createSourceControl('git', 'Git');
        const inputBox = scm.inputBox;

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating commit message...",
            cancellable: false
        }, async (progress) => {
            try {
                const commitMessage = await generateCommitMessage();
                inputBox.value = commitMessage;
                vscode.window.showInformationMessage('Commit message generated successfully!');
            } catch (error) {
                if (error instanceof Error) {
                    vscode.window.showErrorMessage(error.message);
                } else {
                    vscode.window.showErrorMessage('An unknown error occurred while generating the commit message.');
                }
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}