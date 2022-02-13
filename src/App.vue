<template>
  <div id="app">
    <div>{{ hrefData }}</div>
    <template v-if="route">
      <Header v-if="isShow" class="header" />
      <article class="article">
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
import { StorageKey, Actions } from '@/consts'
import Config from './config'
// import liff from '@line/liff'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      path: '',
      href: '',
    }
  },
  computed: {
    hrefData() {
      return location.href
    },
  },
  watch: {
    $route() {
      this.changeRoute()
    },
  },
  async created() {
    const isLiff = this.$route.query && this.$route.query['liff.state']
    if (Config.value.liff || isLiff) {
      // await liff.init({ liffId: Config.value.liffId })
    }
    if (await this.getStorage(StorageKey.TOKEN)) {
      await this.$store.dispatch(Actions.FETCH_USER_INFO)
    }
    this.changeRoute()
  },
  methods: {
    /**
     * @return {Promise<Route>}
     */
    changeRoute() {
      return this.$store.dispatch(Actions.ROUTE_CHANGE, this)
    },
  },
}
</script>
<style lang="scss">
@import './style/main.scss';
html,
body {
  height: 100%;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.header {
  flex-shrink: 0;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.article {
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
.footer {
  flex-shrink: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
