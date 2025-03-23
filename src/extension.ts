// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { getAppKey } from './app_detector'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	if (process.platform !== 'win32') {
		console.info('This extension is only supported on Windows. Exiting.')
		return
	}

	setupDefaultAHK(context)

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('macos-key-mapper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from MacOS Key Mapper!')
	})

	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}

function setupDefaultAHK(context: vscode.ExtensionContext) {
	const appKey = getAppKey(vscode.env.appName)
	if (!appKey) {
		console.info(`Unsupported app: ${vscode.env.appName}, exiting.`)
		return
	}
	const defaultFileUrl = vscode.Uri.joinPath(context.globalStorageUri, 'autohotkey', `${appKey}.ahk`)
	vscode.workspace.fs.stat(defaultFileUrl).then(
		() => {},
		() => {
			console.info(`AutoHotKey file for ${vscode.env.appName} not found, creating one`)
		},
	)
}
