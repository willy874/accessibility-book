<template>
  <div id="app">
    <template v-if="route">
      <router-view :route="route" />
      <div v-if="route.name !== RouterName.LOGIN">
        <Header />
      </div>
    </template>
  </div>
</template>
<script>
import 'markdown-it-latex/dist/index.css'
import Header from './layouts/Header.vue'
import consts from '@/consts'
// import liff from '@line/liff'

/**
 * @enum {number}
 * @readonly
 */
const RouterName = consts.routerName

export default {
  name: 'App',
  components: {
    Header,
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
      this.changeRoute()
    },
  },
  async created() {
    // await liff.init({ liffId: '1656538444-L3wP67PM' })
    this.changeRoute()
  },
  methods: {
    changeRoute() {
      const { query } = this.$route
      if (query && query['liff.state']) {
        const { 'liff.state': path } = query
        this.path = path
        this.href = location.href
        if (path) {
          const locationData = this.$router.resolve(path)
          this.route = locationData.route
        } else {
          this.route = null
        }
      } else {
        this.route = this.$route
      }
    },
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
