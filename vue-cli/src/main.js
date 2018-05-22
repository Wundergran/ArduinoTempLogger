import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueSocketio from 'vue-socket.io';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(Vuetify, {
  theme: { primary: "#3F51B5", secondary: "#283593", accent: "#9c27b0", error: "#f44336", warning: "#ffeb3b", info: "#2196f3", success: "#4caf50" }
})
new Vue({
  render: h => h(App)
}).$mount('#app')
