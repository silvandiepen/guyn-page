<template>
	<footer id="footer" class="footer">
		<div class="footer__navigation">
			<nuxt-link to="colors">
				Colors
			</nuxt-link>
		</div>
		<div div class="footer__bottom">
			<p>Made by <a href="https://www.silvandiepen.nl">Sil van Diepen</a></p>
		</div>
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
