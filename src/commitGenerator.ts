import * as vscode from 'vscode';
import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function generateCommitMessage(type: string): Promise<string> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspaceFolder) {
        throw new Error('No workspace folder found');
    }

    try {
        const { stdout: diff } = await execAsync('git diff --cached', { cwd: workspaceFolder });
        
        if (!diff) {
            throw new Error('No staged changes found');
        }

        const config = vscode.workspace.getConfiguration('codefast');
        const aiModel = config.get<string>('aiModel') || 'codellama';
        const useEmojis = config.get<boolean>('useEmojis') || false;
        const customPrompt = config.get<string>('customPrompt') || '';
        const maxTokens = config.get<number>('maxTokens') || 150;

        const prompt = `Generate a concise commit message for the following git diff, using the conventional commits format with type "${type}". ${customPrompt}\n\nGit Diff:\n${diff}`;

        const response = await axios.post('http://localhost:11434/api/generate', {
            model: aiModel,
            prompt: prompt,
            stream: false,
            max_tokens: maxTokens
        });

        let commitMessage = response.data.response.trim();

        if (useEmojis) {
            const emojiMapping = config.get<Record<string, string>>('emojiMapping') || {};
            const emoji = emojiMapping[type] || '';
            commitMessage = `${emoji} ${commitMessage}`;
        }

        return commitMessage;
    } catch (error) {
        console.error('Error generating commit message:', error);
        throw error;
    }
}