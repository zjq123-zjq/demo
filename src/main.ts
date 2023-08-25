import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import pinia from './stores'
import './styles/main.scss'
import router from './router'
import 'vant/lib/index.css'
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
