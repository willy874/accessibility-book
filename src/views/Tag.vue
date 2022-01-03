<template>
  <div>
    <h2>標籤列表</h2>
    <template v-if="loading">
      <div v-if="targetListModel && targetListModel.length">
        <div v-for="model in targetListModel" :key="model.id" class="tag__list-item">
          <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
        </div>
      </div>
      <div v-else-if="listModel.length">
        <div v-for="model in listModel" :key="model.id" class="tag__list-item">
          <RouterLink :to="getTagRoute(model.id)">{{ model.name }}</RouterLink>
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
import { apiGetTagList, apiGetChapterByTag } from '@/api/index'
import { RouterName } from '@/consts'
import Config from '@/config'

export default {
  name: 'Tag',
  data() {
    return {
      /** @type {TagModel[]} */
      listModel: null,
      /** @type {TagModel} */
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
    getTagRoute(id) {
      return {
        name: RouterName.TAG_DETAIL,
        params: { id },
      }
    },
    /**
     * @depend
     * @param {TagModel[]} this.targetListModel
     * @param {TagModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {Route}**/
      const route = Config.getRoute(this)
      if (!route) return
      /** @type {number} */
      const id = route.params.id
      if (id) {
        this.loading = false
        const res = await apiGetChapterByTag(id)
        this.targetListModel = res.data
        this.loading = true
      } else {
        this.targetListModel = null
        this.loading = false
        const res = await apiGetTagList()
        this.listModel = res.data
        this.loading = true
      }
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 8px;
}
.tag__list-item {
  padding: 8px;
  font-size: 20px;
}
</style>
