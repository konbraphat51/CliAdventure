import { Parse } from "./Parser"
import { Command } from "./GameModel/CommandRouter"

interface OutputLine {
	line: string
	type: "normal" | "error" | "emphasis"
}

export default class GameManager {
	constructor() {}

	Input(userInput: string): void {
		const parsedInput = Parse(userInput)
		Command(parsedInput)
	}

	Output(): OutputLine[] {
		return [
			{
				line: "test test test test",
				type: "normal",
			},
			{
				line: "error error error",
				type: "error",
			},
			{
				line: "emphasis emphasis emphasis",
				type: "emphasis",
			},
		]
	}
}
