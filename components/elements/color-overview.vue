<template>
	<section class="colors">
		<ul class="colors__list">
			<li v-for="(color, value, index) in GuynColors" :key="index" class="colors__item">
				<div class="colors__block" :class="`background--${value}`">
					<span class="colors__text">{{ value }}</span>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import GuynColors from '../../node_modules/guyn/json/guyn.json';

export default {
	components: {},
	data() {
		return {
			GuynColors: GuynColors
		};
	}
};
</script>

<style lang="scss">
@import '~tools';

.colors {
	&__list {
		width: 100%;
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		// flex-flow: column wrap;
		align-content: space-between;
		@media #{$small-only} {
			width: calc(100% + 2rem);
			margin-left: -1rem;
		}
	}
	&__item {
		@media #{$small-only} {
			width: 33.33%;
		}
		padding: 0.5rem;
		&:hover {
			.colors__text {
				opacity: 1;
				transform: translateY(0%);
			}
		}
		@media #{$medium-up} {
			// &:nth-child(3n-2) {
			// 	order: 3;
			// }
			// &:nth-child(3n-1) {
			// 	order: 2;
			// }
			// &:nth-child(3n) {
			// 	order: 1;
			// }
			&::before,
			&::after {
				content: '';
				flex-basis: 100%;
				width: 0;
				order: 2;
			}
		}
	}
	&__block {
		display: block;
		width: 100%;
		// height: 0;
		// padding-bottom: 100%;
		border-radius: $base-border-radius;
		overflow: hidden;
	}

	&__text {
		opacity: 0;
		transition: transform $base-transition ease-in-out;
		transform: translateY(25%);
		padding: 1rem;
		display: block;
		pointer-events: none;
	}
}
</style>
