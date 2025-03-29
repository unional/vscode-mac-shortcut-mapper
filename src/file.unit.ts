import * as assert from 'node:assert'
import * as vscode from 'vscode'
import { getDeployedFileUrl, getSourceFileUrl } from './file'

suite('getSourceFileUrl Tests', () => {
	const mockExtensionUri = vscode.Uri.file('/mock/extension/uri')
	const mockContext = { extensionUri: mockExtensionUri } as vscode.ExtensionContext

	test('should return correct URL for vscode-insiders', () => {
		const result = getSourceFileUrl(mockContext, 'vscode-insiders')
		assert.strictEqual(result.toString(), vscode.Uri.joinPath(mockExtensionUri, 'default_ahk', 'vscode.ahk').toString())
	})

	test('should return correct URL for vscode', () => {
		const result = getSourceFileUrl(mockContext, 'vscode')
		assert.strictEqual(result.toString(), vscode.Uri.joinPath(mockExtensionUri, 'default_ahk', 'vscode.ahk').toString())
	})
})

suite('getDeployedFileUrl Tests', () => {
	const mockContext: vscode.ExtensionContext = {
		globalStorageUri: vscode.Uri.file('/mock/global/storage'),
		// Other properties of ExtensionContext are not used in this function
	} as any

	test('should return correct deployed file URL for a given appKey', () => {
		const appKey = 'test-app'
		const expectedUri = vscode.Uri.file('/mock/global/storage/autohotkey/test-app.ahk')

		const result = getDeployedFileUrl(mockContext, appKey)

		assert.strictEqual(result.toString(), expectedUri.toString())
	})
})
