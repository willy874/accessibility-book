<template>
  <div>
    <h2>書籍列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="targetModel">
      <h3>{{ targetModel.name }}</h3>
      <div v-for="model in targetModel.chapter_set" :key="model.id" class="book__list-item">
        <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else-if="bookList && bookList.length">
      <div v-for="model in bookList" :key="model.id" class="book__list-item">
        <RouterLink :to="getBookRoute(model.id)">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else>無資料</div>
  </div>
</template>

<script>
import { RouterName, Getters, Actions } from '@/consts'

export default {
  name: 'Book',
  data() {
    return {
      active: '',
      loading: false,
    }
  },
  computed: {
    /**
     * @return {ChapterModel[]}
     */
    bookList() {
      return this.$store.getters[Getters.BOOK_LIST]
    },
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.bookList.find((p) => p.id === this.active)
    },
  },
  methods: {
    /**
     * @return {Promise<BookModel[]>}
     */
    fetchBookList() {
      return this.$store.dispatch(Actions.FETCH_BOOK_LIST)
    },
    /**
     * @param {string} id
     * @return {Promise<BookModel>}
     */
    fetchBookById(id) {
      return this.$store.dispatch(Actions.FETCH_BOOK_BY_ID, id)
    },
    /**
     * @param {JsonData} query
     * @return {Promise<BookModel[]>}
     */
    fetchBookListByQuery(query) {
      return this.$store.dispatch(Actions.FETCH_BOOK_LIST_BY_QUERY, query)
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
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getBookRoute(id) {
      return {
        name: RouterName.BOOK_DETAIL,
        params: { id },
      }
    },
    /**
     * @depend
     * @param {Route} this.route
     * @param {string} this.active
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      /** @type {string} */
      const id = this.route.params.id
      const query = this.route.query
      if (id) {
        this.active = id
        await this.fetchBookById(id)
      } else if (query.tag__name) {
        this.active = ''
        await this.fetchBookListByQuery(query)
      } else {
        this.active = ''
        await this.fetchBookList()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 8px;
}
h3 {
  margin-bottom: 8px;
}
.book__list-item {
  padding: 8px;
  font-size: 20px;
}
</style>
