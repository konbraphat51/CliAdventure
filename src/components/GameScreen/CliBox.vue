<script>
import GameManager from "/src/CliAdventure/GameManager"

export default {
	name: "CliBox",
	props: {
		content: String,
	},
	data() {
		return {
			userInput: "",
			outputLines: [],
			gameManager: new GameManager(),
		}
	},
	methods: {
		handleInput() {
			if (this.userInput.trim() === "") return

			// Call GameManager.Interact and process the output
			const results = this.gameManager.Interact(this.userInput)
			this.outputLines.push(...results)

			// Clear the input field
			this.userInput = ""
		},
	},
}
</script>

<template>
	<div class="CliBox">
		<div class="output">
			<div v-for="(line, index) in outputLines" :key="index" :class="line.type">
				{{ line.line }}
			</div>
		</div>
		<textarea
			v-model="userInput"
			@keyup.enter="handleInput"
			placeholder="Type a command..."
		></textarea>
	</div>
</template>

<style scoped>
.CliBox {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.output {
	flex: 1;
	overflow-y: auto;
	background: black;
	color: white;
	padding: 10px;
	font-family: monospace;
}

textarea {
	resize: none;
	border: none;
	padding: 10px;
	font-family: monospace;
	background: black; /* Match the .output background color */
	color: white; /* Match the .output text color */
	caret-color: white; /* Ensure caret is visible */
}

textarea:focus {
	outline: none;
}

textarea:not(:focus) {
	position: relative;
}

textarea:not(:focus)::after {
	content: "";
	position: absolute;
	right: 10px; /* Adjust based on padding */
	width: 2px;
	height: 1em;
	background-color: white;
	animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
	0%,
	100% {
		border-color: transparent;
	}
	50% {
		border-color: white;
	}
}

.normal {
	color: white;
}

.error {
	color: red;
}

.emphasis {
	color: yellow;
	font-weight: bold;
}
</style>
