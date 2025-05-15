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
		<input
			v-model="userInput"
			@keyup.enter="handleInput"
			placeholder="Type a command..."
			class="input-box"
		/>
	</div>
</template>

<style scoped>
.CliBox {
	display: flex;
	flex-direction: column;
	height: 94vh; /* Expand to full screen height */
	width: 94vw; /* Expand to full screen width */
}

.output {
	flex: 1;
	overflow-y: auto; /* Enable vertical scrolling */
	overflow-x: hidden; /* Disable horizontal scrolling */
	background: black;
	color: white;
	padding: 10px;
	font-family: monospace;
	width: 100%;
}

.input-box {
	width: 100%;
	border: none;
	padding: 10px;
	font-family: monospace;
	background: rgb(84, 84, 84);
	color: white;
	caret-color: white;
}

.input-box:focus {
	outline: none;
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
