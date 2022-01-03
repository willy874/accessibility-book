<template>
  <div>
    <button class="signout-button" type="button" @click="signOut">登出</button>
  </div>
</template>

<script>
import { apiPostLogout } from '@/api'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { RouterName, LocalStorageKey } from '@/consts'

export default {
  name: 'User',
  methods: {
    async signOut() {
      try {
        const res = await apiPostLogout()
        if (res.isAxiosError) {
          throw new HttpError(res)
        }
        localStorage.removeItem(LocalStorageKey.TOKEN)
        this.$router.replace({ name: RouterName.LOGIN })
      } catch (error) {
        handleHttpErrorLog(error)
      }
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
