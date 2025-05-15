import { OsModel } from "./OsModel"
import { OutputLine } from "./OutputLine"
import { ParseResult } from "../Parser"
import { GameFileSystem } from "./FileSystem"

export function Command(parsedInput: ParseResult, os: OsModel): OutputLine[] {
	switch (parsedInput.verb) {
		case "cd":
			return new CommandCd().Operate(parsedInput, os)
		case "help":
			return new CommandHelp().Operate(parsedInput, os)
		case "read":
			return new CommandRead().Operate(parsedInput, os)
		default:
			return [
				{
					line: `Error: Command '${parsedInput.verb}' not found.`,
					type: "error",
				},
				{
					line: "Use 'help' for a list of available commands.",
					type: "normal",
				},
			]
	}
}

export abstract class CommandUnit {
	public abstract Operate: (
		parsedInput: ParseResult,
		os: OsModel
	) => OutputLine[]
}

export class CommandCd implements CommandUnit {
	public Operate(parsedInput: ParseResult, os: OsModel): OutputLine[] {
		// if there is "--help" flag
		if (parsedInput.flags.some((flag) => flag.flag === "help")) {
			return this.Help()
		} else if (parsedInput.params.length === 0) {
			return [
				{
					line: "Error: No directory specified.",
					type: "error",
				},
				{
					line: "Use 'cd --help' for more information.",
					type: "normal",
				},
			]
		} else if (parsedInput.params.length > 1) {
			return [
				{
					line: "Error: Too many arguments.",
					type: "error",
				},
				{
					line: "Use 'cd --help' for more information.",
					type: "normal",
				},
			]
		} else if (parsedInput.flags.length > 0) {
			return [
				{
					line: "Error: Invalid flags.",
					type: "error",
				},
				{
					line: "Use 'cd --help' for more information.",
					type: "normal",
				},
			]
		} else {
			const newDirectoryStr = parsedInput.params[0]
			const currentDirectory = os.currentDirectory
			const newDirectory = GameFileSystem.GetFileByPath(
				newDirectoryStr,
				currentDirectory
			)
			if (newDirectory === null) {
				return [
					{
						line: `Error: Directory '${newDirectoryStr}' not found.`,
						type: "error",
					},
					{
						line: "Use 'cd --help' for more information.",
						type: "normal",
					},
				]
			} else if (!(newDirectory instanceof GameFileSystem.Directory)) {
				return [
					{
						line: `Error: '${newDirectoryStr}' is not a directory.`,
						type: "error",
					},
					{
						line: "Use 'cd --help' for more information.",
						type: "normal",
					},
				]
			} else {
				if (os.MoveDirectory(newDirectory)) {
					return [
						{
							line: `Changed directory to '${newDirectoryStr}'.`,
							type: "normal",
						},
					]
				} else {
					return [
						{
							line: `Error: Permission denied to access '${newDirectoryStr}'.`,
							type: "error",
						},
					]
				}
			}
		}
	}

	private Help(): OutputLine[] {
		return [
			{
				line: "cd [directory]",
				type: "emphasis",
			},
			{
				line: "Change the current directory to the specified directory.",
				type: "normal",
			},
			{
				line: "",
				type: "normal",
			},
			{
				line: "cd --help",
				type: "emphasis",
			},
			{
				line: "Display this help message.",
				type: "normal",
			},
			{
				line: "",
				type: "normal",
			},
			{
				line: "Examples:",
				type: "normal",
			},
			{
				line: "cd /where/ever/you/want/to/go",
				type: "emphasis",
			},
			{
				line: "cd ../",
				type: "emphasis",
			},
		]
	}
}

export class CommandHelp implements CommandUnit {
	public Operate(parsedInput: ParseResult, os: OsModel): OutputLine[] {
		return [
			{
				line: "Available commands:",
				type: "normal",
			},
			{
				line: "cd [directory]",
				type: "emphasis",
			},
			{
				line: "Change the current directory to the specified directory.",
				type: "normal",
			},
			{
				line: "",
				type: "normal",
			},
			{
				line: "help",
				type: "emphasis",
			},
			{
				line: "Display this help message.",
				type: "normal",
			},
			{
				line: "",
				type: "normal",
			},
		]
	}
}

export class CommandRead implements CommandUnit {
	public Operate(parsedInput: ParseResult, os: OsModel): OutputLine[] {
		// if there is "--help" flag
		if (parsedInput.flags.some((flag) => flag.flag === "help")) {
			return this.Help()
		} else if (parsedInput.params.length === 0) {
			return [
				{
					line: "Error: No file specified.",
					type: "error",
				},
				{
					line: "Use 'read --help' for more information.",
					type: "normal",
				},
			]
		} else if (parsedInput.params.length > 1) {
			return [
				{
					line: "Error: Too many arguments.",
					type: "error",
				},
				{
					line: "Use 'read --help' for more information.",
					type: "normal",
				},
			]
		} else if (parsedInput.flags.length > 0) {
			return [
				{
					line: "Error: Invalid flags.",
					type: "error",
				},
				{
					line: "Use 'read --help' for more information.",
					type: "normal",
				},
			]
		} else {
			const filePath = parsedInput.params[0]
			const currentDirectory = os.currentDirectory
			const file = GameFileSystem.GetFileByPath(filePath, currentDirectory)
			if (file === null) {
				return [
					{
						line: `Error: File '${filePath}' not found.`,
						type: "error",
					},
					{
						line: "Use 'read --help' for more information.",
						type: "normal",
					},
				]
			} else if (!(file instanceof GameFileSystem.FileContent)) {
				return [
					{
						line: `Error: '${filePath}' is not a file.`,
						type: "error",
					},
					{
						line: "Use 'read --help' for more information.",
						type: "normal",
					},
				]
			} else {
				return [
					{
						line: file.content,
						type: "normal",
					},
				]
			}
		}
	}

	private Help(): OutputLine[] {
		return [
			{
				line: "read [file]",
				type: "emphasis",
			},
			{
				line: "Read the contents of the specified file.",
				type: "normal",
			},
			{
				line: "",
				type: "normal",
			},
			{
				line: "read --help",
				type: "emphasis",
			},
			{
				line: "Display this help message.",
				type: "normal",
			},
			{
				line: "",
				type: "normal",
			},
			{
				line: "Examples:",
				type: "normal",
			},
			{
				line: "read /path/to/file.txt",
				type: "emphasis",
			},
		]
	}
}
