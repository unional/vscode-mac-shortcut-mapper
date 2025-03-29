// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { spawn } from 'node:child_process'
import * as vscode from 'vscode'
import { getInterpreterPath } from './ahk++/interpreter'
import { getAppKey } from './app_detector'
import { getDeployedFileUrl, getSourceFileUrl } from './file'

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

async function setupDefaultAHK(context: vscode.ExtensionContext) {
	const appKey = getAppKey(vscode.env.appName)
	if (!appKey) {
		console.info(`Unsupported app: ${vscode.env.appName}, exiting.`)
		return
	}

	const sourceFileUrl = getSourceFileUrl(context, appKey)
	const deployedFileUrl = getDeployedFileUrl(context, appKey)

	const sourceFileStat = await vscode.workspace.fs.stat(sourceFileUrl)
	const deployedFileStat = await vscode.workspace.fs.stat(deployedFileUrl).then(
		(s) => s,
		() => null,
	)

	if (!deployedFileStat || sourceFileStat.mtime > deployedFileStat.mtime) {
		await vscode.workspace.fs.copy(sourceFileUrl, deployedFileUrl, {
			overwrite: true,
		})
	}

	const interpreterPath = getInterpreterPath()
	if (!interpreterPath) {
		vscode.window.showInformationMessage('No interpreter path found in settings for AHK++. Please set it up.')
		return
	}

	const command = `"${interpreterPath}" "${deployedFileUrl.fsPath}"`
	const cp = spawn(command, { shell: true })
	console.info(`Spawning AHK++ with command: ${command}`)
	if (cp.pid) {
		cp.on('exit', (code) => {
			console.info(`AHK++ process exited with code: ${code}`)
		})
	} else {
		console.error(`Failed to spawn AHK++ with command: ${command}`)
	}
}
