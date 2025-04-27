import {File} from "./File"
import {FileType} from "./FileType"
import {FileSystemEntry} from "./FileSystemEntry"

export class FileExecutable extends File {
	constructor(name: string, parent: FileSystemEntry | null) {
		super(name, parent, FileType.Executable)
	}
}
