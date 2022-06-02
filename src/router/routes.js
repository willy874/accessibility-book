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
import Menu from '../views/Menu.vue'
// import User from '../views/User.vue'
import NEWS from '../views/News.vue'
import Search from '../views/Search.vue'
import RevisePassword from '../views/RevisePassword.vue'

export default [
  {
    path: '/',
    name: RouterName.HOME,
    component: Home,
    meta: {
      title: '首頁',
    },
  },
  {
    path: '/login',
    name: RouterName.LOGIN,
    component: Login,
    meta: {
      title: '登入',
    },
  },
  {
    path: '/register',
    name: RouterName.REGISTER,
    component: Register,
    meta: {
      title: '註冊',
    },
  },
  {
    path: '/no-authorized',
    name: RouterName.NO_AUTHORIZED,
    component: NoAuthorized,
    meta: {
      title: '沒有權限',
    },
  },
  {
    path: '/navigation',
    name: RouterName.NAVIGATION,
    component: Navigation,
    meta: {
      title: '選單列表',
    },
  },
  // {
  //   path: '/user',
  //   name: RouterName.USER,
  //   component: User,
  // },
  {
    path: '/book/',
    name: RouterName.BOOK,
    component: Book,
    meta: {
      title: '章節列表',
    },
  },
  {
    path: '/book/:id',
    name: RouterName.BOOK_DETAIL,
    component: Book,
    meta: {
      title: '章節列表',
    },
  },
  {
    path: '/chapter/:id',
    name: RouterName.CHAPTER,
    component: Chapter,
    meta: {
      title: '章節內容',
    },
  },
  {
    path: '/tag/',
    name: RouterName.TAG,
    component: Tag,
    meta: {
      title: '標籤列表',
    },
  },
  {
    path: '/tag/:id',
    name: RouterName.TAG_DETAIL,
    component: Tag,
    meta: {
      title: '標籤列表',
    },
  },
  {
    path: '/bookmark',
    name: RouterName.BOOK_MARK,
    component: BookMark,
    meta: {
      title: '書籤列表',
    },
  },
  {
    path: '/history',
    name: RouterName.HISTORY,
    component: History,
    meta: {
      title: '歷史觀看列表',
    },
  },
  {
    path: '/menu/:id',
    name: RouterName.MENU,
    component: Menu,
    meta: {
      title: '表單',
    },
  },
  {
    path: '/news',
    name: RouterName.NEWS,
    component: NEWS,
    meta: {
      title: '最新消息',
    },
  },
  {
    path: '/news/:id',
    name: RouterName.NEWS_DETAIL,
    component: NEWS,
    meta: {
      title: '最新消息',
    },
  },
  {
    path: '/search',
    name: RouterName.SEARCH,
    component: Search,
    meta: {
      title: '搜尋列表',
    },
  },
  {
    path: '/revisepassword',
    name: RouterName.REVICE_PASSWORD,
    component: RevisePassword,
    meta: {
      title: '更換密碼',
    },
  },
]
