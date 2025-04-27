import {FileSystemEntryType} from "./FileSystemEntryType"
import {FileSystemEntry} from "./FileSystemEntry"
import {FileType} from "./FileType"

export abstract class File extends FileSystemEntry {
	fileType: FileType

	constructor(
		name: string,
		parent: FileSystemEntry | null,
		fileType: FileType,
	) {
		super(name, parent, FileSystemEntryType.File)
		this.fileType = fileType
	}

	getFullPath(): string {
		return `${this.parent ? this.parent.getFullPath() + "/" : "/"}${this.name}`
	}
}
