import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import base styles
import './assets/styles/base.css'
import './assets/styles/variables.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')