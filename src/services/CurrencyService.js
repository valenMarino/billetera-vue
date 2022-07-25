import axios from "axios";

const clienteAPI = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
  getExchangeValues(exchange, coin) {
    return clienteAPI.get(`/${exchange}/${coin}/ars/0.01`);
  },
  getmoneda() {
    return clienteAPI.get("/cryptomkt/btc/ars/0.21");
  },
  getPrices(coin) {
    return clienteAPI.get(`/letsbit/${coin}`);
  },
};
