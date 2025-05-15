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
		get root(): Directory {
			let current: Directory | null = this.parent
			while (current && current.parent) {
				current = current.parent
			}
			return current!
		}

		protected _name: string
		protected _parent: Directory | null
		protected _entryType: FileSystemEntryType

		constructor(
			name: string,
			parent: Directory | null,
			entryType: FileSystemEntryType
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

		public permissionRead: string[] = []
		public permissionWrite: string[] = []

		constructor(name: string, parent: Directory | null) {
			super(name, parent, FileSystemEntryType.Directory)
		}

		public addChild(child: FileSystemEntry): void {
			this._children.push(child)
		}

		public removeChild(child: FileSystemEntry): void {
			this._children = this._children.filter((c) => c !== child)
		}

		public getFullPath(): string {
			return `${this.parent ? this.parent.getFullPath() + "/" : ""}${
				this.name
			}/`
		}
	}

	// Utility to load the file system from JSON
	export function loadFileSystemFromJson(
		json: any,
		parent: Directory | null = null
	): Directory {
		function createEntry(
			entry: any,
			parent: Directory | null
		): FileSystemEntry {
			if (entry.type === "directory") {
				const dir = new Directory(entry.name, parent)
				if (entry.meta && entry.meta.permissions) {
					dir.permissionRead = entry.meta.permissions.read || []
					dir.permissionWrite = entry.meta.permissions.write || []
				}
				if (Array.isArray(entry.children)) {
					for (const child of entry.children) {
						dir.addChild(createEntry(child, dir))
					}
				}
				return dir
			} else if (entry.type === "file") {
				if (entry.name.endsWith(".exe")) {
					const file = new FileExecutable(entry.name, parent!)
					return file
				} else {
					const file = new FileContent(entry.name, parent!)
					if (typeof entry.content === "string") file.setContent(entry.content)
					return file
				}
			}
			throw new Error("Unknown entry type: " + entry.type)
		}
		return createEntry(json, parent) as Directory
	}

	// FileSystemRoot class to load and hold the root directory from filing.json
	export class FileSystemRoot {
		public root: Directory

		constructor() {
			// Dynamically import the JSON file (works with Vite and Webpack)
			// @ts-ignore
			const filingJson = require("@/assets/filing.json")
			this.root = loadFileSystemFromJson(filingJson, null)
		}
	}

	export function GetFileByPath(
		pathStr: string,
		currentDir: Directory
	): FileSystemEntry | null {
		if (pathStr.includes("./")) {
			// Relative path
			return _GetFileByRelPath(pathStr, currentDir)
		} else {
			// Absolute path
			return _GetFileByAbsPath(pathStr, currentDir)
		}
	}

	function _GetFileByAbsPath(
		pathStr: string,
		currentDir: Directory
	): FileSystemEntry | null {
		const path = pathStr.split("/").filter((p) => p.length > 0)
		const rootDirectory = currentDir.root
		let currentEntry: FileSystemEntry | null = rootDirectory
		for (const part of path) {
			if (currentEntry instanceof Directory) {
				const found: FileSystemEntry | undefined = currentEntry.children.find(
					(child) => child.name === part
				)
				if (found) {
					currentEntry = found
				} else {
					return null
				}
			} else {
				return null
			}
		}
		return currentEntry
	}

	function _GetFileByRelPath(
		pathStr: string,
		currentDir: Directory
	): FileSystemEntry | null {
		const path = pathStr.split("/").filter((p) => p.length > 0)
		let currentEntry: FileSystemEntry | null = currentDir
		for (const part of path) {
			if (part === ".") {
				// do nothing
			} else if (part === "..") {
				if (currentEntry.parent) {
					currentEntry = currentEntry.parent
				}
			} else {
				if (currentEntry instanceof Directory) {
					const found: FileSystemEntry | undefined = currentEntry.children.find(
						(child) => child.name === part
					)
					if (found) {
						currentEntry = found
					} else {
						return null
					}
				} else {
					return null
				}
			}
		}
		return currentEntry
	}
}
