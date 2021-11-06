import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'
import Config from './config'

Vue.config.productionTip = false
Vue.use(plugins)
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
Config.setApp(app)
