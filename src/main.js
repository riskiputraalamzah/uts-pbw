import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Dev from './Dev.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import VueLazyload from 'vue-lazyload'

const isDevelopment = false
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

const pinia = createPinia()
const app = createApp(isDevelopment ? Dev : App)

app.use(pinia)
app.use(router, axios)
app.use(VueSweetalert2)
app.use(VueLazyload)

app.mount('#app')
