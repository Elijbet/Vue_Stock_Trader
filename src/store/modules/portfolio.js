const state = {
	funds: 10000,
	stocks: [] //stocks in the portfolio
}

const mutations = {
	'BUY_STOCK'(state, {stockId, quantity, stockPrice}) { //properties from the order in the stock component, sent from stocks to stock with a prop (individual stock)
		const record = state.stocks.find(element => element.id == stockId) //find if there is stock with this id in my portfolio record
		if (record){
			record.quantity += quantity; //if there is record, add new quantity to existing
		} else {
			state.stocks.push({ //if there is no record, add new stocks to the state.stocks of my portfolio
				id: stockId,
				quantity: quantity
			});
		}
		state.funds -= stockPrice * quantity;
	}, 
	'SELL_STOCK'(state, {stockId, quantity, stockPrice}) {
		const record = state.stocks.find(element => element.id == stockId);
		if (record.quanity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}
		state.funds += stockPrice * quantity;
	},
	'SET_PORTFOLIO' (state, portfolio) {
		state.funds = portfolio.funds;
		state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
	}
};

const actions = {
	sellStock({commit}, order) { //buyStock function remains in the stock.vue; sellStock function is in portfolio.vue
		commit('SELL_STOCK', order);
	}
};

const getters = {
	stockPortfolio(state, getters) { //getters for stock.js module
		return state.stocks.map(stock => { //take stocks in my portfolio and map onto them extra properties we're missing now from overall state.stocks
			const record = getters.stocks.find(element => element.id == stock.id);
			return { //take overall stocks and find there the stocks in my portfolio 
				id: stock.id, // for state.stocks in portfolio define new properties and fill in with existing id and quantity and newly pulled properties from overall stocks - name and price
				quantity: stock.quantity,
				name: record.name, 
				price: record.price
			}
		});
	},
	funds (state) {
		return state.funds;
	}
};

export default {
	state, 
	mutations,
	actions, 
	getters
}