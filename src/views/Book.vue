<template>
  <div>
    <div v-if="modelList">
      <div v-if="modelList.length">
        <div v-for="model in modelList" :key="model.id">
          {{ model }}
        </div>
      </div>
    </div>
    <div v-else>
      <div></div>
    </div>
  </div>
</template>

<script>
import BasePage from '@/extends/base-page'
import { apiGetBookList, apiGetBookById } from '@/api/index'

/**
 * @type {ComponentOptions}
 * @extends {BasePage}
 */
export default {
  name: 'Book',
  extends: BasePage,
  data() {
    return {
      modelList: [],
      active: -1,
    }
  },
  computed: {
    /**
     * @returns {BookModel}
     */
    targetModel() {
      return this.modelList.find((p) => p.id === this.active)
    },
  },
  watch: {
    $route() {
      this.effectComponentPage()
    },
  },
  async created() {
    // await this.passLogin()
    this.effectComponentPage()
  },
  methods: {
    /**
     * @depend
     * @this {ComponentOptions}
     * @param {Route} this._$route
     * @param {BookModel} this.targetModel
     * @param {BookModel[]} this.modelList
     * @param {number} this.active
     */
    async effectComponentPage() {
      /** @type {Route} */
      const route = this._$route
      /** @type {BookModel} */
      const targetModel = this.targetModel
      /** @type {BookModel[]} */
      const modelList = this.modelList
      /** @type {number} */
      const id = route.params.id

      if (id) {
        this.active = id
        const target = targetModel
        if (!target) {
          const res = await apiGetBookById(id)
          modelList.push(res.data)
        }
      } else {
        this.active = -1
        const res = await apiGetBookList()
        this.modelList = res.data
      }
    },
  },
}
</script>
