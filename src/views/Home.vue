<template>
  <div>
    <template v-if="route">
      <h2 v-if="route.name === RouterName.HOME">首頁</h2>
      <div v-if="route.name === RouterName.CHAPTER">
        <Chapter :route="route" />
      </div>
      <div v-if="route.name === RouterName.TAG">
        <Tag :route="route" />
      </div>
      <div v-if="route.name === RouterName.BOOK">
        <Book :route="route" />
      </div>
    </template>
  </div>
</template>

<script>
import { RouterName } from '@/consts'
import Chapter from './Chapter.vue'
import Tag from './Tag.vue'
import Book from './Book.vue'

/**
 * @type {ComponentOptions}
 */
export default {
  name: 'Home',
  components: {
    Chapter,
    Tag,
    Book,
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
