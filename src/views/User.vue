<template>
  <div>
    <button class="logout-button" type="button" @click="throttleLogout">登出</button>
  </div>
</template>

<script>
import { Actions } from '@/consts'
import { throttle } from '@/utils'

export default {
  name: 'User',
  data() {
    return {
      throttleLogout: throttle(this.logout, 400),
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch(Actions.LOGOUT)
      await this.$store.dispatch(Actions.CHECK_LOGIN_REPLACE)
    },
  },
}
</script>

<style lang="scss" scoped>
.logout-button {
  padding: 1rem;
  background: gray;
  color: white;
}
</style>
