import {GameFileSystem} from "./FileSystem"

export class OsModel {
	get rootFile(): GameFileSystem.Directory {
		return this._rootFile
	}
	get currentDirectory(): GameFileSystem.Directory {
		return this._currentDirectory
	}

	private _rootFile: GameFileSystem.Directory
	private _currentDirectory: GameFileSystem.Directory

	constructor() {
		this._rootFile = new GameFileSystem.Directory("", null)
		this._currentDirectory = this._rootFile
	}
}
