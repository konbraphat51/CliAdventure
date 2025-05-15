import { Parse } from "./Parser"
import { Command } from "./GameModel/Commands"
import { OutputLine } from "./GameModel/OutputLine"

export default class GameManager {
	constructor() {}

	Interact(userInput: string): OutputLine[] {
		// const parsedInput = Parse(userInput)
		// Command(parsedInput)

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
