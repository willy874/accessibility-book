<template>
  <div>
    <button class="logout-button" type="button" @click="logout">登出</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Actions } from '@/consts'
import { throttle } from '@/utils'

/**
 * @type {{
 *   logout: ActionFunction<import('@/store/user/actions').logout>
 * }}
 */
const { logout } = mapActions({
  logout: Actions.LOGOUT,
})

export default {
  name: 'User',
  methods: {
    logout: throttle(logout, 400),
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
