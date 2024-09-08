import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

suite('Integration Test Suite', () => {
    vscode.window.showInformationMessage('Start all integration tests.');

    test('Extension activation', async () => {
        console.log('Available extensions:', vscode.extensions.all.map(e => e.id));
        const extension = vscode.extensions.getExtension('codefastdev.codefast');
        assert.ok(extension, 'Extension should be present');
        
        if (extension) {
            await extension.activate();
            assert.strictEqual(extension.isActive, true, 'Extension should be active');
        }
    });

    test('Generate commit message command', async () => {
        // Create a temporary test file
        const tempDir = os.tmpdir();
        const testFilePath = path.join(tempDir, 'test.txt');
        fs.writeFileSync(testFilePath, 'Test content');

        try {
            // Open the test file
            const document = await vscode.workspace.openTextDocument(testFilePath);
            await vscode.window.showTextDocument(document);

            // Execute the command
            await vscode.commands.executeCommand('codefast.generateCommitMessage');

            // Add assertions to check the result of the command
            // For example, you might want to check if the SCM input box has been updated

        } finally {
            // Clean up
            fs.unlinkSync(testFilePath);
        }
    });
});