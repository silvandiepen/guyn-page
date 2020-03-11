<template>
	<main class="page page--home">
		<section ref="intro" class="color-intro">
			<GuynLogo></GuynLogo>
		</section>
		<section class="colors background--white  default-section">
			<div class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="01">
						Colors
					</h3>
					<ColorOverview></ColorOverview>
				</div>
			</div>
		</section>
		<section class="install background--darkdark  default-section">
			<div v-parallax class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="02">
						About
					</h3>
					<p>
						Guyn is made as a set to get some styling through a whole system.
						From websites, till the code editor, just to get it all in line.
					</p>
					<p>Guyn is the Armenian word for color.</p>
				</div>
			</div>
		</section>
		<section class="install background--dark default-section">
			<div v-parallax class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="03">
						Install
					</h3>
					<p>
						The colorset of Guyn is usable in many different ways. Just the
						colorset is a npm package which includes all kinds of formats like
						json, scss (map), css (custom properties), less (list) and a
						includable js file.
					</p>
					<code>
						<pre>npm install guyn</pre>
					</code>
				</div>
			</div>
		</section>
		<section class="usage background--darklight default-section">
			<div v-parallax class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="04">
						Usage
					</h3>
					<h4>In code</h4>
					<div class="row">
						<div class="column small-full medium-half">
							<p>
								The colorset can be used for many purposes. The npm package
								includes a css, json, scss, less and javascript file.
							</p>
						</div>
						<div class="column small-full medium-half">
							<details>
								<summary>Json</summary>
								<!-- {{ GuynColorsLess }} -->
							</details>
						</div>
					</div>
					<h4>As a theme</h4>
					<div class="row">
						<div class="column small-full medium-half">
							<p>
								There are different themes made with this colorset.
							</p>
						</div>
						<div class="column small-full medium-half">
							<ul>
								<li>VSCode theme</li>
								<li>
									<a href="/themes/guyn-iterm.zip" download>iTerm theme</a>
								</li>
								<li>Atom theme</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="colors background--white default-section">
			<div class="row center">
				<div class="column small-full xlarge-two-third">
					<h3 data-number="05">
						Color details
					</h3>
					<ColorDetails></ColorDetails>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import ColorOverview from '~/components/elements/color-overview.vue';
import ColorDetails from '~/components/elements/color-details.vue';
import GuynLogo from '~/components/elements/guyn-logo.vue';
import GuynColors from '../node_modules/guyn/guyn/json/guyn.json';

export default {
	components: {
		GuynLogo,
		ColorOverview,
		ColorDetails
	},
	data() {
		return {
			offTop: 0,
			files: {
				// json: GuynColorsJson,
				// scss: GuynColorsScss,
				// css: GuynColorsCss,
				// less: GuynColorsLess,
				// js: GuynColorsJs
			}
		};
	},
	created() {
		this.$store.dispatch('guyn/setColors', GuynColors);
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
			_this.offTopPercentage =
				(window.innerHeight / 100) * (window.scrollY / 100);

			_this.$refs.intro.style.setProperty(
				'--scroll-top-percentage',
				this.offTopPercentage + '%'
			);
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

.color-intro {
	height: 100vh;
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
.default-section {
	padding: grid(3 0);
	@media #{$small-only} {
		padding: 4rem 2rem;
	}
}
section {
	h3[data-number] {
		opacity: 0.5;
		font-size: 1rem;
		position: absolute;
		left: 0;
		padding: 0 grid(1);
		@media #{$small-only} {
			position: relative;
			padding: 1rem 0;
		}
		&:before {
			content: attr(data-number) '.';
			font-weight: normal;
		}
		& + * {
			margin: 0;
		}
	}
}
</style>
