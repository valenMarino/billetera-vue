<template>
    <nav v-if="this.$store.state.userLogged">
      <router-link class="focusOver"  to="/transactions">Transacciones</router-link> |
      <router-link class="focusOver"  to="/investments">Inversiones</router-link> |
      <router-link class="focusOver"  to="/state">Estado Actual</router-link> |
      <router-link class="focusOver"  to="/where-buy">Donde Comprar</router-link> |
      <router-link class="focusOver"  to="/where-sell">Donde Vender</router-link> |
      <router-link class="focusOver" v-on:click="logout" to="/">Salir</router-link> 
    </nav>
  <router-view/>
</template>
<script>
export default {
  name: "Appvue",
  components: {  },
  data(){
    return{
    }
  },
  methods:{
    logout: function(){
      this.$store.commit("setLoggedUserName", "");
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Work Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #154153 ;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #154153;

    &.router-link-exact-active {
      color: 	#b65110;
    }
  }
  
}
.focusOver:hover{
color: 	#b65110 !important;
}

</style>
