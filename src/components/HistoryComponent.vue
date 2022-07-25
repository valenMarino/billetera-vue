<template>
    <div class="container" style="height: 500px; overflow-y: scroll;">
        <table class="table ">
        <thead>
          <tr style="background-color:#d8a531">
            <th >Fecha</th>
            <th >Acción</th>
            <th >Criptomoneda</th>
            <th >Cantidad</th>
            <th >Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaccion in transacciones"
            :key="transaccion._id"
            @click="selectedClick(transaccion)"
            :class="{ selectedRow: selectedTransaccionId === transaccion._id }">
            <td >{{ transaccion.datetime }}</td>
            <td v-if="transaccion.action == 'purchase'" style="color:red">{{ actionName(transaccion.action) }}</td>
            <td v-else="" style="color:green">{{ actionName(transaccion.action) }}</td>
            <td >{{ getCryptoName(transaccion.crypto_code) }}</td>
            <td >{{ transaccion.crypto_amount }}</td>
            <td >${{ transaccion.money }}</td>
          </tr>
        </tbody>
      </table>
    </div>

<div class="row d-flex justify-content-md-evenly" style="max-width:1530px">
 <router-link style="width: 130px;"
      :to="{ name: 'TransactionView', query: { id: selectedTransaccionId } }"
    >
      <button
        :disabled="selectedTransaccionId === null"
        :class="{ desabilitado: selectedTransaccionId === null }"
        class="btn"
        style="background-color:	#b65110;color: #d4e1e3; width: 130px;"
      >
        <b>Ver</b>
      </button>
    </router-link>

   <router-link style="width: 130px;"
      :to="{ name: 'EditTransaction', query: { id: selectedTransaccionId } }"
    >
      <button
        :disabled="selectedTransaccionId === null"
        :class="{ desabilitado: selectedTransaccionId === null }"
        class="btn"
        style="background-color:	#b65110;color: #d4e1e3; width: 130px;"
      >
        <b>Editar</b>
      </button>
    </router-link>
    

     <button
      :disabled="selectedTransaccionId === null"
      :class="{ desabilitado: selectedTransaccionId === null }"
      @click="deleteTransaction"
      class="btn"
      style="background-color:	#b65110;color: #d4e1e3; width: 130px;"
    >
      <b>Eliminar</b>
    </button>
</div>
    

</template>

<script>
import DBAPI from "./../services/DBAPI.js";
import Crypto from '../commons/crypto.js'
export default {
  name: "History",
  data() {
    return {
      selectedTransaccionId: null,
      transacciones: [],
    };
  },
  methods: {
    selectedClick(transaction) {
      if (this.selectedTransaccionId !== transaction._id) {
      this.selectedTransaccionId = transaction._id;
      }
      else this.selectedTransaccionId = null;
      this.$store.commit("setTransactionSelectedType", transaction.action);
      this.$store.commit("setTransactionSelectedId", transaction._id)
    },
    mostrarInfo() {
      this.$toast.info("Haga click en una fila para seleccionar");
    },

    actionName(accion) {
      if (accion === "purchase") {
        return "Compra";
      } else {
        return "Venta";
      }
    },
    deleteTransaction() {
        DBAPI.deleteTransaction(this.selectedTransaccionId)
          .then(() => {
            this.$toast.info("Transacción eliminada correctamente");
          })
          .catch(() => {
            this.$toast.error("Hubo un error al eliminar la transacción");
          })
          .finally(() => {
            this.getTransactions();
          });
      
    },
    getTransactions() {
      DBAPI.getTransactions(this.$store.state.userLogged)
        .then((response) => {
          this.transacciones = response.data;
        })
        .catch(() => {
          this.$toast.error("Error al cargar las transacciones");
        });
    },
    getCryptoName(code){
        return Crypto.getCryptoName(code);
    },
  },
  computed: {},
  mounted() {
    DBAPI.getTransactions(this.$store.state.userLogged)
      .then((response) => {
        this.transacciones = response.data;
        this.cantTransacciones = this.transacciones.length;
      })
      .catch(() => {
        this.$toast.error("Error al cargar las transacciones");
      });
  },
};
</script>

<style>
.selectedRow {
  background-color: #3c56ca;
  color: white;
}
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f2ece5;
}

::-webkit-scrollbar-thumb {
  background: #154153;
}

::-webkit-scrollbar-thumb:hover {
  background: #d8a531;
}
</style>