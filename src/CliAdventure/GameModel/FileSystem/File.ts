import {FileSystemEntryType} from "./FileSystemEntryType"
import {FileSystemEntry} from "./FileSystemEntry"
import {FileType} from "./FileType"

export abstract class File extends FileSystemEntry {
	name: string
	parent: FileSystemEntry | null
	fileType: FileType
	entryType: FileSystemEntryType

	constructor(
		name: string,
		parent: FileSystemEntry | null,
		fileType: FileType,
	) {
		super()
		this.name = name
		this.parent = parent
		this.fileType = fileType
		this.entryType = FileSystemEntryType.File
	}

	getFullPath(): string {
		return `${this.parent ? this.parent.getFullPath() + "/" : "/"}${this.name}`
	}
}
