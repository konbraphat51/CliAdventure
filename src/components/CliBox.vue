<script>
export default {
	name: "CliBox",
	props: {
		content: String,
	},
}
</script>

<template>
	<div class="CliBox">
		<textarea :placeholder="content"></textarea>
	</div>
</template>

<style scoped></style>
