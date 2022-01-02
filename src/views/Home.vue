<template>
  <div>
    <template v-if="route">
      <div v-if="route.name === RouterName.HOME">
        <h2>首頁</h2>
        <section id="news">
          <h4 class="section-title">最新消息</h4>
        </section>
        <section id="release_list">
          <h4 class="section-title">最新上架</h4>
        </section>
        <section id="recommend_list">
          <h4 class="section-title">推薦書單</h4>
        </section>
      </div>
      <div v-if="route.name === RouterName.CHAPTER">
        <Chapter :route="route" />
      </div>
      <div v-if="route.name === RouterName.TAG">
        <Tag :route="route" />
      </div>
      <div v-if="route.name === RouterName.BOOK">
        <Book :route="route" />
      </div>
      <div v-if="route.name === RouterName.BOOKMARK">
        <BookMark :route="route" />
      </div>
    </template>
  </div>
</template>

<script>
import { RouterName } from '@/consts'
import Chapter from './Chapter.vue'
import Tag from './Tag.vue'
import Book from './Book.vue'
import BookMark from './BookMark.vue'

export default {
  name: 'Home',
  components: {
    Chapter,
    Tag,
    Book,
    BookMark,
  },
  props: {
    route: {
      type: [Object, null],
      default: () => null,
    },
  },
  data() {
    return {
      RouterName,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.section-title {
  text-align: center;
  font-size: 1.5rem;
}
</style>
