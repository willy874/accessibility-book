<template>
  <div>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="targetModel">
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
      <div>無資料</div>
    </div>
  </div>
</template>

<script>
import { transformMarkdownToHtml, throttle } from '@/utils'
import { apiPostHistory } from '@/api/index'
import { RouterName, Getters, Actions } from '@/consts'

export default {
  name: 'Chapter',
  data() {
    return {
      active: null,
      throttleAddBookMark: throttle(this.addBookmark, 400),
    }
  },
  computed: {
    /**
     * @return {ChapterModel[]}
     */
    chapterList() {
      return this.$store.getters[Getters.CHAPTER_LIST]
    },
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.chapterList.find((p) => p.id === this.active)
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
     * @return {Promise<ChapterModel>}
     */
    fetchChapterById(id) {
      return this.$store.dispatch(Actions.FETCH_CHAPTER_BY_ID, id)
    },
    /**
     * @param {BookMarkRequestParam}
     * @return {Promise<BookMarkModel>}
     */
    addBookmark() {
      if (this.active) {
        return this.$store.dispatch(Actions.ADD_BOOKMARK, { chapter: this.active })
      }
    },
    /**
     * @depend
     * @param {Route} this.route
     * @param {number} this.active
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      /** @type {number} */
      const id = Number(this.route.params.id)
      if (id) {
        this.active = id
        await this.fetchBookmarkList()
        await this.fetchChapterById(id)
        await apiPostHistory({ chapter: id })
      } else {
        this.active = null
        await this.$router.replace({ name: RouterName.HOME })
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
