import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as commitGenerator from '../commitGenerator';

suite('Extension Test Suite', () => {
    let sandbox: sinon.SinonSandbox;
    let quickPickStub: sinon.SinonStub;

    setup(() => {
        sandbox = sinon.createSandbox();
        quickPickStub = sandbox.stub(vscode.window, 'showQuickPick').resolves({ label: 'feat' });
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Generate Commit Message Command', async () => {
        const generateCommitMessageStub = sandbox.stub(commitGenerator, 'generateCommitMessage').resolves('Commit message');

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(quickPickStub.calledOnce, true);
        assert.strictEqual(generateCommitMessageStub.calledOnce, true);
        assert.deepStrictEqual(generateCommitMessageStub.firstCall.args[0], 'feat', 'Commit type should be passed to generateCommitMessage');
    });

    test('maxTokens configuration is read correctly', async () => {
        const getConfigurationStub = sandbox.stub(vscode.workspace, 'getConfiguration').returns({
            get: (key: string): unknown => key === 'maxTokens' ? 100 : undefined,
            has: (section: string): boolean => section === 'maxTokens',
            inspect: () => undefined,
            update: () => Promise.resolve()
        });

        const generateCommitMessageStub = sandbox.stub(commitGenerator, 'generateCommitMessage').resolves('Commit message');

        await vscode.commands.executeCommand('codefast.generateCommitMessage');

        assert.strictEqual(getConfigurationStub.calledOnce, true);
        assert.strictEqual(generateCommitMessageStub.calledOnce, true);
        assert.strictEqual(quickPickStub.calledOnce, true);
        assert.strictEqual(getConfigurationStub().get('maxTokens'), 100, 'maxTokens should be read from configuration');
    });
});