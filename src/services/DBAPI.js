import axios from "axios";

const API = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest",
  headers: { "x-apikey": "60eb09146661365596af552f" },
});

export default {
    getTransactions(username) {
    return API.get(`/transactions?q={"user_id": "${username}"}`);
  },
  getTransactionById(id) {
    debugger;
    return API.get(`/transactions/${id}`);
  },

  post(transaction) {
    return API.post("/transactions", transaction);
  },
  updateTransaction(id, transaction) {
    return API.patch(`/transactions/${id}`, transaction);
  },
  deleteTransaction(id) {
    return API.delete(`/transactions/${id}`);
  },
};
