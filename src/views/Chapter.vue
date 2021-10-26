<template>
  <div>
    <div v-html="contentHtml"></div>
  </div>
</template>

<script>
import { apiGetChapterById } from '@/api/index'

export default {
  name: 'Home',
  data() {
    return {
      chapter: {
        book: '',
        content: '',
        created: '',
        id: 0,
        name: '',
        no: 0,
      },
    }
  },
  computed: {
    contentHtml() {
      return this.$markdown.render(this.chapter.content)
    },
  },
  watch: {
    $route(to) {
      this.effectPage(to)
    },
  },
  created() {
    this.effectPage(this.$route)
  },
  methods: {
    effectPage(route) {
      const id = route.params.id
      if (id) {
        this.fetchChapterById(id)
      }
    },
    async fetchChapterById(id) {
      try {
        const res = await apiGetChapterById(id)
        this.chapter = res.data
      } catch (error) {}
    },
  },
}
</script>
