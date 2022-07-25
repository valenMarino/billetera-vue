<template>
    <div class="container">
    <table class="table">
      <thead style="background-color:#d8a531">
        <tr>
          <th >Criptomoneda</th>
          <th >Cantidad</th>
          <th >Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in accumulateData" :key="row._id">
          <td>{{ getCryptoName(row.crypto_code) }}</td>
          <td>{{ (row.crypto_amount).toFixed(2) }}</td>
          <td>$ {{ (row.crypto_amount * row.actualPrice).toFixed(4) }}</td>
        </tr>
        <tr style="background-color:#d4e1e3">
          <td>Total</td>
          <td>{{ (quantityTotal).toFixed(2) }}</td>
          <td>$ {{ (totalActual).toFixed(4) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DBAPI from "./../services/DBAPI.js"
import crypto from "../commons/crypto.js"
import CurrencyService from "@/services/CurrencyService.js";
export default {
  name: "tablaEstadoActual",
  data() {
    return {
      transacciones: null,
      valueCount: 0,
      accumulateData: [],
      bitcoin: [],
      etherium: [],
      dai:[],
      usdc:[],
      usdt:[],
      cryptoPrices:[]
    };
  },
  methods: {
     getCryptoName(code){
        return crypto.getCryptoName(code);
    },
  },
  computed: {
    totalActual() {
      let total = 0;
      this.accumulateData.forEach((row) => {
        debugger;
        total += row.actualPrice * row.crypto_amount;
      });

      this.$store.commit("setBalance", total);

      return total;
    },
    quantityTotal(){
      let quantity = 0;
      this.accumulateData.forEach((row) => {
        quantity += row.crypto_amount;
      });

      this.$store.commit("setBalanceQuantity", quantity);

      return quantity;
    },
  },
  mounted() {
    DBAPI.getTransactions(this.$store.state.userLogged)
      .then((response) => {

        this.transacciones = response.data;
        let customBalance = [
          {code:"btc",value:0,amount:0},
          {code:"eth",value:0,amount:0},
          {code:"dai",value:0,amount:0},
          {code:"usdc",value:0,amount:0},
          {code:"usdt",value:0,amount:0},
        ]

        this.transacciones.forEach((transaction) => {
          if (transaction.crypto_code === "btc") {
            if (transaction.action === "purchase") {
              customBalance[0].value += parseFloat(transaction.money);
              customBalance[0].amount += parseFloat(transaction.crypto_amount);
            } else {
              customBalance[0].value -= parseFloat(transaction.money);
              customBalance[0].amount -= parseFloat(transaction.crypto_amount);
            }
          }
          if (transaction.crypto_code === "eth") {
            if (transaction.action === "purchase") {
              customBalance[0].value += parseFloat(transaction.money);
              customBalance[1].amount += parseFloat(transaction.crypto_amount);
            } else {
              customBalance[0].value -= parseFloat(transaction.money);
              customBalance[1].amount -= parseFloat(transaction.crypto_amount);
            }
          }
          if (transaction.crypto_code === "dai") {
            if (transaction.action === "purchase") {
              customBalance[2].value += parseFloat(transaction.money);
              customBalance[2].amount += parseFloat(transaction.crypto_amount);
            } else {
              customBalance[2].value -= parseFloat(transaction.money);
              customBalance[2].amount -= parseFloat(transaction.crypto_amount);
            }
          }
          if (transaction.crypto_code === "usdc") {
            if (transaction.action === "purchase") {
              customBalance[3].value += parseFloat(transaction.money);
              customBalance[3].amount += parseFloat(transaction.crypto_amount);
            } else {
              customBalance[3].value -= parseFloat(transaction.money);
              customBalance[3].amount -= parseFloat(transaction.crypto_amount);
            }
          }
          if (transaction.crypto_code === "usdt") {
            if (transaction.action === "purchase") {
              customBalance[4].value += parseFloat(transaction.money);
              customBalance[4].amount += parseFloat(transaction.crypto_amount);
            } else {
              customBalance[4].value -= parseFloat(transaction.money);
              customBalance[4].amount -= parseFloat(transaction.crypto_amount);
            }
          }
        });


         if (customBalance[0].amount > 0) {
          CurrencyService.getPrices(customBalance[0].code )
            .then((respuesta) => {
              this.bitcoin = {
                crypto_amount: customBalance[0].amount,
                crypto_code: customBalance[0].code,
                money: customBalance[0].value,
                actualPrice: respuesta.data.totalBid,
              };
              this.accumulateData.push(this.bitcoin);
              this.valueCount += parseFloat(
                customBalance[0].amount * this.bitcoin.actualPrice
              );
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[0].code);
            });
        }else{
           CurrencyService.getPrices(customBalance[0].code )
            .then((respuesta) => {
              let temporaryObject={
                crypto_amount: customBalance[0].amount,
                crypto_code: customBalance[0].code,
                money: customBalance[0].value,
                actualPrice: respuesta.data.totalAsk,
              }
              this.cryptoPrices.push(temporaryObject);
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[0].code);
            });
        }

        if (customBalance[1].amount > 0) {
          CurrencyService.getPrices(customBalance[1].code )
            .then((respuesta) => {
              this.etherium = {
                crypto_amount: customBalance[1].amount,
                crypto_code: customBalance[1].code,
                money: customBalance[1].value,
                actualPrice: respuesta.data.totalBid,
              };
              this.accumulateData.push(this.etherium);
              this.valueCount += parseFloat(
                customBalance[1].amount * this.bitcoin.actualPrice
              );
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[1].code);
            });
        }else{
           CurrencyService.getPrices(customBalance[1].code )
            .then((respuesta) => {
              let temporaryObject={
                crypto_amount: customBalance[1].amount,
                crypto_code: customBalance[1].code,
                money: customBalance[1].value,
                actualPrice: respuesta.data.totalAsk,
              }
              this.cryptoPrices.push(temporaryObject);
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[1].code);
            });
        }

        
        if (customBalance[2].amount > 0) {
          CurrencyService.getPrices(customBalance[2].code )
            .then((respuesta) => {
              this.dai = {
                crypto_amount: customBalance[2].amount,
                crypto_code: customBalance[2].code,
                money: customBalance[2].value,
                actualPrice: respuesta.data.totalBid,
              };
              this.accumulateData.push(this.dai);
              this.valueCount += parseFloat(
                customBalance[2].amount * this.bitcoin.actualPrice
              );
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[2].code);
            });
        }else{
           CurrencyService.getPrices(customBalance[2].code )
            .then((respuesta) => {
              let temporaryObject={
                crypto_amount: customBalance[2].amount,
                crypto_code: customBalance[2].code,
                money: customBalance[2].value,
                actualPrice: respuesta.data.totalAsk,
              }
              this.cryptoPrices.push(temporaryObject);
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[2].code);
            });
        }

        if (customBalance[3].amount > 0) {
          CurrencyService.getPrices(customBalance[3].code )
            .then((respuesta) => {
              this.usdc = {
                crypto_amount: customBalance[3].amount,
                crypto_code: customBalance[3].code,
                money: customBalance[3].value,
                actualPrice: respuesta.data.totalBid,
              };
              this.accumulateData.push(this.usdc);
              this.valueCount += parseFloat(
                customBalance[3].amount * this.bitcoin.actualPrice
              );
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[3].code);
            });
        }else{
           CurrencyService.getPrices(customBalance[3].code )
            .then((respuesta) => {
              let temporaryObject={
                crypto_amount: customBalance[3].amount,
                crypto_code: customBalance[3].code,
                money: customBalance[3].value,
                actualPrice: respuesta.data.totalAsk,
              }
              this.cryptoPrices.push(temporaryObject);
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[3].code);
            });
        }

        if (customBalance[4].amount > 0) {
          CurrencyService.getPrices(customBalance[4].code )
            .then((respuesta) => {
              this.usdt = {
                crypto_amount: customBalance[4].amount,
                crypto_code: customBalance[4].code,
                money: customBalance[4].value,
                actualPrice: respuesta.data.totalBid,
              };
              this.accumulateData.push(this.usdt);
              this.valueCount += parseFloat(
                customBalance[4].amount * this.bitcoin.actualPrice
              );
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[4].code);
            });
        }else{
           CurrencyService.getPrices(customBalance[4].code )
            .then((respuesta) => {
              let temporaryObject={
                crypto_amount: customBalance[4].amount,
                crypto_code: customBalance[4].code,
                money: customBalance[4].value,
                actualPrice: respuesta.data.totalAsk,
              }
              this.cryptoPrices.push(temporaryObject);
            })
            .catch(() => {
              this.$toast.error("Error al obtener datos de " + customBalance[4].code);
            });
        }

        this.$store.commit("setInvestments", this.accumulateData);
        this.$store.commit("setCryptoPrices",this.cryptoPrices);
      })
      .catch((err) => {
        console.log(err)
        this.$toast.error("Hubo un problema al recuperar las transacciones");
      });
  },
};
</script>