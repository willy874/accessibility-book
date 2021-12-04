<template>
  <main>
    <form title="帳號登入的表單" @submit="signIn">
      <h2 class="form-title" title="這裡是登入頁面">登入</h2>
      <div>
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
      </div>
      <div>
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
        <div class="msg">
          <strong v-if="passwordError" class="error-msg" title="帳號信箱或者密碼格式錯誤"
            >帳號信箱或者密碼格式錯誤</strong
          >
        </div>
      </div>
      <button type="submit" title="點擊登入" class="btn-submit">登入</button>
      <button type="button" title="點擊使用Line登入" class="btn-submit" @click="linkLineSignIn">Line登入</button>
      <div class="msg">
        <strong v-if="passwordError" class="error-msg" title="帳號密碼格式錯誤">帳號密碼格式錯誤</strong>
      </div>
      <div class="msg">
        <strong v-if="noPass" class="error-msg" title="登入錯誤，請重新登入">登入錯誤，請重新登入</strong>
      </div>
    </form>
  </main>
</template>

<script>
import { apiPostUser, apiPostLineLogin } from '@/api'
// import { validate } from '@/utils'

/**
 * @type {ComponentOptions}
 */
export default {
  data() {
    return {
      user: { username: 'user', password: 'zY7bSBgk' },
      emailError: false,
      passwordError: false,
      noPass: false,
    }
  },
  computed: {
    lineUrl() {
      const url = 'redirect_uri=' + encodeURI('http://127.0.0.1:8000/login')
      const scope = 'scope=profile%20openid%20email'
      const qs = new URLSearchParams({
        response_type: 'code',
        client_id: '1656649897',
        state: 'state=12345abcde',
        nonce: '09876xyz',
      })

      return `https://access.line.me/oauth2/v2.1/authorize?${qs.toString()}&${url}&${scope}`
    },
  },
  created() {
    const vm = this
    if (vm.$route.query.code) {
      vm.fetchLoginApi(vm.$route.query.code)
    }
  },
  methods: {
    signIn(e) {
      e.preventDefault()
      const vm = this
      const user = vm.user
      const error = false
      // validate('email', user.email) === false ? (vm.emailError = error = true) : (vm.emailError = error = false)
      // validate('password', user.password) === false
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
          const fromPath = localStorage.getItem('fromPath')
          vm.$router.replace(fromPath || '/')
        } else {
          vm.noPass = true
        }
      } catch (error) {}
    },
    async fetchLineLoginApi(code) {
      const vm = this
      try {
        const res = await apiPostLineLogin(code)
        if (!res.isAxiosError) {
          const token = res.data.key
          localStorage.setItem('token', token)
          const fromPath = localStorage.getItem('fromPath')
          vm.$router.replace(fromPath || '/')
        } else {
          vm.noPass = true
        }
      } catch (error) {}
    },
    linkLineSignIn() {
      const vm = this
      location.href = vm.lineUrl
    },
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
  gap: 1rem;
}

input {
  box-sizing: border-box;
}

.form-input,
.btn-submit {
  font-size: 2rem;
  border-radius: 0.5rem;
  padding: 1rem;
  outline-color: #217842;
  border: 1px solid #217842;
}

.form-input {
  width: 100%;
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

.msg {
  padding-top: 0.5rem;
  height: 1rem;
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
