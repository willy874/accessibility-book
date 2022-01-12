<template>
  <div>
    <template v-if="route">
      <div v-if="route.name === RouterName.HOME">
        <h2>首頁</h2>
        <section id="news">
          <h4 class="section-title">最新消息</h4>
          <div v-if="newsListModel">
            <ul class="list">
              <li v-for="model in newsListModel" :key="model.id" class="list-item">
                <h4>{{ model.name }}</h4>
                <p>
                  發佈時間:<span>{{ getDate(model.publish_date) }}</span>
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section id="release_list">
          <h4 class="section-title">最新上架</h4>
        </section>
        <section id="recommend_list">
          <h4 class="section-title">推薦書單</h4>
        </section>
      </div>
      <div v-if="route.name === RouterName.BOOK">
        <Book />
      </div>
      <div v-if="route.name === RouterName.BOOK_MARK">
        <BookMark />
      </div>
      <div v-if="route.name === RouterName.CHAPTER">
        <Chapter />
      </div>
      <div v-if="route.name === RouterName.HISTORY">
        <History />
      </div>
      <div v-if="route.name === RouterName.LOGIN">
        <Login />
      </div>
      <div v-if="route.name === RouterName.MENU">
        <Menu />
      </div>
      <div v-if="route.name === RouterName.NAVIGATION">
        <Navigation />
      </div>
      <div v-if="route.name === RouterName.NO_AUTHORIZED">
        <NoAuthorized />
      </div>
      <div v-if="route.name === RouterName.REGISTER">
        <Register />
      </div>
      <div v-if="route.name === RouterName.TAG">
        <Tag />
      </div>
      <div v-if="route.name === RouterName.USER">
        <User />
      </div>
    </template>
  </div>
</template>

<script>
import { RouterName, Actions } from '@/consts'
import Config from '@/config'
import Book from './Book.vue'
import BookMark from './BookMark.vue'
import Chapter from './Chapter.vue'
import History from './History.vue'
import Login from './Login.vue'
import Menu from './Menu.vue'
import Navigation from './Navigation.vue'
import NoAuthorized from './NoAuthorized.vue'
import Register from './Register.vue'
import Tag from './Tag.vue'
import User from './User.vue'
import dayjs from 'dayjs'

export default {
  name: 'Home',
  components: {
    Book,
    BookMark,
    Chapter,
    History,
    Login,
    Menu,
    Navigation,
    NoAuthorized,
    Register,
    Tag,
    User,
  },
  data() {
    return {
      RouterName,
      route: null,
      /** @type {NewsModel[]} */
      newsListModel: null,
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
    /**
     * @return {Promise<NewsModel[]>}
     */
    fetchNews() {
      return this.$store.dispatch(Actions.FETCH_NEWS_LIST)
    },
    /**
     * @param {string} time
     * @return {number}
     */
    getDate(time) {
      return dayjs(time).format('YYYY/MM/DD hh:mm:ss')
    },
    /**
     * @depend
     * @param {NewsModel} this.listModel
     */
    async effectComponentPage() {
      /** @type {Route}**/
      this.route = Config.getRoute(this) || this.$route
      this.newsListModel = await this.fetchNews()
    },
  },
}
</script>

<style lang="scss" scoped>
.section-title {
  text-align: center;
  font-size: 1.5rem;
  margin: 8px auto;
}
.list {
  border: 1px solid #000;
  padding: 16px;
}
</style>
