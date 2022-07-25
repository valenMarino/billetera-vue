<template> 
<div class="card" style="width: 25rem;background-color:#154153;">
    <form action="#" method="post" style="padding:12px">
      <div class="card-body">
        <div class="input-group ">
             <select class="form-control custom-background" v-model="transaction.crypto_code" required >
              <option value="" selected disabled>Seleccione cripto</option>
             <optgroup  v-for="(item, index) in cryptos" :key="item.code">
             <option :value="item.code">{{item.name}}</option>
             </optgroup>
             </select>
        </div>
       
        <div class="input-group ">
        <input
          type="text"
          placeholder="Seleccione cantidad"
          v-model="transaction.crypto_amount"
          required
          style="margin-top:13px"
          class="form-control custom-background"
          @change="updateValue"
        />
        </div>
      <div class="input-group ">
        <input
          type="text"
          placeholder="Seleccione monto"
          v-model="transaction.money"
          required
          style="margin-top:13px"
          class="form-control custom-background"
          disabled
        />
        </div>
        <div class="input-group "> 
          <input
          type="datetime-local"
          v-model="transaction.datetime"
          required
          style="margin-top:13px"
          placeholder="Seleccione fecha"
          class="form-control custom-background"
          />
        </div>
        <div class="input-group d-flex justify-content-center">
          <button style="margin-top:13px;background-color:	#b65110;color: #d4e1e3;" v-on:click="makeTransaction" type="button" class="btn">
        <b>{{this.type == 'purchase' ? "Comprar" : "Vender"}}</b>
      </button>
        </div>
        
      </div>
    </form>
  </div>
  </template>
<script>
import Crypto from '../commons/crypto.js'
import DBAPI from '../services/DBAPI.js'
import CurrencyService from '@/services/CurrencyService.js';
export default{
    name:"Transaction",
    props:{
        type:String,
    },
    data(){
    return {
      transaction: {
        user_id: this.$store.state.userLogged,
        action: this.type,
        crypto_code: "",
        crypto_amount: "" ,
        money: "",
        datetime: ""
      },
      cryptos:Crypto.getCryptos()
    };
    },
    methods: {
         makeTransaction() {
            if(this.transaction.crypto_amount === "" 
            || !(parseFloat(this.transaction.crypto_amount))
            || this.transaction.crypto_amount <= 0
            || this.transaction.money === ""
            || !(parseFloat(this.transaction.money))
            || this.transaction.datetime === ""){
             this.$toast.error("Datos inválidos");
             return;
            }
            else{
            debugger;
            this.transaction.money =  this.transaction.money.replace(',', '.');
            this.transaction.crypto_amount = this.transaction.crypto_amount.replace(',', '.');
            DBAPI.post(this.transaction)
            .then(() => {
            this.$toast.success("Transaccion realizada con éxito");
            this.transaction.action = "";
            this.transaction.crypto_code = "";
            this.transaction.crypto_amount = "";
            this.transaction.money = "";
            this.transaction.datetime = "";
            })
            .catch(() => {
            this.$toast.error("Hubo un error al realizar la transacción");
            });
            }
        },
        updateValue(){
          if(this.transaction.crypto_amount != "" && this.transaction.crypto_code != "")
          {
            this.transaction.crypto_amount = this.transaction.crypto_amount.replace(',', '.');
            CurrencyService.getPrices(this.transaction.crypto_code)
            .then((respuesta) => {
              this.transaction.money = respuesta.data.totalBid * this.transaction.crypto_amount;
            })
            .catch(() => {
              this.$toast.error("Error al obtener valor de " + this.transaction.crypto_code);
            });
          }
        }
    },
      
} </script>
<style scoped>
.custom-background{
  background-color: #d4e1e3;
}
</style>