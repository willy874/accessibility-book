<template>
  <div>
    <div v-if="model">
      <div v-html="transformMarkdownToHtml(model.content)"></div>
    </div>
  </div>
</template>

<script>
import BasePage from '@/extends/base-page'
import { transformMarkdownToHtml } from '@/utils'
import { apiGetChapterById, apiPostUser } from '@/api/index'

/**
 * @type {ComponentOptions}
 * @extends {BasePage}
 */
export default {
  name: 'Chapter',
  extends: BasePage,
  data() {
    return {
      model: {
        book: '',
        content: '',
        created: '',
        id: 0,
        name: '',
        no: 0,
      },
    }
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
    transformMarkdownToHtml,
    async passLogin() {
      const res = await apiPostUser({ username: 'ryan', password: '123456' })
      localStorage.setItem('token', res.data.key)
    },
    async effectComponentPage() {
      /** @type {Router} */
      const route = this._$route

      const id = route.params.id
      if (id) {
        const res = await apiGetChapterById(id)
        this.model = res.data
      }
    },
  },
}
</script>
