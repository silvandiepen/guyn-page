<template>
	<footer id="footer" class="footer">
		<p>Made by <a href="https://www.silvandiepen.nl">Sil van Diepen</a></p>
	</footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '~tools';

// Footer styles
.footer {
	padding: grid(1);
	color: color(DarkLight);
	text-align: center;

	p {
		display: block;
		width: 100%;
		text-align: center;
		max-width: 100%;
	}
}
</style>
