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
		get parent(): Directory | null {
			return this._parent
		}
		get entryType(): FileSystemEntryType {
			return this._entryType
		}

		protected _name: string
		protected _parent: Directory | null
		protected _entryType: FileSystemEntryType

		constructor(
			name: string,
			parent: Directory | null,
			entryType: FileSystemEntryType,
		) {
			this._name = name
			this._parent = parent
			this._entryType = entryType

			// register to directory
			if (parent) {
				parent.addChild(this)
			}
		}

		public getFullPath(): string {
			return `${this.parent ? this.parent.getFullPath() + "/" : ""}${this.name}`
		}

		public moveDirectory(newParent: Directory): void {
			if (this.parent) {
				this.parent.removeChild(this)
			}
			newParent.addChild(this)
			this._parent = newParent
		}

		public delete(): void {
			if (this.parent) {
				this.parent.removeChild(this)
			}
		}
	}

	export abstract class File extends FileSystemEntry {
		fileType: FileType

		constructor(name: string, parent: Directory, fileType: FileType) {
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

		constructor(name: string, parent: Directory) {
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
		constructor(name: string, parent: Directory) {
			super(name, parent, FileType.Executable)
		}
	}

	export class Directory extends FileSystemEntry {
		get children(): FileSystemEntry[] {
			return this._children
		}
		private _children: FileSystemEntry[] = []

		constructor(name: string, parent: Directory | null) {
			super(name, parent, FileSystemEntryType.Directory)
		}

		public addChild(child: FileSystemEntry): void {
			this._children.push(child)
		}

		public removeChild(child: FileSystemEntry): void {
			this._children = this._children.filter((c) => c !== child)
		}
	}
}
