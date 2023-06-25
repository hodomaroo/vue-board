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

app.mount('#app')
