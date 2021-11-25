<template>
  <div>
    <template v-if="route">
      <h2 v-if="route.name === RouterName.HOME">首頁</h2>
      <div v-if="route.name === RouterName.CHAPTER">
        <Chapter :route="route" />
      </div>
    </template>
  </div>
</template>

<script>
import consts from '@/consts'
import Chapter from './Chapter'

/**
 * @enum {number}
 * @readonly
 */
const RouterName = consts.routerName

/**
 * @type {ComponentOptions}
 */
export default {
  name: 'Home',
  components: {
    Chapter,
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
