import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Config from '@/config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

/**
 * 因為第一次導向是由 "/" 導到目標路由，所以可能會發生不必要的處理。
 */
let init = false

router.beforeEach((to, from, next) => {
  if (init) {
    init = true
  }
  next()
})

router.afterEach((to, from, next) => {
  const title = `${Config.value.site_conf.site_name} - ${to.meta.title}`
  document.querySelector('title').innerHTML = title
})

export default router
