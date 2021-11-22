import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token')
  console.log('to:', to.path)
  console.log('from:', from.path)
  const fromPath = from.path
  localStorage.setItem('fromPath', fromPath)
  if (isLogin) {
    next()
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
