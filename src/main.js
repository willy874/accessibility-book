import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'
import Config from './config'
import mixin from './mixins/app'

Vue.config.productionTip = false
Vue.use(plugins)
Vue.mixin(mixin)
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
Config.setApp(app)
