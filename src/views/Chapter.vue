<template>
  <div>
    <div v-if="targetModel">
      <div>
        <h2>章節列表</h2>
        <div class="chapter__bookmark">
          <span v-if="isBookMark">已加入書籤</span>
          <button v-else type="button" @click="throttleAddBookMark">建立書籤</button>
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
import { transformMarkdownToHtml, throttle } from '@/utils'
import { apiPostHistory } from '@/api/index'
import { RouterName, Getters, Actions } from '@/consts'
import Config from '@/config'

export default {
  name: 'Chapter',
  data() {
    return {
      modelList: [],
      active: -1,
      throttleAddBookMark: throttle(this.addBookmark, 400),
    }
  },
  computed: {
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.modelList.find((p) => p.id === this.active)
    },
    /**
     * @returns {BookMarkModel[]}
     */
    bookmarkList() {
      return this.$store.getters[Getters.BOOKMARK_LIST]
    },
    /**
     * @returns {boolean}
     */
    isBookMark() {
      return this.bookmarkList.some((item) => item.chapter === this.active)
    },
  },
  methods: {
    transformMarkdownToHtml,
    /**
     * @return {Promise<BookMarkModel[]>}
     */
    fetchBookmarkList() {
      return this.$store.dispatch(Actions.FETCH_BOOKMARK_LIST)
    },
    /**
     * @param {number} id
     * @return {Promise<Chapter>}
     */
    fetchChapterById(id) {
      return this.$store.dispatch(Actions.FETCH_CHAPTER_BY_ID, id)
    },
    /**
     * @param {BookMarkRequestParam}
     * @return {Promise<BookMarkModel>}
     */
    addBookmark() {
      if (this.active > 0) {
        return this.$store.dispatch(Actions.ADD_BOOKMARK, { chapter: this.active })
      }
    },
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
        this.fetchBookmarkList()
        if (!targetModel) {
          const chapter = await this.fetchChapterById(id)
          apiPostHistory({ chapter: id })
          modelList.push(chapter)
        }
      } else {
        this.$router.replace({ name: RouterName.HOME })
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
