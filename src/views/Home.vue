<template>
  <div>
    <div v-if="route.name === routerName.Chapter">
      <Chapter :route="route" />
    </div>
  </div>
</template>

<script>
import { routerName } from '@/consts'
import Chapter from './Chapter'

export default {
  name: 'Home',
  components: {
    Chapter,
  },
  data() {
    return {
      route: null,
      routerName,
    }
  },
  created() {
    const { 'liff.state': path } = this.$route.query
    const locationData = this.$router.resolve(path)
    this.route = locationData.route
  },
  methods: {},
}
</script>
