export type SupportedAppKey = 'vscode' | 'vscode-insiders'

export function getAppKey(appName: string): SupportedAppKey | undefined {
	if (appName === 'Visual Studio Code') {
		return 'vscode'
	}
	if (appName === 'Visual Studio Code - Insiders') {
		return 'vscode-insiders'
	}
}
