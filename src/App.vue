<template>
  <div id="app">
    <template v-if="route">
      <div v-if="isShow">
        <Header />
      </div>
      <router-view class="main" :route="route" />
      <div v-if="isShow">
        <Footer />
      </div>
    </template>
  </div>
</template>
<script>
import 'markdown-it-latex/dist/index.css'
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
import { RouterName, LocalStorageKey } from '@/consts'
import Config from './config'
import liff from '@line/liff'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      route: null,
      path: '',
      href: '',
    }
  },
  computed: {
    isShow() {
      return !Config.value.loginRoutes.includes(this.route.name)
    },
  },
  watch: {
    $route() {
      this.changeRoute()
    },
  },
  async created() {
    if (Config.value.liff) {
      await liff.init({ liffId: Config.value.liffId })
    }
    this.changeRoute()
  },
  methods: {
    changeRoute() {
      this.route = Config.getRoute(this)
      console.log('onRouteChange', this.route)
      const isLogin = Boolean(localStorage.getItem(LocalStorageKey.TOKEN))
      const loginRoutes = Config.value.loginRoutes
      if (!isLogin && !loginRoutes.includes(this.route.name)) {
        localStorage.setItem(LocalStorageKey.REPLACE_PATH, this.route.path)
        this.$router.replace({ name: RouterName.LOGIN })
      }
    },
  },
}
</script>
<style lang="scss">
@import './style/main.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.main {
  padding: 1rem;
  margin: 8rem auto 10rem auto;
}
</style>
