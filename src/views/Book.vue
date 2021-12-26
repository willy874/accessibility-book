<template>
  <div>
    <h2>書籍列表</h2>
    <template v-if="loading">
      <div v-if="targetModel">
        <h3>{{ targetModel.name }}</h3>
        <div v-for="model in targetModel.chapter_set" :key="model.id">
          <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
        </div>
      </div>
      <div v-else-if="listModel.length">
        <div v-for="model in listModel" :key="model.id">
          <RouterLink :to="getBookRoute(model.id)">{{ model.name }}</RouterLink>
        </div>
      </div>
      <div v-else>
        <div>沒有資料</div>
      </div>
    </template>
    <template v-else>
      <div>讀取中</div>
    </template>
  </div>
</template>

<script>
import { apiGetBookList, apiGetBookById } from '@/api/index'
import { RouterName } from '@/consts'
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
  computed: {},
  watch: {
    route() {
      this.effectComponentPage()
    },
  },
  async created() {
    // await this.passLogin()
    this.effectComponentPage()
  },
  methods: {
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
      const route = Config.getRoute()
      /** @type {number} */
      const id = route.params.id

      if (id) {
        this.active = id
        this.loading = false
        const res = await apiGetBookById(id)
        this.targetModel = res.data
        this.loading = true
      } else {
        this.active = ''
        this.targetModel = null
        this.loading = false
        const res = await apiGetBookList()
        this.listModel = res.data
        this.loading = true
      }
    },
  },
}
</script>
