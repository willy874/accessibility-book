import { RouterName } from '@/consts'
import Home from '../views/Home.vue'
import Chapter from '../views/Chapter.vue'
import Book from '../views/Book.vue'
import Tag from '../views/Tag.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NoAuthorized from '../views/NoAuthorized.vue'
import BookMark from '../views/BookMark.vue'

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
    path: '/bookmark/',
    name: RouterName.BOOKMARK,
    component: BookMark,
  },
  {
    path: '/bookmark/:id',
    name: RouterName.BOOKMARK_DETAIL,
    component: BookMark,
  },
]
