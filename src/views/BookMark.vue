<template>
  <div>
    <h2>書籤列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="bookMarkList.length">
      <div v-for="model in bookMarkList" :key="model.id">
        <div class="bookmark__list-item">
          <RouterLink :to="getChapterRoute(model.chapter)">{{ model.chapter_name }}</RouterLink>
          <button @click="throttleDeleteBookMark(model.id)">刪除</button>
        </div>
      </div>
    </div>
    <div v-else>無資料</div>
  </div>
</template>

<script>
import { throttle } from '@/utils'
import { RouterName, Getters, Actions } from '@/consts'

export default {
  name: 'BookMark',
  data() {
    return {
      /** @type {BookMarkModel[]} */
      throttleDeleteBookMark: throttle(this.deleteBookmark, 400),
    }
  },
  computed: {
    bookMarkList() {
      return this.$store.getters[Getters.BOOKMARK_LIST]
    },
  },
  methods: {
    /**
     * @param {number} id
     * @return {Promise<BookMarkModel>}
     */
    deleteBookmark(id) {
      return this.$store.dispatch(Actions.DELETE_BOOKMARK, id)
    },
    /**
     * @return {Promise<BookMarkModel[]>}
     */
    fetchBookmarkList() {
      return this.$store.dispatch(Actions.FETCH_BOOKMARK_LIST)
    },
    /**
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return {
        name: RouterName.CHAPTER,
        params: { id },
      }
    },
    /**
     * @depend
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      await this.fetchBookmarkList()
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 8px;
}
.bookmark__list-item {
  padding: 8px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
</style>
