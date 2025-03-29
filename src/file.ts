import * as vscode from 'vscode'
import type { SupportedAppKey } from './app_detector.js'

export function getSourceFileUrl(context: vscode.ExtensionContext, appKey: SupportedAppKey) {
	return vscode.Uri.joinPath(
		context.extensionUri,
		'default_ahk',
		appKey === 'vscode-insiders' ? 'vscode.ahk' : `${appKey}.ahk`,
	)
}

export function getDeployedFileUrl(context: vscode.ExtensionContext, appKey: string) {
	const fileName = `${appKey}.ahk`
	return vscode.Uri.joinPath(context.globalStorageUri, 'autohotkey', fileName)
}
