import consts from '@/consts'
import Home from '../views/Home.vue'
import Chapter from '../views/Chapter.vue'
import Login from '../views/Login.vue'

/**
 * @enum {number}
 * @readonly
 */
const RouterName = consts.routerName

export default [
  {
    path: '/',
    name: RouterName.HOME,
    component: Home,
  },
  {
    path: '/login',
    name: RouterName.LOGIN,
    component: Login,
  },
  {
    path: '/chapter/:id',
    name: RouterName.CHAPTER,
    component: Chapter,
  },
]
