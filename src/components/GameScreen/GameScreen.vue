<script>
import CliBox from "./CliBox.vue"

export default {
	name: "GameScreen",
	props: {
		content: String,
	},
}
</script>

<template>
	<div class="GameScreen">
		<CliBox />
	</div>
</template>

<style scoped></style>
