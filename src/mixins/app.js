import dayjs from 'dayjs'
import Config from '@/config'
import { Actions, LifecycleHook } from '@/consts'

/**
 * @type {Vue}
 */
export default {
  data() {
    return {
      loop: true,
    }
  },
  watch: {
    async $route() {
      if (this.effectRoute && this.loop) {
        this.loop = false
        await this.effectRoute(LifecycleHook.WATCH_ROUTE)
        this.checkLoop()
      }
    },
  },
  async created() {
    if (this.loop) {
      this.loop = false
      if (this.effectRoute) await this.effectRoute(LifecycleHook.CREATED)
      if (this.effectComponent) await this.effectComponent(LifecycleHook.CREATED)
      this.checkLoop()
    }
  },
  async mounted() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.MOUNTED)
      this.checkLoop()
    }
  },
  async updated() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.UPDATED)
      this.checkLoop()
    }
  },
  async activated() {
    if (this.loop) {
      this.loop = false
      if (this.effectRoute) await this.effectRoute(LifecycleHook.ACTIVATED)
      if (this.effectComponent) await this.effectComponent(LifecycleHook.ACTIVATED)
      this.checkLoop()
    }
  },
  async deactivated() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.DEACTIVATED)
      this.checkLoop()
    }
  },
  async destroyed() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.DESTROYED)
      this.checkLoop()
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading
    },
    isShow() {
      return !Config.value.loginRoutes.includes(this.route.name)
    },
    route() {
      return this.$store.state.route || this.$route
    },
  },
  methods: {
    async checkLoop() {
      await this.$nextTick()
      this.loop = true
    },
    /**
     * @param {StorageKeyEnum} key
     * @return {Promise<string>}
     */
    getStorage(key) {
      return this.$store.dispatch(Actions.GET_STORAGE, key)
    },
    /**
     * @param {StorageKeyEnum} key
     * @param {string} value
     */
    setStorage(key, value) {
      this.$store.dispatch(Actions.SET_STORAGE, { key, value })
    },
    /**
     * @param {StorageKeyEnum} key
     */
    removeStorage(key) {
      this.$store.dispatch(Actions.REMOVE_STORAGE, key)
    },
    /**
     * @param {Date} date
     * @param {string} format
     * @return {string}
     */
    getDate(date, format) {
      return dayjs(date).format(format || 'YYYY/MM/DD hh:mm:ss')
    },
  },
}
