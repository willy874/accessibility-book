<template>
  <div>
    <div v-if="route.name === RouterName.HOME" :key="RouterName.HOME">
      <h2>首頁</h2>
      <section-news />
      <!-- <section id="release_list">
        <h4 class="section-title">最新上架</h4>
      </section>
      <section id="recommend_list">
        <h4 class="section-title">推薦書單</h4>
      </section> -->
    </div>
    <div v-for="(view, name) in views" :key="name">
      <div :is="view" v-if="route.name === name"></div>
    </div>
  </div>
</template>

<script>
import { RouterName } from '@/consts'
import Book from './Book.vue'
import BookMark from './BookMark.vue'
import Chapter from './Chapter.vue'
import History from './History.vue'
import Login from './Login.vue'
import Menu from './Menu.vue'
import Navigation from './Navigation.vue'
import News from './News.vue'
import NoAuthorized from './NoAuthorized.vue'
import Register from './Register.vue'
import Tag from './Tag.vue'
import User from './User.vue'

export default {
  name: 'Home',
  components: {
    'section-news': News,
  },
  data() {
    return {
      views: {
        [RouterName.BOOK]: Book,
        [RouterName.BOOK_MARK]: BookMark,
        [RouterName.CHAPTER]: Chapter,
        [RouterName.HISTORY]: History,
        [RouterName.LOGIN]: Login,
        [RouterName.MENU]: Menu,
        [RouterName.NAVIGATION]: Navigation,
        [RouterName.NEWS]: News,
        [RouterName.NO_AUTHORIZED]: NoAuthorized,
        [RouterName.REGISTER]: Register,
        [RouterName.TAG]: Tag,
        [RouterName.USER]: User,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.section-title {
  text-align: center;
  font-size: 1.5rem;
  margin: 8px auto;
}
</style>
