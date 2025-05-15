export interface ParseResult {
	verb: string
	params: string[]
	flags: { flag: string; params: string[] }[]
}

export function Parse(input: string): ParseResult {
	const result: ParseResult = {
		verb: "",
		params: [],
		flags: [],
	}

	const parts = input.trim().split(/\s+/)
	if (parts.length === 0) return result

	// Extract the verb
	result.verb = parts.shift() || ""

	let currentFlag: { flag: string; params: string[] } | null = null

	for (const part of parts) {
		if (part.startsWith("--")) {
			// Long flag
			if (currentFlag) {
				result.flags.push(currentFlag)
			}
			currentFlag = { flag: part.substring(2), params: [] }
		} else if (part.startsWith("-")) {
			// Short flag
			if (currentFlag) {
				result.flags.push(currentFlag)
			}
			currentFlag = { flag: part.substring(1), params: [] }
		} else {
			// Parameter
			if (currentFlag) {
				currentFlag.params.push(part)
			} else {
				result.params.push(part)
			}
		}
	}

	// Push the last flag if it exists
	if (currentFlag) {
		result.flags.push(currentFlag)
	}

	return result
}
