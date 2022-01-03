<template>
  <div id="app">
    <template v-if="route">
      <Header v-if="isShow" class="header" />
      <article>
        <div class="main">
          <router-view />
        </div>
      </article>
      <Footer v-if="isShow" class="footer" />
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
    const liff = this.$route.query && this.$route.query['liff.state']
    if (Config.value.liff || liff) {
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
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  flex-shrink: 0;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.footer {
  flex-shrink: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
article {
  flex-grow: 1;
  height: 0;
  position: relative;
  .main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    overflow: auto;
  }
}
</style>
