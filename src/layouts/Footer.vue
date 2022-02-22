<template>
  <footer>
    <nav>
      <ul class="footer-nav">
        <!-- 1 -->
        <li>
          <a href="javascript:;" @click="routerBack">返回</a>
        </li>
        <!-- 2 -->
        <li :class="{ disabled: !(chapterId && !isBookMark) }">
          <template v-if="chapterId">
            <a v-if="isBookMark" href="javascript:;">已加入書籤</a>
            <a v-else href="javascript:;" @click="throttleAddBookMark">建立書籤</a>
          </template>
          <template v-else>
            <a href="javascript:;">建立書籤</a>
          </template>
        </li>
        <!-- 3 -->
        <li :class="{ disabled: !(chapterId && nextChapterRoute) }">
          <template v-if="chapterId">
            <RouterLink v-if="nextChapterRoute" :to="nextChapterRoute">下一章</RouterLink>
            <a v-else href="javascript:;">最後一章</a>
          </template>
          <template v-else>
            <a href="javascript:;">下一章</a>
          </template>
        </li>
        <!-- 4 -->
        <li>
          <RouterLink :to="{ name: RouterName.NAVIGATION }">目錄</RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
import { RouterName, Actions, Getters, LifecycleHook } from '@/consts'
import { throttle } from '@/utils'

export default {
  name: 'Footer',
  data() {
    return {
      RouterName,
      throttleAddBookMark: throttle(this.addBookmark, 400),
    }
  },
  computed: {
    /**
     * @return {BookModel}
     */
    activeBook() {
      return this.$store.state.chapter.activeBook
    },
    /**
     * @return {number}
     */
    activeChapterIndexOf() {
      const chapterId = Number(this.route.params.id)
      const chapterList = this.activeBook?.chapter_set
      if (chapterList) {
        return chapterList.map((p) => p.id).indexOf(chapterId)
      }
      return -1
    },
    /**
     * @return {number | false}
     */
    nextChapterRoute() {
      if (this.activeBook && this.activeChapterIndexOf >= 0) {
        const nextChapter = this.activeBook.chapter_set[this.activeChapterIndexOf + 1]
        if (nextChapter) {
          return {
            name: RouterName.CHAPTER,
            params: { id: nextChapter.id },
          }
        }
      }
      return false
    },
    /**
     * @return {number | false}
     */
    chapterId() {
      if (this.route.name === RouterName.CHAPTER) {
        /** @type {number} */
        return Number(this.route.params.id)
      }
      return false
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
      console.log(this.bookmarkList)
      return this.bookmarkList.some((item) => item.chapter === this.chapterId)
    },
  },
  methods: {
    routerBack() {
      this.$router.back()
    },
    /**
     * @param {BookMarkRequestParam}
     * @return {Promise<BookMarkModel>}
     */
    addBookmark() {
      console.log(this.chapterId)
      if (this.chapterId) {
        return this.$store.dispatch(Actions.ADD_BOOKMARK, { chapter: this.chapterId })
      }
    },
    /**
     * @return {Promise<BookMarkModel[]>}
     */
    fetchBookmarkList() {
      return this.$store.dispatch(Actions.FETCH_BOOKMARK_LIST)
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      if (type === LifecycleHook.CREATED) {
        await this.fetchBookmarkList()
      }
    },
  },
}
</script>

<style lang="scss">
footer {
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  .footer-nav {
    display: flex;
    flex-wrap: nowrap;
    li {
      flex: 1;
      width: 0;
      text-align: center;
      border: 1px solid gray;
      display: flex;
      align-items: center;
      &.disabled a {
        pointer-events: none;
        opacity: 0.5;
      }
      a {
        width: 100%;
        height: 100%;
        line-height: 80px;
        text-align: center;
        color: black;
        &:hover {
          cursor: pointer;
          background: #42b983;
          color: white;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
