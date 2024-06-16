import { createApp } from 'vue'
import { createPinia } from 'pinia'
import type { PluginOptions } from 'vue-toastification'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.BOTTOM_LEFT,
  maxToasts: 5,
  timeout: 3000,
  closeButton: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  hideProgressBar: true,
  closeOnClick: false,
  draggable: false,
  transition: 'Vue-Toastification__fade'
}

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')
