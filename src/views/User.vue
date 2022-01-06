<template>
  <div>
    <button class="signout-button" type="button" @click="signOut">登出</button>
  </div>
</template>

<script>
import { Actions } from '@/consts'
export default {
  name: 'User',
  methods: {
    async signOut() {
      await this.$store.dispatch(Actions.LOGOUT)
      await this.$store.dispatch(Actions.CHECK_LOGIN_REPLACE)
    },
  },
}
</script>

<style lang="scss" scoped>
.signout-button {
  padding: 1rem;
  background: gray;
  color: white;
}
</style>
