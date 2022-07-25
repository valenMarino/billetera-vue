<template>
  <div class="container flex">
    <div>
 <div >
    <h5>Ver transaccion</h5>
    <h6>Identificador: <strong>{{this.getId}}</strong> </h6>
    </div>
    
    <div>
        <div class="card" style="width: 25rem; margin-left: 35%;margin-top: 20px;">
    <form action="#" method="post" style="padding:12px">
      <div class="card-body">
        <div class="input-group">
             <select class="form-control" v-model="transaction.crypto_code" required disabled>
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
          disabled
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
          disabled
          />
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
export default {
    name: "ViewTransaction",
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
        }
    },
    components: {  }
};
</script>

<style scoped>

</style>
