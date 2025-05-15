import { GameFileSystem } from "./FileSystem"

export class OsModel {
	get rootFile(): GameFileSystem.Directory {
		return this._rootFile
	}
	get currentDirectory(): GameFileSystem.Directory {
		return this._currentDirectory
	}
	get currentPermission(): string {
		return this._currentPermission
	}

	private _rootFile: GameFileSystem.Directory
	private _currentDirectory: GameFileSystem.Directory
	private _currentPermission: string = "SuiHu"

	constructor() {
		this._rootFile = new GameFileSystem.Directory("", null)
		this._currentDirectory = this._rootFile
	}
}
