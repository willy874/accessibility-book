<template>
  <div>
    <div v-if="targetModel">
      <div>
        <h2>章節列表</h2>
        <div class="chapter__bookmark">
          <span v-if="isBookMark">已加入書籤</span>
          <button v-else @click="addBookMark">建立書籤</button>
        </div>
      </div>
      <div v-html="transformMarkdownToHtml(targetModel.content)"></div>
    </div>
    <div v-else>
      <div></div>
    </div>
  </div>
</template>

<script>
import { transformMarkdownToHtml, HttpError, handleHttpErrorLog } from '@/utils'
import { apiGetChapterById, apiPostBookMark, apiPostHistory, apiGetBookMark } from '@/api/index'
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
      const route = Config.getRoute(this)
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
        const bookmarkRes = await apiGetBookMark()
        const bookmarkList = bookmarkRes.data
        this.isBookMark = bookmarkList.some((item) => item.id === this.active)
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
      /** @type {BookMarkRequestParam} **/
      const requestParam = { chapter: this.active }
      try {
        const res = await apiPostBookMark(requestParam)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          this.isBookMark = true
        }
      } catch (error) {
        handleHttpErrorLog(error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.chapter__bookmark {
  padding: 16px;
}
</style>
