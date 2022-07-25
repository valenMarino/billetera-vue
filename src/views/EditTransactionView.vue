<template>
  <div class="container flex">
    <div>
 <div >
    <h5>Editar transaccion</h5>
    <h6>Identificador: <strong>{{this.getId}}</strong> </h6>
    </div>
    
    <div>
        <div class="card" style="width: 25rem; margin-left: 35%;margin-top: 20px;">
    <form action="#" method="post" style="padding:12px">
      <div class="card-body">
        <div class="input-group">
             <select class="form-control" v-model="transaction.crypto_code" required >
              <option value="" selected disabled>Seleccione cripto</option>
             <optgroup  v-for="(item, index) in cryptos" :key="item.code">
             <option :value="item.code">{{item.name}}</option>
             </optgroup>
             </select>
        </div>
       
        <div class="input-group">
        <input
          type="text"
          placeholder="Seleccione cantidad"
          v-model="transaction.crypto_amount"
          required
          style="margin-top:13px"
          class="form-control"
          @change="updateValue"
        />
        </div>
      <div class="input-group">
        <input
          type="text"
          placeholder="Seleccione monto"
          v-model="transaction.money"
          required
          style="margin-top:13px"
          class="form-control"
          disabled
        />
        </div>
        <div class="input-group"> 
          <input
          type="datetime"
          v-model="transaction.datetime"
          required
          style="margin-top:13px"
          class="form-control"
          />
        </div>
        <div class="input-group d-flex justify-content-center">
          <button style="margin-top:13px" v-on:click="editTransaction" type="button" class="btn btn-primary">
        <b>Actualizar</b>
      </button>
        </div>
        
      </div>
    </form>
  </div>
    </div>
    </div>
   
  </div>
</template>

<script>
import Crypto from '../commons/crypto.js'
import DBAPI from '../services/DBAPI.js'
import CurrencyService from '@/services/CurrencyService.js';
export default {
    name: "EditTransaction",
    data() {
        return {
        transaction: {
        user_id: this.$store.state.userLogged,
        action: "",
        crypto_code: "",
        crypto_amount: "" ,
        money: "",
        datetime: ""
      },
      cryptos:Crypto.getCryptos()
    };
    },
    computed: {
        getId() {
            return this.$route.query.id;
        },
    },
    mounted() {
      DBAPI.getTransactionById(this.getId)
      .then((response) => {
        this.transaction = response.data;
      })
      .catch(() => {
        this.$toast.error("Error al cargar los Datos");
      });
    },
    methods: {
        cancelar: function () {
            this.$router.push("/movements");
        },
        editTransaction: function(){
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
            DBAPI.updateTransaction(this.getId, this.transaction)
            .then(() => {
            this.$toast.success("Transaccion actualizada correctamente");
            })
            .catch(() => {
            this.$toast.error("Hubo un error al actualizar la transacción");
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
    components: {  }
};
</script>

<style scoped>

</style>
