<template>
	<div>
		<app-stock v-for="stock in stocks" :stock="stock"></app-stock> <!-- send variable stock in stocks with props to stock component -->
	</div>
</template>

<script>

import Stock from './Stock.vue';

	export default {
		components: {
			appStock: Stock
		},
		computed: {
			stocks(){
				return this.$store.getters.stocks; //state.stocks from stocks.js
			}
		}
	}
</script>