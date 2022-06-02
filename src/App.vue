<template>
  <div id="app">
    <template v-if="route">
      <Header v-if="isShow" :logo="headerLogo" class="header" />
      <main class="main">
        <article class="article">
          <router-view />
        </article>
      </main>
      <Footer v-if="isShow" class="footer" />
    </template>
  </div>
</template>
<script>
import 'markdown-it-latex/dist/index.css'
import { mapActions } from 'vuex'
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
import { StorageKey, Actions, RouterName } from '@/consts'
import Config from './config'
import liff from '@line/liff'
import { getStorage, useImage } from '@/utils'

/**
 * @type {{
 *   fetchUserInfo: ActionFunction<import('@/store/user/actions').fetchUserInfo>
 *   routeChange: ActionFunction<import('@/store/root').routeChange>
 *   fetchSiteConf: ActionFunction<import('@/store/root').fetchSiteConf>
 *   checkLoginReplace: ActionFunction<import('@/store/user/actions').checkLoginReplace>
 *   fetchTagList: ActionFunction<import('@/store/tag').fetchTagList>
 * }}
 */
const { fetchUserInfo, routeChange, fetchSiteConf, checkLoginReplace, fetchTagList } = mapActions({
  fetchUserInfo: Actions.FETCH_USER_INFO,
  routeChange: Actions.ROUTE_CHANGE,
  fetchSiteConf: Actions.FETCH_SITE_CONF,
  checkLoginReplace: Actions.CHECK_LOGIN_REPLACE,
  fetchTagList: Actions.FETCH_TAG_LIST,
})

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      config: Config.value,
      route: Config.getRoute(this),
      headerLogo: Config.value.site_conf.logo1,
    }
  },
  watch: {
    $route() {
      this.changeRoute()
    },
  },
  async created() {
    const isLiff = this.$route.query && this.$route.query['liff.state']
    if (this.config.liff || isLiff) {
      await liff.init({ liffId: this.config.liffId })
    }
    if (await getStorage(StorageKey.TOKEN)) {
      const userInfo = await this.fetchUserInfo()
      if (userInfo) {
        if (userInfo.is_password_set && userInfo.is_authorized) {
          const isLogin = await this.checkLoginReplace()
          if (isLogin) {
            this.loginInit()
          }
        } else {
          this.$router.replace({ name: RouterName.REGISTER })
        }
      }
    }
    this.changeRoute()
    this.setSiteConf()
  },
  methods: {
    fetchUserInfo,
    routeChange,
    checkLoginReplace,
    fetchTagList,
    fetchSiteConf,
    async setSiteConf() {
      const data = await this.fetchSiteConf()
      Config.setConfig((config) => {
        Object.assign(
          config,
          Config.assignConfig({
            baseUrl: data.domain,
            site_conf: data,
          })
        )
      })
      return Promise.all([this.setHeadIcon(data.favicon), this.setTitle(data.site_name), this.setLogo(data.logo1)])
    },
    /**
     * @return {Promise<Route>}
     */
    changeRoute() {
      return this.routeChange(this)
    },
    /**
     * @return {Promise<any[]>}
     */
    loginInit() {
      return Promise.all([this.fetchTagList()])
    },
    setHeadIcon(url) {
      /** @type {HTMLLinkElement} */
      const iconLink = document.querySelector('link[rel=icon]')
      return new Promise((resolve, reject) => {
        useImage(url)
          .then(() => {
            iconLink.href = url
            resolve()
          })
          .catch(reject)
      })
    },
    setTitle(siteName) {
      const route = Config.getRoute(this)
      const title = `${siteName} - ${route.meta.title}`
      document.querySelector('title').innerHTML = title
    },
    setLogo(url) {
      return new Promise((resolve, reject) => {
        useImage(url)
          .then(() => {
            this.headerLogo = url
            resolve()
          })
          .catch(reject)
      })
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
.main {
  flex-grow: 1;
  height: 0;
  position: relative;
  .article {
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
