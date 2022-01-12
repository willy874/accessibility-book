<template>
  <section>
    <h3 class="section-title">最新消息</h3>
    <div v-if="newsList && newsList.length">
      <ul class="list">
        <li v-for="model in newsList" :key="model.id" class="list-item">
          <h4>{{ model.name }}</h4>
          <p>
            發佈時間:<span>{{ getDate(model.publish_date) }}</span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { Getters, Actions } from '@/consts'

export default {
  computed: {
    /**
     * @return {NewsModel[]}
     */
    newsList() {
      return this.$store.getters[Getters.NEWS_LIST]
    },
  },
  created() {
    this.fetchNewsList()
  },
  methods: {
    /**
     * @return {Promise<NewsModel[]>}
     */
    fetchNewsList() {
      return this.$store.dispatch(Actions.FETCH_NEWS_LIST)
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
