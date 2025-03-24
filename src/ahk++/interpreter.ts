import { workspace } from 'vscode'
import { configPrefix, interpreterPathV2 } from './constants'

export function getInterpreterPath() {
	const interpreterPathV1 = 'v1.file.interpreterPath'
	const AHKConfig = workspace.getConfiguration(configPrefix)
	if (AHKConfig.has(interpreterPathV2)) {
		return AHKConfig.get<string>(interpreterPathV2)
	}
	if (AHKConfig.has(interpreterPathV1)) {
		return AHKConfig.get<string>(interpreterPathV1)
	}

	return undefined
}
