import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
// Veevalidate
import {
  Field,
  Form,
  ErrorMessage,
  defineRule,
  configure
} from 'vee-validate'
import {
  required,
  email,
  min
} from '@vee-validate/rules'
import {
  localize,
  setLocale
} from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 購物車等得另外引入
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  generateMessage: localize({
    zh_TW: zhTW
  }),
  ValidateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App).use(router)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

app.use(VueAxios, axios)

// use fontAwesome
library.add(faUserSecret, faShoppingCart, faInstagram, faFacebookSquare)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
