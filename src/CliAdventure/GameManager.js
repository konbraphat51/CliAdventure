import { Parse } from "./Parser"
import { Command } from "./CommandRouter"

export default class GameManager {
	constructor() {}

	GetInput(userInput) {
		const parsedInput = Parse(userInput)
		Command(parsedInput)
	}
}
