import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import axios
import axios from 'axios'

//set credential axios with true
axios.defaults.withCredentials = true

const app = createApp(App)

app.use(router, axios)

app.mount('#app')
