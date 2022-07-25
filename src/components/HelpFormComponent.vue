<template>
  <div class="container">
    <div class="card text-center" style="width: 25rem;background-color:#154153;margin-left: 33%; padding: 20px;margin-top: 30px;color: #d4e1e3;">
        <span v-if="this.action ==='purchase'">Sugerencias de compra </span>
        <span v-else>Sugerencias de venta</span>
    <div class="input-group" style="margin-top:20px">
        <select style="background-color: #d4e1e3;" class="form-control" required v-model="cryptoSelected" >
            <option value="" selected disabled>Seleccione cripto</option>
            <optgroup  v-for="(item, index) in cryptos" :key="item.code">
            <option :value="item.code">{{item.name}}</option>
            </optgroup>
        </select>
    </div>
    <div class="input-group" style="margin-top:20px">
        <input v-if="this.action ==='purchase'"
        type="button"
        class="btn "
        value="Obtener sugerencia de compra"
        v-on:click="getData()"
        style="background-color:	#b65110;color: #d4e1e3;width: 100%;"
        />
        <input v-else=""
        type="button"
        class="btn "
        value="Obtener sugerencia de venta"
        v-on:click="getData()"
        style="background-color:	#b65110;color: #d4e1e3;width: 100%;"
        />
    </div>
    <div class="input-group " style="margin-top:20px">
        <span v-if="this.action ==='purchase'">Mejor lugar para comprar: </span>
        <span v-else>Mejor lugar para vender: </span>
        <span style="margin-left:10px;color:white;text-transform: uppercase;font-weight: 900;">{{ bestExchange }}</span>
    </div>
    </div>
  </div>
</template>

<script>
import CurrencyService from "@/services/CurrencyService.js";
import crypto from "@/commons/crypto.js";

export default {
  name: "HelpForm",
  props:{
    action:String
  },
  data() {
    return {
      cryptos:crypto.getCryptos(),
      cryptoSelected:"",
      bestExchange: "",
      infoCriptomonedaTotalBid: "",
      infoCriptomonedaTotalAsk: "",
      maxValue: 999999999,
      minValue: 0,
      daiExchanges: ["belo", "bitex","bitso","buenbit","decrypto"],
      usdcExchanges: ["belo", "bitex","copter","domitai","ftx"],
      bitcoinExchanges: ["argenbtc","bitex","bitmonedero","bitso","buda"],
      ethExchanges: ["buda","buenbit","copter","criptofacil","cryptomkt",],
      usdtExchanges: ["belo","bitex","criptofacil","decrypto","domitai",]
    };
  },
  methods: {
    getData() {
      if (this.cryptoSelected === "btc") {
        this.cleanValues();
        for (var i = 0; i < this.bitcoinExchanges.length; i++) {
          this.getPrices(this.bitcoinExchanges[i], "btc");
        }
      }
      if (this.cryptoSelected === "eth") {
        this.cleanValues();
        for (var i = 0; i < this.ethExchanges.length; i++) {
          this.getPrices(this.ethExchanges[i], "eth");
        }
      }
      if (this.cryptoSelected === "dai") {
        this.cleanValues();
        for (var i = 0; i < this.daiExchanges.length; i++) {
          this.getPrices(this.daiExchanges[i], "dai");
        }
      }
      if (this.cryptoSelected === "usdc") {
        this.cleanValues();
        for (var i = 0; i < this.usdcExchanges.length; i++) {
          this.getPrices(this.usdcExchanges[i], "usdc");
        }
      }
       if (this.cryptoSelected === "usdt") {
        this.cleanValues();
        for (var i = 0; i < this.usdtExchanges.length; i++) {
          this.getPrices(this.usdtExchanges[i], "usdt");
        }
      }
    },

    getPrices(exchanges, coin) {
      CurrencyService.getExchangeValues(exchanges, coin)
        .then((response) => {
        if(this.action === "purchase"){
            this.infoCriptomonedaTotalAsk = response.data.totalAsk;
            if (this.infoCriptomonedaTotalAsk < this.maxValue) {
            this.maxValue = this.infoCriptomonedaTotalAsk;
            this.bestExchange = exchanges;
          }
        }else{
            this.infoCriptomonedaTotalBid = response.data.totalBid;
            if (this.infoCriptomonedaTotalBid > this.minValue) {
            this.minValue = this.infoCriptomonedaTotalBid;
            this.bestExchange = exchanges;
          }
        }
        })
        .catch(() => {
          this.$toast.warning("Atención, hubo problemas en consultar algunos exchanges");
        });
    },
    cleanValues() {
      this.maxValue = 999999999;
      this.minValue = 0;
    },
  },
};
</script>
