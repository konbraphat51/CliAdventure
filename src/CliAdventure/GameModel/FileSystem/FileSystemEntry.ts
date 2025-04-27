import {FileSystemEntryType} from "./FileSystemEntryType"

export abstract class FileSystemEntry {
	get name(): string {
		return this._name
	}
	get parent(): FileSystemEntry | null {
		return this._parent
	}
	get entryType(): FileSystemEntryType {
		return this._entryType
	}

	protected _name: string
	protected _parent: FileSystemEntry | null
	protected _entryType: FileSystemEntryType

	constructor(
		name: string,
		parent: FileSystemEntry | null,
		entryType: FileSystemEntryType,
	) {
		this._name = name
		this._parent = parent
		this._entryType = entryType
	}

	public getFullPath(): string {
		return `${this.parent ? this.parent.getFullPath() + "/" : ""}${this.name}`
	}
}
