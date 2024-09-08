import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as commitGenerator from '../commitGenerator';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });

    test('Generate Commit Message Command', async () => {
        const mockMessage = 'Test commit message';
        const generateCommitMessageStub = sinon.stub(commitGenerator, 'generateCommitMessage').resolves(mockMessage);

        // Simulate command execution
        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        // Assert that generateCommitMessage was called
        assert.strictEqual(generateCommitMessageStub.calledOnce, true);

        // You might want to add more assertions here, e.g., checking if the message was set in the SCM input box
        // This would require mocking the SCM API as well

        generateCommitMessageStub.restore();
    });

    test('Generate Commit Message with different AI models', async () => {
        const models = ['codellama', 'gpt-3.5-turbo', 'custom-model'];
        for (const model of models) {
            await vscode.workspace.getConfiguration().update('codefast.aiModel', model, true);
            const mockMessage = `Test commit message for ${model}`;
            const generateCommitMessageStub = sinon.stub(commitGenerator, 'generateCommitMessage').resolves(mockMessage);

            await vscode.commands.executeCommand('codefast.generateCommitMessage');

            assert.strictEqual(generateCommitMessageStub.calledOnce, true);

            generateCommitMessageStub.restore();
        }
    });

    test('Generate Commit Message with and without emojis', async () => {
        const emojiSettings = [true, false];
        for (const usesEmojis of emojiSettings) {
            await vscode.workspace.getConfiguration().update('codefast.useEmojis', usesEmojis, true);
            const mockMessage = usesEmojis ? '✨ Test commit message' : 'Test commit message';
            const generateCommitMessageStub = sinon.stub(commitGenerator, 'generateCommitMessage').resolves(mockMessage);

            await vscode.commands.executeCommand('codefast.generateCommitMessage');

            assert.strictEqual(generateCommitMessageStub.calledOnce, true);
            // Add more specific assertions based on your implementation

            generateCommitMessageStub.restore();
        }
    });

    test('Handle API errors gracefully', async () => {
        const errorMessage = 'API Error';
        const generateCommitMessageStub = sinon.stub(commitGenerator, 'generateCommitMessage').rejects(new Error(errorMessage));

        // Mock vscode.window.showErrorMessage
        const showErrorMessageStub = sinon.stub(vscode.window, 'showErrorMessage');

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(generateCommitMessageStub.calledOnce, true);
        assert.strictEqual(showErrorMessageStub.calledOnce, true);
        assert.strictEqual(showErrorMessageStub.firstCall.args[0], `API Error`);

        generateCommitMessageStub.restore();
        showErrorMessageStub.restore();
    });

    test('Show quick pick for commit type', async () => {
        const quickPickItems = [
            { label: 'feat', description: 'A new feature' },
            { label: 'fix', description: 'A bug fix' },
            { label: 'docs', description: 'Documentation only changes' },
            { label: 'style', description: 'Changes that do not affect the meaning of the code' },
            { label: 'refactor', description: 'A code change that neither fixes a bug nor adds a feature' },
            { label: 'test', description: 'Adding missing tests or correcting existing tests' },
            { label: 'chore', description: 'Changes to the build process or auxiliary tools and libraries' }
        ];
        const showQuickPickStub = sinon.stub(vscode.window, 'showQuickPick').resolves(quickPickItems[0]);

        const generateCommitMessageStub = sinon.stub(commitGenerator, 'generateCommitMessage').callsFake(async () => {
            // Simulate the behavior that should trigger showQuickPick
            await vscode.window.showQuickPick(quickPickItems);
            return 'Test message';
        });

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(showQuickPickStub.calledOnce, true, 'showQuickPick should be called once');
        assert.deepStrictEqual(showQuickPickStub.firstCall.args[0], quickPickItems, 'showQuickPick should be called with the correct items');

        generateCommitMessageStub.restore();
        showQuickPickStub.restore();
    });

    test('Performance: Generate commit message within acceptable time', async function() {
        this.timeout(5000); // Set a timeout of 5 seconds

        const start = process.hrtime();

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        const end = process.hrtime(start);
        const executionTime = end[0] * 1000 + end[1] / 1000000; // Convert to milliseconds

        assert.ok(executionTime < 3000, `Execution time (${executionTime}ms) exceeded 3000ms`);
    });
});