<template>
  <div>
    <h2>書籤列表</h2>
    <template v-if="loading">
      <div v-if="targetListModel && targetListModel.length">
        <div v-for="model in targetListModel" :key="model.id">
          <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
        </div>
      </div>
      <div v-else-if="listModel.length">
        <div v-for="model in listModel" :key="model.id">
          <RouterLink :to="getBookMarkRoute(model.id)">{{ model.name }}</RouterLink>
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
import { apiGetBookMark, apiGetChapterByBookMark } from '@/api/index'
import { RouterName } from '@/consts'
import Config from '@/config'

export default {
  name: 'BookMark',
  data() {
    return {
      /** @type {BookMarkModel[]} */
      listModel: null,
      /** @type {BookMarkModel} */
      targetListModel: null,
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
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getBookMarkRoute(id) {
      return {
        name: RouterName.BOOKMARK_DETAIL,
        params: { id },
      }
    },
    /**
     * @depend
     * @param {BookMarkModel[]} this.targetListModel
     * @param {BookMarkModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {Route}**/
      const route = Config.getRoute()
      if (!route) return
      /** @type {number} */
      const id = route.params.id

      if (id) {
        this.loading = false
        const res = await apiGetChapterByBookMark(id)
        this.targetListModel = res.data
        this.loading = true
      } else {
        this.targetListModel = null
        this.loading = false
        const res = await apiGetBookMark()
        this.listModel = res.data
        this.loading = true
      }
    },
  },
}
</script>
