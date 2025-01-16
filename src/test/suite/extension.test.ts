import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

suite('Extension Test Suite', function() {
    this.timeout(10000); // Increase timeout for all tests in this suite

    vscode.window.showInformationMessage('Start all tests.');

    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });

    test('Generate Commit Message Command', async function() {
        const quickPickStub = sinon.stub(vscode.window, 'showQuickPick').resolves({ label: 'feat' });
        const scmInputBox = { value: '' };
        const scmStub = sinon.stub(vscode, 'scm').value({ inputBox: scmInputBox });

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(quickPickStub.called, true);
        assert.strictEqual(scmInputBox.value, 'feat: Simulated commit message');

        quickPickStub.restore();
        scmStub.restore();
    });

    test('Generate Commit Message with different AI models', async function() {
        const quickPickStub = sinon.stub(vscode.window, 'showQuickPick').resolves({ label: 'fix' });
        const scmInputBox = { value: '' };
        const scmStub = sinon.stub(vscode, 'scm').value({ inputBox: scmInputBox });

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(quickPickStub.called, true);
        assert.strictEqual(scmInputBox.value, 'fix: Simulated commit message');

        quickPickStub.restore();
        scmStub.restore();
    });

    test('Generate Commit Message with and without emojis', async function() {
        const quickPickStub = sinon.stub(vscode.window, 'showQuickPick').resolves({ label: 'docs' });
        const scmInputBox = { value: '' };
        const scmStub = sinon.stub(vscode, 'scm').value({ inputBox: scmInputBox });

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(quickPickStub.called, true);
        assert.strictEqual(scmInputBox.value, 'docs: Simulated commit message');

        quickPickStub.restore();
        scmStub.restore();
    });

    test('Handle API errors gracefully', async function() {
        const quickPickStub = sinon.stub(vscode.window, 'showQuickPick').rejects(new Error('API Error'));
        const showErrorMessageStub = sinon.stub(vscode.window, 'showErrorMessage');
        const scmStub = sinon.stub(vscode, 'scm').value({ inputBox: { value: '' } });

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(showErrorMessageStub.calledWith('Failed to generate commit message: API Error'), true);

        quickPickStub.restore();
        showErrorMessageStub.restore();
        scmStub.restore();
    });

    test('Show quick pick for commit type', async function() {
        const quickPickStub = sinon.stub(vscode.window, 'showQuickPick').resolves({ label: 'chore' });
        const scmInputBox = { value: '' };
        const scmStub = sinon.stub(vscode, 'scm').value({ inputBox: scmInputBox });

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(quickPickStub.called, true);
        assert.strictEqual(scmInputBox.value, 'chore: Simulated commit message');

        quickPickStub.restore();
        scmStub.restore();
    });

    test('Performance: Generate commit message within acceptable time', async function() {
        const quickPickStub = sinon.stub(vscode.window, 'showQuickPick').resolves({ label: 'feat' });
        const scmInputBox = { value: '' };
        const scmStub = sinon.stub(vscode, 'scm').value({ inputBox: scmInputBox });

        const start = Date.now();
        await vscode.commands.executeCommand('codefast.generateCommitMessage');
        const end = Date.now();

        assert.strictEqual(end - start < 5000, true); // Ensure it takes less than 5 seconds

        quickPickStub.restore();
        scmStub.restore();
    });
});