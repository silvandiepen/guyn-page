<template>
	<main class="page page--home">
		<section ref="intro" class="intro">
			<GuynLogo></GuynLogo>
		</section>
		<section class="colors">
			<div class="row center">
				<div class="column small-full medium-two-third">
					<ColorOverview></ColorOverview>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import ColorOverview from '~/components/elements/color-overview.vue';
import GuynLogo from '~/components/elements/guyn-logo.vue';
export default {
	components: {
		GuynLogo,
		ColorOverview
	},
	data() {
		return {
			offTop: 0
		};
	},
	mounted() {
		const _this = this;
		_this.setTop();
		window.addEventListener('scroll', () => {
			_this.setTop();
		});
	},
	methods: {
		setTop() {
			const _this = this;
			_this.offTop = window.scrollY;
			_this.offTopPercentage = (window.innerHeight / 100) * (window.scrollY / 100);

			_this.$refs.intro.style.setProperty('--scroll-top-percentage', this.offTopPercentage + '%');
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.page {
	// general page styles
	&--home {
		// specific home styles
	}
}

.intro {
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	svg {
		position: relative;
		z-index: 10;
	}
	&::before {
		position: absolute;
		left: 0;
		top: 0;
		content: '';
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to bottom, color(Beige), color(Beige, 0));
		transform: translateY(calc(var(--scroll-top-percentage) * -1));
		opacity: calc(1 * var(--scroll-top-percentage));
	}
}
.colors {
	padding: grid(3 0);
}
</style>
