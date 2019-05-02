<template>
	<section class="color-details">
		<ul v-trigger class="color-details__list">
			<li v-for="(color, value, index) in GuynColors" :key="index" class="color-details__item">
				<div class="color-details__block" :class="`background--${value}`"></div>
				<div class="color-details__info">
					<span class="color-details__text">{{ value }}</span>
					<span class="color-details__color">{{ color }}</span>
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

.color-details {
	&__list {
		width: 100%;
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		width: calc(100% + 5rem);
		margin-left: -2.5rem;
	}
	&__item {
		@media #{$small-only} {
			// width: 33.33%;
		}
		display: flex;
		width: 33.33%;
		padding: 0.5rem;
		&:hover {
			.colors-details__text {
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
		.trigger & {
			transition: opacity $base-transition $base-cubic-bezier, transform $base-transition $base-cubic-bezier;
			opacity: 0;
			transform: translateY(100%);
			@for $i from 1 through 100 {
				&:nth-child(#{$i}) {
					transition-delay: #{$i / 30}s;
				}
			}
		}
		.trigger.active & {
			opacity: 1;
			transform: translateY(0%);
		}
	}
	&__block {
		display: block;
		border-radius: $base-border-radius;
		overflow: hidden;
		width: grid(2);
		height: grid(2);
		flex-shrink: 0;
	}
	&__info {
		padding: 1rem;
		flex-grow: 1;
		width: 100%;
	}
	&__color {
		opacity: 0.5;
	}

	&__text {
		display: block;
		pointer-events: none;
		font-weight: 500;
	}
}
</style>
