<template>
	<main class="page page--brands background--white">
		<!-- <div class="brandlist" ref="brandList"> -->
		<!-- <div v-if="brands" class="brandlist__list"> -->
		<!-- <ul v-if="brands" class="brandlist__list" :style="`transform: translateY(-${scrolled}%)`"> -->
		<!-- <li v-for="(brand, idx) in brands" :key="idx" class="brandlist__item">{{ brand.title}}</li> -->
		<!-- </ul> -->
		<!-- </div> -->
		<section class="brands-intro">
			<div class="row center">
				<div class="column small-full medium-half">
					<h3>Brands</h3>
					<div class="brands__toolbar">
						<div class="brands__search input-search">
							<input v-model="searchTerm" type="search" placeholder="Search by brand" />
						</div>
						<div v-if="filteredBrands.length == brands.length" class="brands__total">
							<strong>{{ filteredBrands.length }}</strong> total brands
						</div>
						<div v-else class="brands__total">
							Showing
							<strong>{{ filteredBrands.length }}</strong>
							out of {{ brands.length }} total
						</div>
						<div class="brands__characters">
							<button
								v-for="(char, idl) in alphabet"
								:key="idl"
								class="brands__character"
								:class="{ 'brands__character--active': char.character == startCharacter }"
								:data-total="char.total"
								@click="setCharacter(char.character)"
							>{{ char.character }}</button>
						</div>
					</div>
					<button class="button button--default" @click="showModal = !showModal">
						<span class="button__text">Add brand</span>
					</button>
					<a :href="`data:${jsonData}`" download="brands.json" class="button button--default">
						<span class="button__text">
							Download
							<span v-if="filteredBrands.length == brands.length">all</span>
							<span v-else>{{ filteredBrands.length }}</span>
						</span>
					</a>

					<div class="brands__add modal" :class="{ 'modal--active': showModal }">
						<div class="modal__background" @click="showModal = false"></div>
						<div class="modal__content">
							<div class="content">
								<h4>Add brand</h4>
								<p>
									Brands you add here will only be added temporary and to your local machine. If you actually want to add brands,
									please make a Pull Request on this
									<a
										href="https://github.com/silvandiepen/guyn"
									>repository</a>
								</p>
								<hr />
								<div class="input-text">
									<input v-model="add.title" type="text" />
									<label>Brand name</label>
								</div>
								<div class="input-text">
									<button @click="addColor">Add</button>
									<input v-model="currentAddColor" type="text" />
									<label>Colors</label>
								</div>
								<ul v-if="add.colors.length > 0" class="add__colors">
									<li v-for="(color, idk) in add.colors" :key="idk" class="add__color">
										<span class="add__color-dot" :style="`background-color: ${color}`"></span>
										<span class="add__color-code">{{ color }}</span>
										<span class="add__color-remove" @click="removeColor(idk)">&#10005;</span>
									</li>
								</ul>
								<div class="input-text">
									<input v-model="add.meta.url" type="text" />
									<label>Website</label>
								</div>
								<div class="input-text">
									<input v-model="add.meta.source" type="text" />
									<label>Styleguide</label>
								</div>
								<hr />
								<button class="button button--default" @click="addBrand">Add Brand</button>
							</div>
						</div>
					</div>

					<section class="brands">
						<ul v-if="brands" class="brands__list">
							<li v-for="(brand, idx) in filteredBrands" :key="idx" class="brands__item">
								<header class="brands__header">
									<h4 class="brands__title">{{ brand.title }}</h4>
									<span class="brands__maincolor-code" @click="doCopy(brand.colors[0])">{{ brand.colors[0] }}</span>
								</header>
								<div class="brands__maincolor" :style="`background-color: ${brand.colors[0]}`"></div>
								<div class="brands__colors">
									<span
										v-for="(color, idc) in brand.colors"
										:key="idc"
										class="brands__color"
										:class="{ 'brands__color--copied': color == copiedColor }"
										:style="`background-color: ${color}`"
										@click="doCopy(color)"
									>
										<span class="copy__text">copy {{ color }}</span>
										<span class="copy__copied">{{ color }} is copied</span>
									</span>
								</div>
							</li>
						</ul>
					</section>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import { orderBy } from 'lodash';
