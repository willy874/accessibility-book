import dayjs from 'dayjs'
import Config from '@/config'
import { Actions, LifecycleHook } from '@/consts'

export default {
  watch: {
    $route() {
      this.effectComponentPage(LifecycleHook.WATCH_ROUTE)
    },
  },
  created() {
    this.effectComponentPage(LifecycleHook.CREATED)
  },
  mounted() {
    this.effectComponentPage(LifecycleHook.MOUNTED)
  },
  updated() {
    this.effectComponentPage(LifecycleHook.UPDATED)
  },
  activated() {
    this.effectComponentPage(LifecycleHook.ACTIVATED)
  },
  deactivated() {
    this.effectComponentPage(LifecycleHook.DEACTIVATED)
  },
  destroyed() {
    this.effectComponentPage(LifecycleHook.DESTROYED)
  },
  computed: {
    isShow() {
      return !Config.value.loginRoutes.includes(this.route.name)
    },
    route() {
      return this.$store.state.route || this.$route
    },
  },
  methods: {
    /**
     * @param {LifecycleHookEnum} type
     * @return {Promise<unknown>}
     */
    async effectComponentPage(type) {
      return type
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
