<template>
	<main class="page page--home">
		<section ref="intro" class="intro">
			<GuynLogo></GuynLogo>
		</section>
		<section class="colors">
			<div class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="01">
						Colors
					</h3>
					<ColorOverview></ColorOverview>
				</div>
			</div>
		</section>
		<section class="install background--skybluedark">
			<div v-parallax class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="02">
						About
					</h3>
					<p>
						Guyn is made as a set to get some styling through a whole system. From websites, till the code editor, just to get
						it all in line.
					</p>
					<p>Guyn is the Armenian word for color.</p>
				</div>
			</div>
		</section>
		<section class="install background--orange">
			<div v-parallax class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="03">
						Installation
					</h3>
					<p>
						The colorset of Guyn is usable in many different ways. Just the colorset is a npm package which includes all kinds
						of formats like json, scss (map), css (custom properties), less (list) and a includable js file.
					</p>
					<code><pre>npm install guyn</pre></code>
				</div>
			</div>
		</section>
		<section class="install background--yellow">
			<div v-parallax class="row center">
				<div class="column small-full medium-two-third">
					<h3 data-number="04">
						Usage
					</h3>
					<h4>In code</h4>
					<div class="row">
						<div class="column small-full medium-half">
							<p>
								The colorset can be used for many purposes. The npm package includes a css, json, scss, less and javascript
								file.
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
								<li>iTerm theme</li>
								<li>Atom theme</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import ColorOverview from '~/components/elements/color-overview.vue';
import GuynLogo from '~/components/elements/guyn-logo.vue';

// import GuynColorsJson from '!!raw-loader!../node_modules/guyn/json/guyn.json';
// import GuynColorsScss from '!!raw-loader!../node_modules/guyn/scss/guyn.scss';
// import GuynColorsCss from '!!raw-loader!../node_modules/guyn/css/guyn.css';
// import GuynColorsLess from '!!raw-loader!../node_modules/guyn/less/guyn.less';
// import GuynColorsJs from '!!raw-loader!../node_modules/guyn/js/guyn.js';
export default {
	components: {
		GuynLogo,
		ColorOverview
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
.colors {
	padding: grid(3 0);
	background: white;
	@media #{$small-only} {
		padding: 2rem;
	}
}
.install {
	padding: grid(3 0);
	@media #{$small-only} {
		padding: 2rem;
	}
}
section {
	@media #{$small-only} {
		padding: 2rem;
	}
	h3[data-number] {
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
