<template>
  <div>
    <h2>歷史觀看列表</h2>
    <template v-if="loading">
      <div v-if="listModel.length" class="history-list">
        <div v-for="model in listModel" :key="model.id">
          <li class="history-item">
            <RouterLink :to="getChapterRoute(model.id)">
              <h4>
                {{ model.chapter_name }}
              </h4>
              <p>{{ getDate(model.last_modified) }}</p>
              <ul>
                標籤:
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
    <template v-else>
      <div>讀取中</div>
    </template>
  </div>
</template>

<script>
import { apiGetHistory } from '@/api/index'
import { RouterName } from '@/consts'

export default {
  name: 'History',
  data() {
    return {
      /** @type {HistoryModel[]} */
      listModel: null,
      /** @type {HistoryModel} */
      targetListModel: null,
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
      const date = new Date(time)
      const dateDetail = {
        fullDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
        fullTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      }
      return [dateDetail.fullDate, dateDetail.fullTime].join(' ')
    },
    /**
     * @depend
     * @param {HistoryModel[]} this.targetListModel
     * @param {HistoryModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      this.targetListModel = null
      this.loading = false
      const res = await apiGetHistory()
      this.listModel = res.data.sort((a, b) => {
        return b.last_modified - a.last_modified
      })
      this.loading = true
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
