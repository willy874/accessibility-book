<template>
  <div>
    <div v-html="transformMarkdownToHtml(model.content)"></div>
  </div>
</template>

<script>
import BasePage from '@/extends/base-page'
import { apiGetChapterById } from '@/api/index'

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
      this.effectPage()
    },
  },
  created() {
    this.effectPage()
  },
  methods: {
    effectPage() {
      const id = this.baseRoute.params.id
      if (id) {
        this.fetchChapterById(id)
      }
    },
    async fetchChapterById(id) {
      try {
        const res = await apiGetChapterById(id)
        this.model = res.data
      } catch (error) {}
    },
  },
}
</script>
