<template>
  <div>
    <template v-if="route">
      <div v-if="route.name === RouterName.HOME">
        <h2>首頁</h2>
        <section id="news">
          <h4 class="section-title">最新消息</h4>
        </section>
        <section id="release_list">
          <h4 class="section-title">最新上架</h4>
        </section>
        <section id="recommend_list">
          <h4 class="section-title">推薦書單</h4>
        </section>
      </div>
      <div v-if="route.name === RouterName.CHAPTER">
        <Chapter />
      </div>
      <div v-if="route.name === RouterName.TAG">
        <Tag />
      </div>
      <div v-if="route.name === RouterName.BOOK">
        <Book />
      </div>
      <div v-if="route.name === RouterName.BOOK_MARK">
        <BookMark />
      </div>
      <div v-if="route.name === RouterName.NAVIGATION">
        <Navigation />
      </div>
      <div v-if="route.name === RouterName.LOGIN">
        <Login />
      </div>
      <div v-if="route.name === RouterName.MENULIST">
        <MenuList />
      </div>
    </template>
  </div>
</template>

<script>
import { RouterName } from '@/consts'
import Config from '@/config'
import Chapter from './Chapter.vue'
import Tag from './Tag.vue'
import Book from './Book.vue'
import BookMark from './BookMark.vue'
import Navigation from './Navigation.vue'
import Login from './Login.vue'
import MenuList from './MenuList.vue'
export default {
  name: 'Home',
  components: {
    Chapter,
    Tag,
    Book,
    BookMark,
    Navigation,
    Login,
    MenuList,
  },
  data() {
    return {
      RouterName,
      route: null,
    }
  },
  watch: {
    $route() {
      this.effectComponentPage()
    },
  },
  async created() {
    this.effectComponentPage()
  },
  methods: {
    async effectComponentPage() {
      /** @type {Route}**/
      this.route = Config.getRoute(this) || this.$route
    },
  },
}
</script>

<style lang="scss" scoped>
.section-title {
  text-align: center;
  font-size: 1.5rem;
}
</style>
