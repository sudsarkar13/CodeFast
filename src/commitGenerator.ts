import * as vscode from 'vscode';
import { execSync } from 'child_process';
import * as http from 'http';

interface OllamaResponse {
    response: string;
}

interface EmojiMapping {
    [key: string]: string;
}

export async function generateCommitMessage(): Promise<string> {
    const config = vscode.workspace.getConfiguration('codefast');
    const aiModel = config.get<string>('aiModel', 'codellama');
    const useEmojis = config.get<boolean>('commitBuddy.useEmojis', true);
    const customPrompt = config.get<string>('commitBuddy.customPrompt', '');
    const temperature = config.get<number>('commitBuddy.temperature', 0.7);
    const emojiMapping = config.get<EmojiMapping>('commitBuddy.emojiMapping', {
        'feat': '✨',
        'fix': '🐛',
        'docs': '📚',
        'style': '💎',
        'refactor': '📦',
        'test': '🚨',
        'chore': '🔧'
    });

    try {
        // Get the git diff
        const gitDiff = execSync('git diff --cached').toString();

        if (!gitDiff) {
            throw new Error('No staged changes found. Please stage your changes before generating a commit message.');
        }

        // Prepare the prompt for the AI model
        let prompt = customPrompt || 'Generate a concise commit message for the following changes:';
        prompt += `\n\n${gitDiff}\n\nCommit message:`;

        const generatedMessage = await callOllamaAPI(aiModel, prompt, temperature);

        // Add emoji if enabled
        const commitMessage = useEmojis ? addEmoji(generatedMessage, emojiMapping) : generatedMessage;

        return commitMessage;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to generate commit message: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while generating the commit message.');
        }
    }
}

function callOllamaAPI(model: string, prompt: string, temperature: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: model,
            prompt: prompt,
            stream: false,
            temperature: temperature
        });

        const options = {
            hostname: 'localhost',
            port: 11434,
            path: '/api/generate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedResponse: OllamaResponse = JSON.parse(responseData);
                    resolve(parsedResponse.response.trim());
                } catch (error) {
                    reject(new Error('Failed to parse Ollama API response'));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Ollama API request failed: ${error.message}`));
        });

        req.write(data);
        req.end();
    });
}

function addEmoji(message: string, emojiMapping: EmojiMapping): string {
    const prefix = message.split(':')[0].toLowerCase();
    const emoji = emojiMapping[prefix] || '🚀';

    return `${emoji} ${message}`;
}