<template>
<div class="container">
  <div class="row d-flex justify-content-around" style="margin-top:40px;">
    <div class="col-md" style="max-width:400px">
        <TransactionsComponent :type="transactionPurchase" />
    </div>
     <div class="col-md" style="max-width:400px">
        <TransactionsComponent :type="transactionSale"/>
    </div>
  </div>
   
</div>
    <div style="margin-top:30px">
      <button v-on:click="movements()" type="submit" class="btn btn-lg" style="background-color:#b65110;color: #d4e1e3;margin-left: 1.5%;">
        <b>Ver todos los movimientos</b>
      </button>
    </div>
</template>

<script>
import TransactionsComponent from "@/components/TransactionsComponent.vue";

export default {
  name: "TransactionsView",
  components: { TransactionsComponent },
  data() {
    return {
      transactionPurchase:'purchase',
      transactionSale:'sale'
    };
  },
  methods: {
    movements: function() {
      this.$router.push("/movements");
    },
  },
};</script>

<style></style>