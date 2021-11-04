import { routerName } from '@/consts'
import Home from '../views/Home.vue'
import Chapter from '../views/Chapter.vue'
import Login from '../views/Login.vue'

export default [
  {
    path: '/',
    name: routerName.Home,
    component: Home,
  },
  {
    path: '/login',
    name: routerName.Login,
    component: Login,
  },
  {
    path: '/chapter/:id',
    name: routerName.Chapter,
    component: Chapter,
  },
]
