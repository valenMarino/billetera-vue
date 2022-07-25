
import CurrencyService from "@/services/CurrencyService";

export default{
    getCryptoName(id){
      if (id == "btc") {
        return "Bitcoin";
      }
      if (id == "eth") {
        return "Etherium";
      }
      if (id == "dai") {
        return "DAI";
      }
      if (id == "usdc") {
        return "USDCash";
      }
      if (id == "usdt") {
        return "Tether(USDC)";
      }
},
    getCryptos(){
        return [
            {code:'btc', name:'Bitcoin'},
            {code:'eth', name:'Etherium'},
            {code:'dai', name:'DAI'},
            {code:'usdc', name:'USDCash' },
            {code:'usdt', name:'Tether'},
        ]
},
  getValues(type){
      CurrencyService.getPrices(type)
        .then((respuesta) => {
          debugger;
          return respuesta.data;
        })
        .catch(() => {
          this.$toast.error("Error al cargar los Datos");
        });
    
  },
} 