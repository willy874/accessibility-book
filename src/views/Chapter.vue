<template>
  <div>
    <h2>章節列表</h2>
    <div v-if="targetModel">
      <button @click="addBookMark">建立書籤</button><span v-if="isBookMark">已加入書籤</span>
      <div v-html="transformMarkdownToHtml(targetModel.content)"></div>
    </div>
    <div v-else>
      <div></div>
    </div>
  </div>
</template>

<script>
import { transformMarkdownToHtml } from '@/utils'
import { apiGetChapterById, apiPostBookMark, apiPostHistory } from '@/api/index'
import { RouterName } from '@/consts'
import Config from '@/config'

export default {
  name: 'Chapter',
  data() {
    return {
      modelList: [],
      active: -1,
      isBookMark: false,
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
     * @param {ChapterModel} this.targetModel
     * @param {ChapterModel[]} this.modelList
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {Route}**/
      const route = Config.getRoute()
      if (!route) return
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
          apiPostHistory({ chapter: id })
          modelList.push(res.data)
        }
      } else {
        this.active = -1
        this.$router.replace({ name: RouterName.HOME })
      }
    },
    async addBookMark(e) {
      e.preventDefault()
      const chapterObj = { chapter: this.active }
      try {
        const res = await apiPostBookMark(chapterObj)
        if (res.isAxiosError) {
          throw new Error(res.data.detail)
        } else {
          this.isBookMark = true
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
</script>
