export const state = () => ({
	colors: []
});

export const mutations = {
	setColors(state, colors) {
		state.colors = colors;
	}
};

export const getters = {
	getColors: (state) => {
		return state.colors;
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
