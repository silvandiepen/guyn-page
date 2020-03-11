<template>
	<div class="color-details">
		<div class="input-text">
			<input v-model="searchTerm" type="text" placeholder="Search color" />
		</div>
		<client-only placeholder="Loading...">
			<!-- <transition-group class="color-details__list" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave"> -->
			<transition-group class="color-details__list" tag="ul">
				<li
					v-for="(color, index) in colors"
					:key="color.name.toLowerCase()"
					v-trigger
					class="color-details__item"
					:data-index="index"
				>
					<div class="color-details__container">
						<div class="color-details__block" :class="`background--${color.name}`"></div>
						<div class="color-details__info">
							<h5>{{ color.name }}</h5>
							<dl>
								<dt>hex</dt>
								<dd>{{ color.value }}</dd>
							</dl>
							<dl>
								<dt>scss</dt>
								<dd>$guyn-{{ color.name }}</dd>
							</dl>
							<dl>
								<dt>css</dt>
								<dd>--guyn-{{ color.name }}</dd>
							</dl>
							<dl>
								<dt>less</dt>
								<dd>@guyn-{{ color.name }}</dd>
							</dl>
							<dl>
								<dt>js</dt>
								<dd>guyn.{{ color.name }}</dd>
							</dl>
						</div>
					</div>
				</li>
			</transition-group>
		</client-only>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
	</div>
</template>

<script>
export default {
	data: () => ({
		searchTerm: null
	}),
	computed: {
		colors() {
			return this.$store.getters['guyn/getColors'](this.searchTerm);
		}
	},
	methods: {
		// beforeEnter: function(el) {
		// 	// el.style.opacity = 0;
		// 	// el.style.height = 0;
		// },
		// enter: function(el, done) {
		// 	// var delay = el.dataset.index * 10;
		// 	// setTimeout(function() {
		// 	// 	Velocity(el, { opacity: 1, height: '1.6em' }, { complete: done });
		// 	// }, delay);
		// },
		// leave: function(el, done) {
		// 	// var delay = el.dataset.index * 10;
		// 	// setTimeout(function() {
		// 	// 	Velocity(el, { opacity: 0, height: 0 }, { complete: done });
		// 	// }, delay);
		// }
	}
};
</script>

<style lang="scss">
@import '~tools';

@include input-text-container('.input-text');

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
		box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
		width: 100%;
		display: flex;
		border-radius: 5px;
		overflow: hidden;
		@media #{$medium-up} {
			flex-direction: column;
		}
	}
	&__item {
		height: 400px;
		@media #{$small-only} {
			width: 100%;
		}
		@media #{$medium-up} {
			width: 33.33%;
			padding: 0.5rem;
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
		width: grid(1.5);
		flex-shrink: 0;
		@include min-(width, 2, 60);
		@media #{$medium-up} {
			height: grid(2);
			width: 100%;
		}
	}
	&__info {
		padding: 2rem;
		flex-grow: 1;
		width: 100%;
		@media #{$small-only} {
			padding: 1rem;
		}
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
