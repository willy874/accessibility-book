<template>
  <div>
    <h2>歷史觀看列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="historyList.length" class="history-list">
      <div v-for="(model, index) in historyListSort" :key="model.id">
        <li class="history-item">
          <RouterLink :to="getChapterRoute(model.chapter)">
            <h4>
              <span>{{ index + 1 }}.</span>
              <span>{{ model.chapter_name }}</span>
            </h4>
            <p>{{ formatDate(model.last_modified) }}</p>
            <ul>
              <span>標籤:</span>
              <li v-for="item in model.tag" :key="item.id">{{ item.name }}</li>
            </ul>
          </RouterLink>
        </li>
      </div>
    </div>
    <div v-else>無資料</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { RouterName, Getters, Actions } from '@/consts'
import { formatDate } from '@/utils'

/**
 * @type {{
 *   historyList: GetterFunction<import('@/store/history').historyList>
 * }}
 */
const { historyList } = mapGetters({
  historyList: Getters.HISTORY_LIST,
})

/**
 * @type {{
 *   fetchHistoryList: ActionFunction<import('@/store/history').fetchHistoryList>,
 * }}
 */
const { fetchHistoryList } = mapActions({
  fetchHistoryList: Actions.FETCH_HISTORY_LIST,
})

export default {
  name: 'History',
  data() {
    return {}
  },
  computed: {
    historyList,
    /**
     * @return {HistoryModel[]}
     */
    historyListSort() {
      return this.historyList.map((p) => p).sort((a, b) => b.last_modified - a.last_modified)
    },
  },
  methods: {
    formatDate,
    fetchHistoryList,
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return {
        name: RouterName.CHAPTER,
        params: { id },
      }
    },
    /**
     * @depend
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      await this.fetchHistoryList()
    },
  },
}
</script>

<style lang="scss" scoped>
.history-list {
  border: 1px solid #000;
  border-bottom: none;
}
.history-item {
  display: flex;
  border-bottom: 1px solid #000;
  a {
    flex: 2;
    padding: 1rem 0.5rem;
    &:hover {
      color: white;
      background: green;
    }
  }
  p {
    flex: 1;
    padding: 0.5rem 0;
  }
  ul {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    text-align: left;
  }
}
</style>