import brands from '~/static/brands.json';

export default {
	data: () => ({
		scrolled: {
			percentage: 0,
			sideHeight: 0
		},
		brands: brands.brands,
		searchTerm: '',
		startCharacter: '',
		copiedColor: '',
		currentAddColor: '',
		showModal: false,
		add: {
			title: '',
			colors: [],
			meta: {
				source: '',
				url: ''
			}
		}
	}),
	computed: {
		jsonData() {
			return (
				'text/json;charset=utf-8,' +
				encodeURIComponent(
					JSON.stringify({
						brands: this.filteredBrands
					})
				)
			);
		},
		alphabet() {
			if (!this.brands || this.brands.length < 1) return [];
			let characters = [];
			this.brands.forEach((value) => {
				let char = value.title.charAt(0).toLowerCase();
				if (
					!characters.find((item) => {
						return item.character == char;
					})
				) {
					characters.push({
						character: char,
						total: this.filterByCharacter(this.brands, char).length
					});
				}
			});
			return characters;
		},
		filteredBrands() {
			if (this.searchTerm == '' && this.startCharacter == '')
				return this.brands;
			else return this.filterByCharacter(this.filterBySearchterm(this.brands));
		}
	},
	methods: {
		setScrolled() {
			let height = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			);

			this.scrolled.percentage =
				Math.round((window.scrollY / (height - window.innerHeight)) * 10000) /
				100;

			console.log(this.scrolled.sideHeight);

			// this.$refs.brandList.scrollTop =
			// 	(this.$refs.brandList.getBoundingClientRect().height / 100) *
			// 	this.scrolled;

			// // console.log(this.$refs.brandList);
		},
		filterByCharacter(values, character = null) {
			if (this.startCharacter == '') return values;
			else if (character)
				return values.filter((value) => {
					return value.title.toLowerCase().charAt(0) == character;
				});
			else
				return values.filter((value) => {
					return value.title.toLowerCase().charAt(0) == this.startCharacter;
				});
		},
		filterBySearchterm(values) {
			if (this.searchTerm == '') return values;
			return values.filter((value) => {
				return value.title
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase());
			});
		},
		setCharacter(char) {
			if (this.startCharacter == char) this.startCharacter = '';
			else this.startCharacter = char;
		},
		doCopy(color) {
			const copyColor = color;
			this.copiedColor = copyColor;
			this.$copyText(color).then(function() {});
		},
		addColor() {
			if (this.currentAddColor == '') return;
			this.add.colors.push(this.currentAddColor);
			this.currentAddColor = '';
		},
		removeColor(idx) {
			this.add.colors.splice(idx, 1);
		},
		addBrand() {
			if (this.add.title == '') {
				alert('no title given');
				return;
			}
			if (this.add.colors.length < 1) {
				alert('no colors given');
				return;
			}
			this.brands.push(this.add);
			this.brands = orderBy(this.brands, 'title', 'asc');
		}
	},
	mounted() {
		window.addEventListener('scroll', () => {
			this.setScrolled();
		});
		console.log(
			this.$refs.brandList,
			this.$refs.brandList.getBoundingClientRect()
		);
		this.scrolled.sideHeight = this.$refs.brandList.getBoundingClientRect().height;
		window.addEventListener('resize', () => {
			this.scrolled.sideHeight = this.$refs.brandList.getBoundingClientRect().height;
		});
	}
};
</script>

<style lang="scss">
@import '~tools';

@include input-text-container('.input-search');
@include input-text-container('.input-text');
.input-search input::placeholder {
	color: white;
	opacity: 1;
}
.input-search {
	font-size: 1.5rem;
}

