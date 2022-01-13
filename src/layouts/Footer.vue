<template>
  <footer>
    <nav>
      <ul class="footer-nav">
        <!-- 1 -->
        <template>
          <li v-if="route.name === RouterName.HOME">
            <RouterLink :to="{ name: RouterName.USER }">使用者</RouterLink>
          </li>
          <li v-else>
            <RouterLink :to="{ name: RouterName.HOME }">首頁</RouterLink>
          </li>
        </template>
        <!-- 2 -->
        <li>
          <a href="javascript:;" @click="routerBack">返回</a>
        </li>
        <!-- 3 -->
        <template>
          <li v-if="route.name === RouterName.CHAPTER && nextChapterRoute">
            <RouterLink :to="nextChapterRoute">下一章</RouterLink>
          </li>
          <li v-else>
            <a href="javascript:;"></a>
          </li>
        </template>
        <!-- 4 -->
        <li>
          <RouterLink :to="{ name: RouterName.NAVIGATION }">目錄</RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
import { RouterName } from '@/consts'
export default {
  name: 'Footer',
  data() {
    return {
      RouterName,
    }
  },
  computed: {
    /**
     * @return {BookModel}
     */
    activeBook() {
      return this.$store.state.chapter.activeBook
    },
    activeChapterIndexOf() {
      const chapterId = Number(this.route.params.id)
      const chapterList = this.activeBook?.chapter_set
      if (chapterList) {
        return chapterList.map((p) => p.id).indexOf(chapterId)
      }
      return -1
    },
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
  },
  methods: {
    routerBack() {
      this.$router.back()
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
      a {
        width: 100%;
        height: 100%;
        line-height: 80px;
        text-align: center;
        color: black;
        &.router-link-exact-active {
          cursor: auto;
          background: #42b983;
          color: white;
        }
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
