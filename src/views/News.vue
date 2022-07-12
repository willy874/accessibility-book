<template>
  <section>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="targetModel" class="article">
      <h2 class="title">最新消息</h2>
      <div class="list">
        <h3>{{ targetModel.name }}</h3>
        <div>
          發佈時間:<span>{{ formatDate(targetModel.publish_date) }}</span>
        </div>
        <div v-html="transformMarkdownToHtml(targetModel.content)"></div>
      </div>
    </div>
    <div v-else-if="newsList && newsList.length" class="home">
      <h3 class="title">最新消息</h3>
      <ul class="list">
        <li v-for="model in newsList" :key="model.id" class="list-item">
          <h4>
            <RouterLink :to="getNewsRoute(model.id)">{{ model.name }}</RouterLink>
          </h4>
          <div>
            發佈時間:<span>{{ formatDate(model.publish_date) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { transformMarkdownToHtml, formatDate } from '@/utils'
import { RouterName, Actions } from '@/consts'
import VueConfig from '@/config'

/**
 * @type {{
 *   fetchNewsList: ActionFunction<import('@/store/news').fetchNewsList>
 *   fetchNewsById: ActionFunction<import('@/store/news').fetchNewsById>
 * }}
 */
const { fetchNewsList, fetchNewsById } = mapActions({
  fetchNewsList: Actions.FETCH_NEWS_LIST,
  fetchNewsById: Actions.FETCH_NEWS_BY_ID,
})

export default {
  data() {
    return {
      active: null,
      targetModel: null,
      newsList: [],
    }
  },
  methods: {
    transformMarkdownToHtml,
    fetchNewsList,
    fetchNewsById,
    formatDate,
    /**
     * @param {string} id
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
      const route = VueConfig.getRoute(this)
      const id = Number(route.params.id)
      if (id) {
        this.targetModel = await this.fetchNewsById(id)
        this.active = id
      } else {
        this.newsList = await this.fetchNewsList()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  .list {
    margin-bottom: 16px;
  }
  h2 {
    margin-bottom: 8px;
  }
}
.home {
  .title {
    margin-top: 16px;
  }
  .list {
    margin-bottom: 16px;
  }
  .list-item {
    border: 1px solid #000;
    padding: 16px;
    margin: 8px 0;
    &:hover {
      background-color: #68c79c;
      color: #fff;
    }
  }
}
</style>
