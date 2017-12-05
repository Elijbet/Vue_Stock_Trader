import stocks from '../../data/stocks';

const state = {
	stocks: [] 
};

const mutations = {
	'SET_STOCKS'(state, stocks) {
		state.stocks = stocks; //set because we loaded them from the server, or because loaded the app
	}, //you can name payload whatever you want
	'RND_STOCKS' (state) { 

	}
};

const actions = {
	buyStock: ({commit}, order) => {
		commit();
	}, 
	initStocks: ({commit}) => {
		commit('SET_STOCKS', stocks); //stocks from data file
	},
	randomizeStocks: ({commit}) => {
		commit('RND_STOCKS');
	}
};

	const getters = {
		stocks: state => {
			return state.stocks;
		}
	};

	export default {
		state,
		mutations,
		actions,
		getters
	};