<template>
  <div>
    <h2>歷史觀看列表</h2>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else>
      <div v-if="listModel.length" class="history-list">
        <div v-for="(model, index) in listModel" :key="model.id">
          <li class="history-item">
            <RouterLink :to="getChapterRoute(model.chapter)">
              <h4>
                <span>{{ index + 1 }}.</span>
                <span>{{ model.chapter_name }}</span>
              </h4>
              <p>{{ getDate(model.last_modified) }}</p>
              <ul>
                <span>標籤:</span>
                <li v-for="item in model.tag" :key="item.id">{{ item.name }}</li>
              </ul>
            </RouterLink>
          </li>
        </div>
      </div>
      <div v-else>
        <div>沒有資料</div>
      </div>
    </template>
  </div>
</template>

<script>
import { apiGetHistoryList } from '@/api/index'
import { RouterName, Actions } from '@/consts'
import dayjs from 'dayjs'

export default {
  name: 'History',
  data() {
    return {
      /** @type {HistoryModel[]} */
      listModel: null,
      tagList: null,
      loading: false,
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
     * @return {Promise<BookModel[]>}
     */
    fetchHistoryList() {
      return this.$store.dispatch(Actions.FETCH_HISTORY_LIST)
    },
    /**
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return {
        name: RouterName.CHAPTER,
        params: { id },
      }
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
     * @param {HistoryModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      this.loading = true
      const res = await this.fetchHistoryList()
      this.listModel = res.data.results.sort((a, b) => {
        return b.last_modified - a.last_modified
      })
      this.loading = false
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
