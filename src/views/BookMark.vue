<template>
  <div>
    <h2>書籤列表</h2>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else>
      <div v-if="listModel.length">
        <div v-for="model in listModel" :key="model.id">
          <div class="bookmark__list-item">
            <RouterLink :to="getChapterRoute(model.chapter)">{{ model.chapter_name }}</RouterLink>
            <button @click="deleteBookMark(model.id)">刪除</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div>沒有資料</div>
      </div>
    </template>
  </div>
</template>

<script>
import { RouterName, Actions } from '@/consts'

export default {
  name: 'BookMark',
  data() {
    return {
      /** @type {BookMarkModel[]} */
      listModel: null,
      loading: false,
    }
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
     * @param {BookMarkModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      this.loading = true
      this.listModel = await this.fetchBookmarkList()
      this.loading = false
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
