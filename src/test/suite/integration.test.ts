import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

suite('Integration Test Suite', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(vscode.window, 'showQuickPick').resolves({ label: 'feat' });
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Extension activation', async () => {
        const extension = vscode.extensions.getExtension('sudsarkar13.codefast');
        assert.notStrictEqual(extension, undefined, 'Extension should be present');
        if (extension) {
            await extension.activate();
            assert.strictEqual(extension.isActive, true, 'Extension should be active');
        }
    });

    test('Generate commit message command', async () => {
        const commitMessage = await vscode.commands.executeCommand('codefast.generateCommitMessage') as string;
        assert.strictEqual(typeof commitMessage, 'string');
        assert.ok(commitMessage.length > 0);
    });
});