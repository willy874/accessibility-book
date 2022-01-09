<template>
  <div>
    <h2>書籍列表</h2>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else>
      <div v-if="targetModel">
        <h3>{{ targetModel.name }}</h3>
        <div v-for="model in targetModel.chapter_set" :key="model.id" class="book__list-item">
          <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
        </div>
      </div>
      <div v-else-if="listModel && listModel.length">
        <div v-for="model in listModel" :key="model.id" class="book__list-item">
          <RouterLink :to="getBookRoute(model.id)">{{ model.name }}</RouterLink>
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
import Config from '@/config'

export default {
  name: 'Book',
  data() {
    return {
      /** @type {BookModel[]} */
      listModel: null,
      /** @type {BookModel} */
      targetModel: null,
      active: '',
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
     * @return {Promise<BookModel>}
     */
    fetchBookById(id) {
      return this.$store.dispatch(Actions.FETCH_BOOK_BY_ID, id)
    },
    /**
     * @return {Promise<BookModel[]>}
     */
    fetchBookList() {
      return this.$store.dispatch(Actions.FETCH_BOOK_LIST)
    },
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
     * @param {BookModel} this.targetModel
     * @param {BookModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {Route}**/
      const route = Config.getRoute(this)
      if (!route) return
      /** @type {number} */
      const id = route.params.id
      /** @type {array<T>} */
      const query = route.query
      if (id) {
        this.active = id
        this.loading = true
        this.targetModel = await this.fetchBookById(id)
        this.loading = false
      } else if (query.tag__name) {
        this.active = ''
        this.targetModel = null
        this.loading = true
        this.listModel = await this.fetchBookListByQuery(query)
        this.loading = false
      } else {
        this.active = ''
        this.targetModel = null
        this.loading = true
        this.listModel = await this.fetchBookList()
        this.loading = false
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
