<template>
  <div>
    <div v-if="targetModel">
      <div v-html="transformMarkdownToHtml(targetModel.content)"></div>
    </div>
    <div v-else>
      <div></div>
    </div>
  </div>
</template>

<script>
import BasePage from '@/extends/base-page'
import { transformMarkdownToHtml } from '@/utils'
import { apiGetChapterById } from '@/api/index'

/**
 * @type {ComponentOptions}
 * @extends {BasePage}
 */
export default {
  name: 'Chapter',
  extends: BasePage,
  data() {
    return {
      modelList: [],
      active: -1,
    }
  },
  computed: {
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.modelList.find((p) => p.id === this.active)
    },
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
    transformMarkdownToHtml,
    /**
     * @depend
     * @this {ComponentOptions}
     * @param {Route} this._$route
     * @param {ChapterModel} this.targetModel
     * @param {ChapterModel[]} this.modelList
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {Route} */
      const route = this._$route
      /** @type {ChapterModel} */
      const targetModel = this.targetModel
      /** @type {ChapterModel[]} */
      const modelList = this.modelList
      /** @type {number} */
      const id = Number(route.params.id)

      if (id) {
        this.active = id
        const target = targetModel
        if (!target) {
          const res = await apiGetChapterById(id)
          modelList.push(res.data)
        }
      } else {
        this.active = -1
        this.$router.replace('/book')
      }
    },
  },
}
</script>
