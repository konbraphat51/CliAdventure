import {File} from "./File"
import {FileType} from "./FileType"
import {FileSystemEntry} from "./FileSystemEntry"

export class FileContent extends File {
	public content: string

	constructor(name: string, parent: FileSystemEntry | null) {
		super(name, parent, FileType.Content)
		this.content = ""
	}

	getContent(): string {
		return this.content
	}

	setContent(content: string): void {
		this.content = content
	}
}
