import { RouterName } from '@/consts'
import Home from '../views/Home.vue'
import Chapter from '../views/Chapter.vue'
import Book from '../views/Book.vue'
import Tag from '../views/Tag.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NoAuthorized from '../views/NoAuthorized.vue'
import BookMark from '../views/BookMark.vue'
import History from '../views/History.vue'
import Navigation from '../views/Navigation.vue'
import MenuList from '../views/MenuList.vue'
import User from '../views/User.vue'

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
    path: '/register',
    name: RouterName.REGISTER,
    component: Register,
  },
  {
    path: '/no-authorized',
    name: RouterName.NO_AUTHORIZED,
    component: NoAuthorized,
  },
  {
    path: '/navigation',
    name: RouterName.NAVIGATION,
    component: Navigation,
  },
  {
    path: '/user',
    name: RouterName.USER,
    component: User,
  },
  {
    path: '/book/',
    name: RouterName.BOOK,
    component: Book,
  },
  {
    path: '/book/:id',
    name: RouterName.BOOK_DETAIL,
    component: Book,
  },
  {
    path: '/chapter/:id',
    name: RouterName.CHAPTER,
    component: Chapter,
  },
  {
    path: '/tag/',
    name: RouterName.TAG,
    component: Tag,
  },
  {
    path: '/tag/:id',
    name: RouterName.TAG_DETAIL,
    component: Tag,
  },
  {
    path: '/bookmark',
    name: RouterName.BOOK_MARK,
    component: BookMark,
  },
  {
    path: '/history',
    name: RouterName.HISTORY,
    component: History,
  },
  {
    path: '/menulist/:uuid',
    name: RouterName.MENULIST,
    component: MenuList,
  },
]
