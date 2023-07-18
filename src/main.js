import './assets/main.css'
// import dotenv from 'dotenv'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// dotenv.config()
const app = createApp(App)
// console.log(import.meta.env.VITE_GITHUB_ID)
app.use(router)
app.use(store)
// store.dispatch('load_auth_token')
// store.dispatch('load_user_info')

app.mount('#app')
