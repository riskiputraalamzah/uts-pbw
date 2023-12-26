import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Dev from './Dev.vue'
import router from './router'

const isDevelopment = true
//import axios
import axios from 'axios'
/**
 * Request interceptor: for each request to the server,
 * attach the CSRF token if it exists.
 *
 */

//set credential axios with true
axios.defaults.withXSRFToken = true
axios.defaults.withCredentials = true

// set default base url
axios.defaults.baseURL = 'http://localhost:8000/'

const app = createApp(isDevelopment ? Dev : App)
const pinia = createPinia()

app.use(router, axios)
app.use(pinia)

app.mount('#app')
