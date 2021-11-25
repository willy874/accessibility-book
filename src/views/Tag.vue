<template>
  <div>
    <h2>標籤列表</h2>
    <template v-if="loading">
      <div v-if="targetListModel && targetListModel.length">
        <div v-for="model in targetListModel" :key="model.id">
          <RouterLink :to="`/chapter/${model.id}`">{{ model.name }}</RouterLink>
        </div>
      </div>
      <div v-else-if="listModel.length">
        <div v-for="model in listModel" :key="model.id">
          <RouterLink :to="`/tag/${model.id}`">{{ model.name }}</RouterLink>
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
import BasePage from '@/extends/base-page'
import { apiGetTagList, apiGetChapterByTag } from '@/api/index'

/**
 * @type {ComponentOptions}
 * @extends {BasePage}
 */
export default {
  name: 'Tag',
  extends: BasePage,
  data() {
    return {
      /** @type {TagModel[]} */
      listModel: null,
      /** @type {TagModel} */
      targetListModel: null,
      loading: false,
    }
  },
  computed: {},
  watch: {
    route() {
      this.effectComponentPage()
    },
  },
  async created() {
    // await this.passLogin()
    this.effectComponentPage()
  },
  methods: {
    /**
     * @depend
     * @this {ComponentOptions}
     * @param {TagModel[]} this.targetListModel
     * @param {TagModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {number} */
      const id = this.route?.params.id

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
