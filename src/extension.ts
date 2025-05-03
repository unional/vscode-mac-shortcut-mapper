// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { spawn } from 'node:child_process'
import * as vscode from 'vscode'
import { getInterpreterPath } from './ahk/interpreter'
import { getAppKey } from './app_detector'
import { getDeployedFileUrl, getSourceFileUrl } from './file'
import { NAME } from './constants'

const logger = vscode.window.createOutputChannel('MacOS Key Mapper', { log: true })

export function activate(context: vscode.ExtensionContext) {
	if (process.platform !== 'win32') {
		logger.info('This extension is only useful on Windows. Exiting.')
		return
	}

	setupDefaultAHK(context).then((disposable) => {
		if (disposable) {
			context.subscriptions.push(disposable)
		}
	})
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function setupDefaultAHK(context: vscode.ExtensionContext) {
	const appKey = getAppKey(vscode.env.appName)
	if (!appKey) {
		logger.info(`Unsupported app: ${vscode.env.appName}, exiting.`)
		return
	}

	const sourceFileUrl = getSourceFileUrl(context, appKey)
	const deployedFileUrl = getDeployedFileUrl(context, appKey)

	logger.info(`Source file: ${sourceFileUrl.fsPath}`)
	logger.info(`Deployed file: ${deployedFileUrl.fsPath}`)

	const sourceFileStat = await vscode.workspace.fs.stat(sourceFileUrl)
	const deployedFileStat = await vscode.workspace.fs.stat(deployedFileUrl).then(
		(s) => s,
		() => null,
	)

	if (!deployedFileStat || sourceFileStat.mtime > deployedFileStat.mtime) {
		logger.info(`Copying ${sourceFileUrl.fsPath} to ${deployedFileUrl.fsPath}...`)
		await vscode.workspace.fs.copy(sourceFileUrl, deployedFileUrl, {
			overwrite: true,
		})
	}

	const interpreterPath = getInterpreterPath()
	if (!interpreterPath) {
		vscode.window.showInformationMessage(
			'This extension uses AutoHotKey. Please install it or specify its path in the settings.',
		)
		return
	}

	const command = `"${interpreterPath}" "${deployedFileUrl.fsPath}"`
	const cp = spawn(command, { shell: true })
	let dead = false
	if (!cp.pid) {
		logger.error(`Failed to spawn AutoHotKey with command: ${command}`)
		return
	}
	logger.info(`Started AutoHotKey with command: ${command} (${cp.pid})`)

	cp.on('exit', (code) => {
		logger.info(`AutoHotKey process (${cp.pid}) exited with code: ${code}`)
		dead = true
	})

	return new vscode.Disposable(() => {
		if (!dead && cp.pid) {
			logger.info(`Killing AutoHotKey with command: ${command} (${cp.pid})`)
			cp.kill()
		}
	})
}
