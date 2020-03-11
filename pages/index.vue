<template>
	<main class="page page--home">
		<section ref="intro" class="intro">
			<GuynLogo></GuynLogo>
			<p><strong>Guyn</strong>, the pretty dev toolset</p>
		</section>
		<section class="products" ref="products">
			<div class="products__product">
				<h3 class="products__title">
					Color
				</h3>
			</div>
			<div class="products__product">
				<h3 class="products__title">
					Design System
				</h3>
			</div>
			<div class="products__product">
				<h3 class="products__title">
					Convert
				</h3>
			</div>
			<div class="products__product">
				<h3 class="products__title">
					Code
				</h3>
			</div>
			<div class="products__product">
				<h3 class="products__title">
					Icon
				</h3>
			</div>
		</section>
	</main>
</template>

<script>
import GuynLogo from '~/components/elements/guyn-logo.vue';

export default {
	components: {
		GuynLogo
	},
	data() {
		return {
			offTop: 0
		};
	},
	mounted() {
		this.setTop();
		window.addEventListener('scroll', () => {
			this.setTop();
		});
	},
	methods: {
		setTop() {
			this.offTop = window.scrollY;
			this.$refs.products.style.setProperty('--scroll-top', this.offTop);
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

@function randomBetween($from, $till) {
	@return ($till - $from) * (random(($till - $from)) / ($till - $from)) + $from;
}

.intro {
	height: 80vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: white;
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
		opacity: calc(1 / var(--scroll-top-percentage));
	}
}
.products {
	background-color: white;
	display: flex;

	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	&__title {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}
	&__product {
		display: block;
		width: 40vw;
		height: 40vw;
		position: relative;
		&::before {
			animation: transform 3s infinite;
			content: '';
			width: 100%;
			height: 100%;
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			opacity: 0.5;
			mix-blend-mode: multiply;
		}
		@for $i from 1 through 10 {
			&:nth-child(#{$i})::before {
				animation-duration: #{randomBetween(10, 30)}s;
			}
		}
		&:nth-child(1) {
			transform: translateY(calc(-15% * (var(--scroll-top) / 400)));
			&::before {
				transform: translate(-40%, -50%);
				background-color: var(--color-red);
			}
		}
		&:nth-child(2) {
			transform: translateY(calc(-15% * (var(--scroll-top) / 300)));
			&::before {
				transform: translate(-40%, -60%);
				// transform: translate(-40%, calc(-20% * (var(--scroll-top) / 800)));
				background-color: var(--color-yellow);
			}
		}
		&:nth-child(3) {
			transform: translateY(calc(-15% * (var(--scroll-top) / 100)));
			&::before {
				transform: translate(-30%, -40%);
				// transform: translate(-30%, calc(-10% * (var(--scroll-top) / 700)));
				background-color: var(--color-green);
			}
		}
		&:nth-child(4) {
			transform: translateY(calc(-15% * (var(--scroll-top) / 500)));
			&::before {
				transform: translate(-50%, -30%);
				// transform: translate(-50%, calc(-25% * (var(--scroll-top) / 500)));
				background-color: var(--color-blue);
			}
		}
		&:nth-child(5) {
			transform: translateY(calc(-15% * (var(--scroll-top) / 200)));
			&::before {
				transform: translate(-20%, -70%);
				// transform: translate(-20%, calc(-15% * (var(--scroll-top) / 400)));
				background-color: var(--color-purple);
			}
		}
	}
}
@keyframes transform {
	0%,
	100% {
		border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
	}
	20% {
		border-radius: 37% 63% 51% 49% / 37% 65% 35% 63%;
	}
	40% {
		border-radius: 36% 64% 64% 36% / 64% 48% 52% 36%;
	}
	60% {
		border-radius: 37% 63% 51% 49% / 30% 30% 70% 70%;
	}
	80% {
		border-radius: 40% 60% 42% 58% / 41% 51% 49% 59%;
	}
}
</style>
