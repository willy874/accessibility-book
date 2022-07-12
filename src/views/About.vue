<template>
  <div>
    <h2>關於</h2>
    <div class="py-4" v-html="text"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { transformMarkdownToHtml } from '@/utils/transform'
export default {
  name: 'AboutPage',
  computed: {
    ...mapState(['aboutText']),
    text() {
      return transformMarkdownToHtml(this.aboutText)
    },
  },
}
</script>

<style></style>
