import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'
import Config from './config'
import mixin from './mixins/app'
import liff from '@line/liff'

Vue.config.productionTip = false
Vue.use(plugins)
Vue.mixin(mixin)
async function main() {
  const LiifQuery = new URLSearchParams(location.search.substring(1)).get('liff.state')
  if (Config.value.liff || LiifQuery) {
    await liff.init({ liffId: Config.value.liffId })
    const route = router.resolve(LiifQuery).route
    await router.replace(route)
  }
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
  Config.setApp(app)
}
main()
