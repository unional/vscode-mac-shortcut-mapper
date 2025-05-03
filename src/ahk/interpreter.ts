import { workspace } from 'vscode'
import { autohotkeyPath, configPrefix } from './constants'

export function getInterpreterPath() {
	const config = workspace.getConfiguration(configPrefix)
	return config.get<string>(autohotkeyPath, 'C:\\Program Files\\AutoHotkey\\AutoHotkey.exe')
}
