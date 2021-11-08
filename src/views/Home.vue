<template>
  <div>
    <div>liff: {{ path || 'not path' }}</div>
    <div>href: {{ href || 'not href' }}</div>
    <template v-if="route">
      <div v-if="route.name === routerName.Chapter">
        <Chapter :route="route" />
      </div>
    </template>
  </div>
</template>

<script>
import { routerName } from '@/consts'
import Chapter from './Chapter'
// import liff from '@line/liff'

export default {
  name: 'Home',
  components: {
    Chapter,
  },
  data() {
    return {
      route: null,
      routerName,
      path: '',
      href: '',
    }
  },
  async created() {
    // await liff.init({ liffId: '1656538444-L3wP67PM' })
    const { 'liff.state': path } = this.$route.query
    this.path = path
    this.href = location.href
    if (path) {
      const locationData = this.$router.resolve(path)
      this.route = locationData.route
    }
  },
  methods: {},
}
</script>
