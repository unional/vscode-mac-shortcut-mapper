export type SupportedAppKey = 'vscode'

export function getAppKey(appName: string): SupportedAppKey | undefined {
	if (appName === 'Visual Studio Code') {
		return 'vscode'
	}
}
