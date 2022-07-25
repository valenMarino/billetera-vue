import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toaster from "@incuca/vue3-toaster";

createApp(App).use(store).use(router).use(Toaster).mount('#app')
