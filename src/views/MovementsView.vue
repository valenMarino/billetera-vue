<template>
    <div>
        <HistoryComponent/>
    </div>
</template>

<script>
import HistoryComponent from "@/components/HistoryComponent.vue";

export default {
  name: "MovementsView",
  components: { HistoryComponent  },
  data(){
    return{
      username:"",
    }
  },
  methods:{
    
  }
};
</script>

<style>
</style>