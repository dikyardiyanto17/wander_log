import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSun,
  faMoon,
  faUser,
  faBook,
  faHeart,
  faComment,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

library.add(faSun, faMoon, faUser, faBook, faHeart, faComment, faNoteSticky, faFacebookF, faTwitter, faWhatsapp)



import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)

app.mount('#app')

const loader = document.getElementById("initial-loading")
if (loader) {
    loader.classList.add('fade-out')
    setTimeout(() => loader.remove(), 2000)
}
