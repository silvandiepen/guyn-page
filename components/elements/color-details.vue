<template>
	<div class="color-details">
		<ul class="color-details__list">
			<li v-for="(color, value, index) in GuynColors" :key="index" v-trigger class="color-details__item">
				<div class="color-details__container">
					<div class="color-details__block" :class="`background--${value}`"></div>
					<div class="color-details__info">
						<h5>{{ value }}</h5>
						<dl>
							<dt>hex</dt>
							<dd>{{ color }}</dd>
						</dl>
						<dl>
							<dt>scss</dt>
							<dd>$guyn-{{ value }}</dd>
						</dl>
						<dl>
							<dt>css</dt>
							<dd>--guyn-{{ value }}</dd>
						</dl>
						<dl>
							<dt>less</dt>
							<dd>@guyn-{{ value }}</dd>
						</dl>
						<dl>
							<dt>js</dt>
							<dd>guyn.{{ value }}</dd>
						</dl>
					</div>
				</div>
			</li>
		</ul>
	</div>
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
		width: 100%;
	}
	&__container {
		background-color: color(White);
		box-shadow: 0 0 1rem 0 color(Black, 0.1);
		width: 100%;
		display: flex;
		border-radius: 5px;
		overflow: hidden;
		@media #{$medium-up} {
			flex-direction: column;
		}
	}
	&__item {
		@media #{$small-only} {
			width: 100%;
		}
		@media #{$medium-up} {
			width: 33.33%;
		}
		@media #{$small-only} {
			& + & {
				margin: 0rem;
				margin-top: 1rem;
			}
		}
		width: 50%;
		// @media #{$xxlarge-up} {
		// 	width: 33.33%;
		// }
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
		&.trigger {
			transition: opacity $base-transition $base-cubic-bezier, transform $base-transition $base-cubic-bezier;
			opacity: 0;
			transform: translateY(100%);
		}
		&.trigger.active {
			opacity: 1;
			transform: translateY(0%);
		}
	}
	&__block {
		display: block;
		// border-radius: $base-border-radius;
		overflow: hidden;
		width: grid(2);
		flex-shrink: 0;
		@include min-(width, 2, 100);
		@media #{$medium-up} {
			height: grid(2);
			width: 100%;
		}
	}
	&__info {
		padding: 2rem;
		flex-grow: 1;
		width: 100%;
		dl {
			display: flex;
			opacity: 0.5;
			font-size: rem(14);
			&:first-child {
				opacity: 1;
				dd,
				dt {
					opacity: 1;
				}
			}
			dd {
				white-space: nowrap;
			}
			dt {
				width: 3rem;
				opacity: 0.5;
				&:empty {
					width: 0;
					& + dd {
						font-weight: bold;
					}
				}
			}
			& + dl {
				margin-top: 0.5rem;
			}
		}
	}
}
</style>
