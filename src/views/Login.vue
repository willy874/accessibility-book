<template>
  <main>
    <form title="帳號登入的表單" @submit="signIn">
      <h2 class="form-title" title="這裡是登入頁面">登入</h2>
      <label class="form-label" for="user-email" title="帳號信箱">帳號信箱</label>
      <input
        id="user-email"
        v-model="user.username"
        class="form-input"
        :class="[{ error: emailError }]"
        type="text"
        name="email"
        title="這裡輸入帳號信箱"
      />
      <strong v-if="emailError" class="error-msg" title="帳號信箱格式錯誤">帳號信箱格式錯誤</strong>
      <label class="form-label" for="user-password" title="密碼">密碼</label>
      <input
        id="user-password"
        v-model="user.password"
        class="form-input"
        :class="[{ error: passwordError }]"
        type="password"
        name="password"
        title="這裡輸入帳號密碼"
      />
      <strong v-if="passwordError" class="error-msg" title="帳號密碼格式錯誤">帳號密碼格式錯誤</strong>
      <!-- <p>{{ emailError }}</p> -->
      <button type="submit" title="點擊登入" class="btn-submit">登入</button>
      <button type="button" title="點擊使用Line登入" class="btn-submit" @click="linkLineSignIn">Line登入</button>
    </form>
  </main>
</template>

<script>
import { apiPostUser } from '@/api'

/**
 * @type {ComponentOptions}
 */
export default {
  data() {
    return {
      user: { username: 'user', password: 'zY7bSBgk' },
      emailError: false,
      passwordError: false,
    }
  },
  computed: {
    lineUrl() {
      const qs = new URLSearchParams({
        response_type: 'code',
        client_id: 'client_id',
        redirect_uri: location.href,
        state: '12345abcde',
        scope: 'profile%20openid',
        nonce: '09876xyz',
      })
      return 'https://access.line.me/oauth2/v2.1/authorize?' + qs.toString()
    },
  },
  methods: {
    signIn(e) {
      e.preventDefault()
      const vm = this
      const user = vm.user
      const error = false
      // vm.validateEmail(user.email) === false ? (vm.emailError = error = true) : (vm.emailError = error = false)
      // vm.validatePassword(user.password) === false
      //   ? (vm.passwordError = error = true)
      //   : (vm.passwordError = error = false)

      if (error === false) {
        vm.fetchUserApi(user)
      }
    },
    async fetchUserApi(user) {
      const vm = this
      try {
        const res = await apiPostUser(user)
        if (!res.isAxiosError) {
          const token = res.data.key
          localStorage.setItem('token', token)
          vm.$router.replace(this.$route.query.replacePath || '/')
        }
      } catch (error) {}
    },
    validateEmail(email) {
      const reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(String(email).toLowerCase())
    },
    validatePassword(password) {
      const reg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/
      return reg.test(String(password))
    },
    linkLineSignIn() {},
  },
}
</script>

<style lang="scss">
form {
  max-width: $xs;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border: 1px solid #217842;
  border-radius: 0.5rem;
  background-color: #e0fff3;
}

.form-input,
.btn-submit {
  font-size: 2rem;
  border-radius: 0.5rem;
  padding: 1rem;
  outline-color: #217842;
  border: 1px solid #217842;
}

.form-label {
  font-size: 1.5rem;
}

.btn-submit {
  margin: 2rem 0;
  background-color: #217842;
  color: #e0fff3;
  &:hover {
    background-color: #1a5f34;
  }
}

.error-msg {
  color: red;
  font-size: 1.2rem;
}

.form-title {
  font-size: 2.5rem;
  text-align: center;
}

.error {
  outline-color: red;
  border-color: red;
}
</style>
