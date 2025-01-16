import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

suite('Extension Test Suite', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Generate Commit Message Command', async () => {
        const commitMessage = await vscode.commands.executeCommand('codefast.generateCommitMessage') as string;
        assert.strictEqual(typeof commitMessage, 'string');
        assert.ok(commitMessage.length > 0);
    });

    test('maxTokens configuration is read correctly', () => {
        const config = vscode.workspace.getConfiguration('codefast');
        const maxTokens = config.get<number>('maxTokens');
        assert.strictEqual(maxTokens, 150);
    });

    // Add more tests here...
});
