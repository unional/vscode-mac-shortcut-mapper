import { workspace } from 'vscode'
import { configPrefix, interpreterPathV2 } from './constants'

export function getInterpreterPath() {
	return 'C:\\Program Files\\AutoHotkey\\v2\\AutoHotkey.exe'
	// const interpreterPathV1 = 'v1.file.interpreterPath'
	// const AHKConfig = workspace.getConfiguration(configPrefix)
	// if (AHKConfig.has(interpreterPathV2)) {
	// 	return AHKConfig.get<string>(interpreterPathV2)
	// }
	// if (AHKConfig.has(interpreterPathV1)) {
	// 	return AHKConfig.get<string>(interpreterPathV1)
	// }

	// return undefined
}