.page--brands {
	background-color: color(IceLight);
}
.brands-intro {
	padding: grid(4 0 1);
	@media #{$small-only} {
		padding: $mobile-padding;
		padding-top: grid(4);
	}
}
.brands {
	&__list {
		display: block;
		padding: grid(1 0 2);
	}
	&__item {
		position: relative;
		background-color: color(_White);

		display: block;
		& + & {
			margin-top: 1rem;
		}
		&:hover {
			z-index: 2;
			.brands__colors {
				transform: scale(1, 1);
			}
		}
	}
	&__header {
		padding: 2rem;
		display: flex;
		justify-content: space-between;
	}
	&__title {
	}
	&__maincolor-code {
		opacity: 0.5;
		line-height: 2rem;
	}
	&__colors {
		display: flex;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		transform-origin: 100% 100%;
		transform: scale(1, 0.25);
		transition: transform $base-transition $base-cubic-bezier;
	}
	&__color {
		width: 100%;
		height: 1.5rem;
		display: block;
		position: relative;
		span {
			font-size: 0.75rem;
			margin: auto;
			left: 50%;
			top: calc(100% + 0.25rem);
			position: absolute;
			white-space: nowrap;
			padding: 0.5rem;
			background-color: color(_Black);
			color: color(_White);
			transform: translateX(-50%) scale(0);
			border-radius: 3px;
			transition: transform $base-transition $base-cubic-bezier;
			&:before {
				content: '';
				width: 0.5rem;
				height: 0.5rem;
				background-color: color(_Black);
				border-radius: 0 2px 0 0;
				position: absolute;
				transform: translate(-50%, -50%) rotate(-45deg);
				left: 50%;
				top: 0;
			}
		}
		&:hover {
			span:first-child {
				transform: translateX(-50%) scale(1);
			}
		}
		&--copied {
			outline: 2px solid color(_Black);
			z-index: 2;
			&:hover {
				span:first-child {
					transform: translateX(-50%) scale(0);
				}
				span:nth-child(2) {
					transform: translateX(-50%) scale(1);
				}
			}
		}
	}
	&__toolbar {
		display: flex;
		flex-wrap: wrap;
	}
	&__search {
		--input-text-input-border: #{color(_Black)};
		width: 100%;
		background-color: color(_Black);
		color: color(White);
	}
	&__total {
		padding: 1rem;
		width: 50%;
	}
	&__characters {
		display: flex;
		width: 50%;
		flex-wrap: wrap;
		padding: 0.75rem;
	}
	&__character {
		display: block;
		border: none;

		padding: 0.25rem 0.5rem;
		background: none;
		font-size: inherit;
		position: relative;
		text-transform: uppercase;
		font-weight: bold;
		&:focus {
			outline: 2px solid color(_Black);
		}
		&--active,
		&--active:focus {
			background-color: color(_Black);
			color: color(_White);
		}
		&::before {
			content: attr(data-total);
			position: absolute;
			font-size: 0.6rem;
			left: 100%;
			bottom: 100%;
			background-color: color(_Black);
			line-height: 1.5rem;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			color: white;
			transition: all $base-transition $base-cubic-bezier;
			text-align: center;
			transform: translate(-50%, 50%) scale(0);
		}
		&:hover::before {
			transform: translate(-50%, 50%) scale(1);
		}
	}
	&__add {
		form {
			padding-top: grid(1);
		}
	}
}

.add {
	&__colors {
		display: flex;
		padding: 1rem;
	}
	&__color {
		padding: 0.5rem;
		background-color: color(White);
		border-radius: $base-border-radius;

		& + & {
			margin-left: 0.5rem;
		}
		&-dot {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			line-height: 1rem;
			border-radius: 50%;
		}
		&-code {
			line-height: 1rem;
		}
		&-remove {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			opacity: 0.5;
			font-size: 0.8rem;
			transition: opacity $base-transition $base-cubic-bezier;
			&:hover {
				opacity: 1;
			}
		}
	}
}

.brandlist {
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	border: 1px solid red;
	overflow: scroll;
	&__list {
		display: flex;
		flex-direction: column;
		padding: 2rem;
	}
	&__item {
		font-size: 0.75rem;
		padding: 0.25rem;
		color: color(IceDark);
		&:hover {
			opacity: 1;
		}
	}
}
</style>
