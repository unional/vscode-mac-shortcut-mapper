import { workspace } from 'vscode'
import { CONFIG_AUTO_HOT_KEY_PATH, NAME } from '../constants'

export function getInterpreterPath() {
	const config = workspace.getConfiguration(NAME)
	return config.get<string>(CONFIG_AUTO_HOT_KEY_PATH, 'C:\\Program Files\\AutoHotkey\\v2\\AutoHotkey64.exe')
}
