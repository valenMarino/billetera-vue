<template>
    <div>
        <EstadoActualComponent/>
    </div>
</template>

<script>
import EstadoActualComponent from "../components/StateComponent.vue";
export default {
  name: "EstadoActual",
  components: { EstadoActualComponent },
  data(){
    return{
      username:"",
    }
  },
  methods:{
    
  }
};
</script>

<style></style>