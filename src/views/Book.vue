<template>
  <div>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="targetModel">
      <h2>章節列表</h2>
      <h3>{{ targetModel.name }}</h3>
      <div v-for="model in chapterListSort" :key="model.id" class="book__list-item">
        <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else-if="bookListByLast && bookListByLast.length">
      <h2>書籍列表</h2>
      <div v-for="model in bookListByLast" :key="model.id" class="book__list-item">
        <RouterLink :to="getBookRoute(model.id)">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else>無資料</div>
  </div>
</template>

<script>
import { RouterName, Getters, Actions } from '@/consts'
import VueConfig from '@/config'
import { mapActions, mapGetters } from 'vuex'

/**
 * @type {{
 *   bookList: GetterFunction<import('@/store/book').bookList>
 * }}
 */
const { bookList } = mapGetters({
  bookList: Getters.BOOK_LIST,
})

/**
 * @type {{
 *   fetchBookList: ActionFunction<import('@/store/book').fetchBookList>,
 *   fetchBookByQuery: ActionFunction<import('@/store/book').fetchBookByQuery>,
 *   fetchBookById: ActionFunction<import('@/store/book').fetchBookById>,
 * }}
 */
const { fetchBookList, fetchBookByQuery, fetchBookById } = mapActions({
  fetchBookList: Actions.FETCH_BOOK_LIST,
  fetchBookByQuery: Actions.FETCH_BOOK_BY_ID,
  fetchBookById: Actions.FETCH_BOOK_BY_QUERY,
})

export default {
  name: 'Book',
  data() {
    return {
      active: '',
      loading: false,
      bookListByLast: [],
    }
  },
  computed: {
    bookList,
    /**
     * @return {BookModel|null}
     */
    targetModel() {
      return this.bookList.find((p) => p.id === this.active) || null
    },
    /**
     * @return {ChapterIndex[]}
     */
    chapterListSort() {
      if (this.targetModel && this.targetModel.chapter_set) {
        return this.targetModel.chapter_set.map((p) => p).sort((p, n) => p.no - n.no)
      }
      return []
    },
  },
  methods: {
    fetchBookList,
    fetchBookById,
    fetchBookByQuery,
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return {
        name: RouterName.CHAPTER,
        params: { id },
      }
    },
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getBookRoute(id) {
      return {
        name: RouterName.BOOK_DETAIL,
        params: { id },
      }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      const route = VueConfig.getRoute(this)
      const id = route.params.id
      const query = route.query
      if (id) {
        this.active = id
        await this.fetchBookById(Number(id))
      } else if (query.tag__name) {
        this.active = ''
        this.bookListByLast = await this.fetchBookByQuery(query)
      } else {
        this.active = ''
        this.bookListByLast = await this.fetchBookList()
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
