import Vue from 'vue'
import App from './App'
import { store } from './store/store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
import auth from './auth'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

// Check the user's auth status when the app starts
auth.checkAuth()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
