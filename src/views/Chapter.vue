<template>
  <div>
    <h2>章節列表</h2>
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
import { apiGetChapterById, apiPostHistory } from '@/api/index'
import consts from '@/consts'

/**
 * @enum {number}
 * @readonly
 */
const RouterName = consts.routerName

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
    route() {
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
     * @param {ChapterModel} this.targetModel
     * @param {ChapterModel[]} this.modelList
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {ChapterModel} */
      const targetModel = this.targetModel
      /** @type {ChapterModel[]} */
      const modelList = this.modelList
      /** @type {number} */
      const id = Number(this.route?.params.id)

      if (id) {
        this.active = id
        const target = targetModel
        if (!target) {
          const res = await apiGetChapterById(id)
          apiPostHistory({ chapter: id })
          modelList.push(res.data)
        }
      } else {
        this.active = -1
        this.$router.replace({ name: RouterName.HOME })
      }
    },
  },
}
</script>
