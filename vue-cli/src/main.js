import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueSocketio from 'vue-socket.io';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(Vuetify)
new Vue({
  render: h => h(App)
}).$mount('#app')
