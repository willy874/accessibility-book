<template>
  <footer>
    <nav>
      <ul class="footer-nav">
        <!-- 1 -->
        <li>
          <a href="javascript:;" @click="backRouter">返回</a>
        </li>
        <!-- 2 -->
        <li :class="{ disabled: !(chapterId && !isBookMark) }">
          <template v-if="chapterId">
            <a v-if="isBookMark" href="javascript:;">已加入書籤</a>
            <a v-else href="javascript:;" @click="addBookmark({ chapter: chapterId })">建立書籤</a>
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
          <RouterLink :to="{ name: RouterName.NAVIGATION }">選單</RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
import { RouterName, Actions, Getters, LifecycleHook } from '@/consts'
import { throttle } from '@/utils'
import VueConfig from '@/config'
import { mapActions, mapGetters, mapState } from 'vuex'

/**
 * @type {{
 *   activeBook: () => BookModel;
 * }}
 */
const { activeBook } = mapState({
  activeBook: (state) => state.chapter.activeBook,
})

/**
 * @type {{
 *   bookmarkList: () => BookMarkModel[];
 * }}
 */
const { bookmarkList } = mapGetters({
  bookmarkList: Getters.BOOKMARK_LIST,
})

/**
 * @type {{
 *   fetchBookmarkList: function(): Promise<BookMarkModel[]>;
 *   addBookmark: function(BookMarkRequestParam): Promise<BookMarkModel>;
 * }}
 */
const { fetchBookmarkList, addBookmark } = mapActions({
  fetchBookmarkList: Actions.FETCH_BOOKMARK_LIST,
  addBookmark: Actions.ADD_BOOKMARK,
})

export default {
  name: 'Footer',
  computed: {
    activeBook,
    bookmarkList,
    /**
     * @return {ChapterIndex[]}
     */
    activeBookChaptersSort() {
      if (this.activeBook && this.activeBook.chapter_set) {
        return this.activeBook.chapter_set.map((p) => p).sort((a, b) => a.no - b.no)
      }
      return []
    },
    /**
     * @return {number}
     */
    activeChapterIndexOf() {
      const route = VueConfig.getRoute(this)
      const chapterId = Number(route.params.id)
      const chapterList = this.activeBookChaptersSort
      if (chapterList.length) {
        return chapterList.map((p) => p.id).indexOf(chapterId)
      }
      return -1
    },
    /**
     * @return {VueRouteLocation | false}
     */
    nextChapterRoute() {
      if (this.activeChapterIndexOf >= 0) {
        const nextChapter = this.activeBookChaptersSort[this.activeChapterIndexOf + 1]
        if (nextChapter) {
          return {
            name: RouterName.CHAPTER,
            params: { id: String(nextChapter.id) },
          }
        }
      }
      return false
    },
    /**
     * @return {number | false}
     */
    chapterId() {
      const route = VueConfig.getRoute(this)
      if (route && route.name === RouterName.CHAPTER) {
        return Number(route.params.id)
      }
      return false
    },
    /**
     * @returns {boolean}
     */
    isBookMark() {
      return this.bookmarkList.some((item) => item.chapter === this.chapterId)
    },
  },
  methods: {
    fetchBookmarkList,
    addBookmark: throttle(addBookmark, 400),
    backRouter() {
      if (this.$router) {
        this.$router.back()
      }
    },
    /**
     * @param {import('@/consts').LifecycleHook} type
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
