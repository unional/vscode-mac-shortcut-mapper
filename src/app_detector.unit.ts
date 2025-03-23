import * as assert from 'node:assert'
import { getAppKey } from './app_detector'

suite('getAppKey', () => {
	test('should return vscode for Visual Studio Code', () => {
		assert.strictEqual(getAppKey('Visual Studio Code'), 'vscode')
	})
})
