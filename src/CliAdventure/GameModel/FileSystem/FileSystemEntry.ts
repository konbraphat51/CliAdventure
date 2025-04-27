import {FileSystemEntryType} from "./FileSystemEntryType"

export abstract class FileSystemEntry {
	abstract get name(): string
	abstract get parent(): FileSystemEntry | null
	abstract get entryType(): FileSystemEntryType

	getFullPath(): string {
		return `${this.parent ? this.parent.getFullPath() + "/" : ""}${this.name}`
	}
}
