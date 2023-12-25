import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

//import axios
import axios from 'axios'

//set credential axios with true
axios.defaults.withCredentials = true

const app = createApp(App)
const pinia = createPinia()

app.use(router, axios)
app.use(pinia)

app.mount('#app')
