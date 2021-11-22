<template>
  <div>
    <template v-if="route">
      <div v-if="route.name === RouterName.CHAPTER">
        <Chapter :route="route" />
      </div>
    </template>
  </div>
</template>

<script>
import consts from '@/consts'
import Chapter from './Chapter'
// import liff from '@line/liff'

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
  data() {
    return {
      route: null,
      RouterName,
      path: '',
      href: '',
    }
  },
  watch: {
    $route() {
      this.effectComponentPage()
    },
  },
  async created() {
    // await liff.init({ liffId: '1656538444-L3wP67PM' })
    this.effectComponentPage()
  },
  methods: {
    effectComponentPage() {
      const { 'liff.state': path } = this.$route.query
      this.path = path
      this.href = location.href
      if (path) {
        const locationData = this.$router.resolve(path)
        this.route = locationData.route
      }
    },
  },
}
</script>
