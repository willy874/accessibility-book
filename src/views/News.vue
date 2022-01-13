<template>
  <section>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="targetModel">
      <h2 class="section-title">最新消息</h2>
      <div class="list-item">
        <h3>{{ targetModel.name }}</h3>
        <div>
          發佈時間:<span>{{ getDate(targetModel.publish_date) }}</span>
        </div>
        <div v-html="transformMarkdownToHtml(targetModel.content)"></div>
      </div>
    </div>
    <div v-else-if="newsList && newsList.length">
      <h3 class="section-title">最新消息</h3>
      <ul class="list">
        <li v-for="model in newsList" :key="model.id" class="list-item">
          <h4>
            <RouterLink :to="getNewsRoute(model.id)">{{ model.name }}</RouterLink>
          </h4>
          <div>
            發佈時間:<span>{{ getDate(model.publish_date) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { transformMarkdownToHtml } from '@/utils'
import { RouterName, Getters, Actions } from '@/consts'

export default {
  data() {
    return {
      active: null,
    }
  },
  computed: {
    /**
     * @return {NewsModel[]}
     */
    newsList() {
      return this.$store.getters[Getters.NEWS_LIST]
    },
    /**
     * @returns {NewsModel}
     */
    targetModel() {
      return this.newsList.find((p) => p.id === this.active)
    },
  },
  methods: {
    transformMarkdownToHtml,
    /**
     * @return {Promise<NewsModel[]>}
     */
    fetchNewsList() {
      return this.$store.dispatch(Actions.FETCH_NEWS_LIST)
    },
    /**
     * @param {number} id
     * @return {Promise<ChapterModel>}
     */
    fetchNewsListById(id) {
      return this.$store.dispatch(Actions.FETCH_NEWS_BY_ID, id)
    },
    /**
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getNewsRoute(id) {
      return {
        name: RouterName.NEWS_DETAIL,
        params: { id },
      }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      /** @type {number} */
      const id = Number(this.route.params.id)
      if (id) {
        await this.fetchNewsListById(id)
        this.active = id
      } else {
        await this.fetchNewsList()
      }
    },
  },
}
</script>

<style>
.list {
  border: 1px solid #000;
  padding: 16px;
}
</style>
