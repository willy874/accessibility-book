import Config from '@/config'
import { LifecycleHook, RouterName } from '@/consts'

export default {
  data() {
    return {
      loop: true,
      RouterName,
    }
  },
  watch: {
    async $route() {
      if (this.effectRoute && this.loop) {
        this.loop = false
        await this.effectRoute(LifecycleHook.WATCH_ROUTE)
        this.$nextTick(() => (this.loop = true))
      }
    },
  },
  async created() {
    if (this.loop) {
      this.loop = false
      if (this.effectRoute) await this.effectRoute(LifecycleHook.CREATED)
      if (this.effectComponent) await this.effectComponent(LifecycleHook.CREATED)
      this.$nextTick(() => (this.loop = true))
    }
  },
  async mounted() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.MOUNTED)
      this.$nextTick(() => (this.loop = true))
    }
  },
  async updated() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.UPDATED)
      this.$nextTick(() => (this.loop = true))
    }
  },
  async activated() {
    if (this.loop) {
      this.loop = false
      if (this.effectRoute) await this.effectRoute(LifecycleHook.ACTIVATED)
      if (this.effectComponent) await this.effectComponent(LifecycleHook.ACTIVATED)
      this.$nextTick(() => (this.loop = true))
    }
  },
  async deactivated() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.DEACTIVATED)
      this.$nextTick(() => (this.loop = true))
    }
  },
  async destroyed() {
    if (this.effectComponent && this.loop) {
      this.loop = false
      await this.effectComponent(LifecycleHook.DESTROYED)
      this.$nextTick(() => (this.loop = true))
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading
    },
    isShow() {
      return !Config.value.loginRoutes.includes(this.route.name)
    },
  },
}
