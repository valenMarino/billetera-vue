<template>
     <div class="container">
    <table class="table">
      <thead style="background-color:#d8a531">
        <tr>
          <th>Criptomoneda</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in accumulateData" :key="row._id">
          <td class>{{ getCryptoName(row.crypto_code) }}</td>
          <td class v-if="row.actualPrice * row.crypto_amount - row.money >= 0" style="color:green">
            + $ {{ (row.actualPrice * row.crypto_amount - row.money ).toFixed(4)}}
          </td>
          <td class v-else="" style="color:red">
            + $ {{ (row.actualPrice * row.crypto_amount - row.money ).toFixed(4)}}
          </td>
        </tr>
        <tr style="background-color:#d4e1e3">
          <td>Total</td>
          <td v-if="getTotal >= 0" style="color:green">{{this.total}}</td>
          <td v-else="" style="color:red">{{this.total}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import crypto from "../commons/crypto.js"
export default {
  name: "Investments",
  data() {
    return {
        accumulateData:null,
        total:0
    };
  },
  methods: {
     getCryptoName(code){
        return crypto.getCryptoName(code);
    },
  },
  mounted() {
    this.accumulateData = this.$store.state.investments;
     for (var i = 0; i < this.$store.state.cryptoPrices.length; i++) {
          this.accumulateData.push(this.$store.state.cryptoPrices[i])
        }
    let total = 0;
    this.accumulateData.forEach((row) => {
        total += row.actualPrice * row.crypto_amount;
      });
      this.total = total;
  },
  computed:{
  }
  }
</script>

<style></style>