<template>
	<div class="col-sm-6 col-md-4">
      <div class="panel panel-info">
          <div class="panel-heading">
              <h3 class="panel-title">
                  {{ stock.name }}
                  <small>(PRICE: {{ stock.price }} | QUANTITY: {{ stock.quantity }})</small>
              </h3>
          </div>
          <div class="panel-body">
              <div class="pull-left">
                  <input
                          type="number"
                          class="form-control"
                          placeholder="Quantity"
                          v-model="quantity"
                          :class="{danger: insufficientQuantity}"
                  >
              </div>
              <div class="pull-right">
                  <button
                          class="btn btn-success"
                          @click="sellStock"
                          :disabled="insufficientQuantity || quantity <= 0" 
                  >{{ insufficientQuantity ? 'Not enough' : 'Sell'}}</button>
              </div>
          </div>
      </div>
  </div>
</template>

<style>
  .danger {
    border: 1px solid red;
  }
</style>

<script>
	import {mapActions} from 'vuex';

	export default {
			props: ['stock'], //individual stock from state.stocks - state of my portfolio stocks - sent here with prop
			data(){
				return {
					quantity: 0
				}		
			},
      computed: {
        insufficientQuantity(){
          return this.quantity > this.stock.quantity;
        }
      },
			methods: {
				...mapActions({
						placeSellOrder: 'sellStock'
					}),
				sellStock(){
					const order = {
						stockId: this.stock.id,
						stockPrice: this.stock.price,
						quantity: this.quantity
					};
					this.placeSellOrder(order); //dispatch action\
					this.quantity = 0;
				}
			}
		}
</script>
