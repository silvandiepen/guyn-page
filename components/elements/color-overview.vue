<template>
	<section class="color-overview">
		<ul class="color-overview__list">
			<li v-for="(color, value, index) in colors" :key="index" v-trigger class="color-overview__item">
				<div class="color-overview__block" :class="`background--${value}`">
					<span class="color-overview__text">{{ value }}</span>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	computed: {
		colors() {
			return this.$store.getters['guyn/getColors'];
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.color-overview {
	&__list {
		width: 100%;
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		// flex-flow: column wrap;
		align-content: space-between;
		width: calc(100% + 5rem);
		margin-left: -2.5rem;
	}
	&__item {
		@media #{$small-only} {
			// width: 33.33%;
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
		&.trigger {
			transition: opacity $base-transition $base-cubic-bezier, transform $base-transition $base-cubic-bezier;
			opacity: 0;
			transform: translateY(100%);
			transition-delay: 0s;
		}
		&.trigger.active {
			opacity: 1;
			transform: translateY(0%);
			@for $i from 1 through 100 {
				&:nth-child(#{$i}) {
					transition-delay: #{$i / 30}s;
				}
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
