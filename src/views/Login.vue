<template>
  <main>
    <form title="帳號登入的表單" action="" @submit="signIn">
      <h2 title="這裡是登入頁面">Login</h2>
      <input id="user-email" v-model="user.email" type="email" name="user-email" title="這裡輸入帳號信箱" />
      <input id="user-password" v-model="user.password" type="password" name="user-password" title="這裡輸入帳號密碼" />
      <button type="submit" title="點擊登入">登入</button>
    </form>
  </main>
</template>

<script>
import { authRequest } from '../api/request'

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    signIn() {
      const vm = this
      const user = vm.user
      authRequest(user)
    },
    async fetchUserApi(user) {
      try {
        const res = await authRequest(user)
        if (res.success) {
        }
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
form {
  max-width: $xs;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
}

input,
button {
  font-size: 2rem;
}
</style>
