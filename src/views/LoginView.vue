<template>
  <div class="home">
    <div>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center"  style="background-color:#154153">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Billetera</h2>
                  <p class="text-white-50 mb-5">
                    Por favor ingrese su nombre de usuario
                  </p>
                  <form  @submit.prevent="login()"><div class="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="username"
                      class="form-control form-control-lg"
                      v-model="username"
                      style="background-color: #d4e1e3;"
                    />
                  </div>
                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="button"
                    id="submit"
                    v-on:click="login()"
                  >
                    Ingresar
                  </button></form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
 </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "LoginView",
  components: {  },
  data(){
    return{
      username:"",
    }
  },
  methods:{
    login: function(){
       if (this.username.length < 6 ) {
        this.$toast.error("El nombre de usuario no puede tener menos de 6 carácteres");
      }else if(this.username.length > 12) {
         this.$toast.error("El nombre de usuario no puede tener mas de 12 carácteres");
      }  
      else{
          this.$store.commit("setLoggedUserName", this.username);
          this.$store.commit("setTransactions");
          this.$router.push("/state");
      }
      
    }
  }
};
</script>
