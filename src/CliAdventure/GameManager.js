import { Parse } from "./Parser"
import { Command } from "./CommandRouter"

export default class GameManager {
	constructor() {}

	GetInput(userInput) {
		const parsedInput = Parse(userInput)
		Command(parsedInput)
	}

	Output() {
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
