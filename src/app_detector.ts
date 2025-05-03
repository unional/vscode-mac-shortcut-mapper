export type SupportedAppKey = 'vscode' | 'vscode-insiders' | 'cursor'

export function getAppKey(appName: string): SupportedAppKey | undefined {
	if (appName === 'Visual Studio Code') {
		return 'vscode'
	}
	if (appName === 'Visual Studio Code - Insiders') {
		return 'vscode-insiders'
	}
	if (appName.startsWith('Cursor')) {
		return 'cursor'
	}
}
