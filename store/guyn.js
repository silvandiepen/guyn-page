export const state = () => ({
	colors: []
});

export const mutations = {
	setColors(state, colors) {
		let colorArray = [];
		for (var key in colors) {
			var value = colors[key];
			colorArray.push({
				name: key,
				value: value
			});
		}
		state.colors = colorArray;
	}
};

export const getters = {
	getColors: (state) => (value) => {
		if (!value || value == null || value == '') return state.colors;
		else {
			return state.colors.filter((color) => {
				return color.name.toLowerCase().includes(value.toLowerCase());
			});
		}
	},
	getColor: (state) => (slug) => {
		return state.colors.find((color) => color == slug)[0];
	}
};

export const actions = {
	setColors({ state, commit }, colors) {
		if (state.colors.length > 0) return;
		commit('setColors', colors);
	}
};
