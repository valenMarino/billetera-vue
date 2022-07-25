import { createStore } from 'vuex'
import DBAPI from '../services/DBAPI.js'
export default createStore({
  state: {
    userLogged:"",
    transactions:[],
    balance:0,
    transactionSelected:"",
    idSelected:"",
    balance:null,
    quantity :null,
    investments:null,
    cryptoPrices:null
  },
  getters: {
  },
  mutations: {
    setLoggedUserName(state, user){
      state.userLogged = user;
    },
    setTransactions(state){
      DBAPI.getTransactions(state.userLogged)
    .then((response) => {
      state.transactions = response.data;
    })
    .catch(() => {
      alert("Hubo un error al conectar con el servidor");
    });
  },
  setTransactionSelectedType(state, type){
  state.transactionSelected = type;
  },
  setBalance(state, total) {
    state.balance = total;
  },
  setBalanceQuantity(state, total) {
    state.quantity = total;
  },
  setInvestments(state, data) {
    state.investments = data;
  },
  setCryptoPrices(state, data) {
    state.cryptoPrices = data;
  },
},
  actions: {
  },
  modules: {
  },
});
