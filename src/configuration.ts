import * as vscode from 'vscode';

export function getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration('codefast');
}

export function getOllamaEndpoint(): string {
    return getConfiguration().get('ollamaEndpoint', 'http://127.0.0.1:11434/api/generate');
}

export function getOllamaModel(): string {
    return getConfiguration().get('ollamaModel', 'llama3.1:8b');
}

// ... other configuration functions ...
