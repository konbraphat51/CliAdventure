export namespace GameFileSystem {
	export enum FileType {
		Executable = "executable",
		Content = "text",
	}

	export enum FileSystemEntryType {
		Directory = "directory",
		File = "file",
	}

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
			return `${this.parent ? this.parent.getFullPath() + "/" : "/"}${
				this.name
			}`
		}
	}

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

	export class FileExecutable extends File {
		constructor(name: string, parent: FileSystemEntry | null) {
			super(name, parent, FileType.Executable)
		}
	}

	export class Directory extends FileSystemEntry {
		constructor(name: string, parent: FileSystemEntry | null) {
			super(name, parent, FileSystemEntryType.Directory)
		}
	}
}
