import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import App from './App.vue';

// import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
app.use(router)

app.use(pinia)
app.use(Antd)

app.mount('#app')
