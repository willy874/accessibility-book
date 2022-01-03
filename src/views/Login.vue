<template>
  <main>
    <form class="form" title="帳號登入的表單" @submit="signIn">
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
          <strong v-if="passwordError" class="error-msg" title="帳號信箱或者密碼格式錯誤">
            帳號信箱或者密碼格式錯誤
          </strong>
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
import { apiPostUserLogin, apiPostLineLogin } from '@/api'
import { HttpError, handleHttpErrorLog } from '@/utils'
import Config from '@/config'
// import liff from '@line/liff'
// import { validate, ValidateType } from '@/utils'
import { RouterName, LocalStorageKey, Actions } from '@/consts'

export default {
  name: 'Login',
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
      const qs = new URLSearchParams({
        ...Config.value.lineLoginRequestParam,
        state: 'state=12345abcde',
      })
      return `https://access.line.me/oauth2/v2.1/authorize?${qs.toString()}`
    },
  },
  created() {
    const isLogin = Boolean(localStorage.getItem(LocalStorageKey.TOKEN))
    const responseType = Config.value.lineLoginRequestParam.response_type
    if (isLogin) {
      this.$router.replace({ name: RouterName.HOME })
    }
    if (this.$route.query[responseType]) {
      this.fetchLineLoginApi(this.$route.query[responseType])
    }
  },
  methods: {
    signIn(e) {
      e.preventDefault()
      const user = this.user
      const error = false
      // validate(ValidateType.email, user.email) === false ? (vm.emailError = error = true) : (vm.emailError = error = false)
      // validate(ValidateType.password, user.password) === false
      //   ? (vm.passwordError = error = true)
      //   : (vm.passwordError = error = false)
      if (error === false) {
        this.fetchUserApi(user)
      }
    },
    async fetchUserApi(user) {
      try {
        const res = await apiPostUserLogin(user)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          this.loginHandler(res.data.key)
        }
      } catch (error) {
        handleHttpErrorLog(error)
        this.noPass = true
      }
    },
    async fetchLineLoginApi(code) {
      try {
        const res = await apiPostLineLogin({
          code,
          return_url: Config.value.lineLoginRequestParam.redirect_uri,
        })
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          this.loginHandler(res.data.key)
        }
      } catch (error) {
        handleHttpErrorLog(error)
        this.noPass = true
      }
    },
    /**
     * @param {string} token
     * @return {Promise<Route>}
     */
    async loginHandler(token) {
      localStorage.setItem(LocalStorageKey.TOKEN, token)
      /** @type {UserModel}**/
      const userInfo = await this.$store.dispatch(Actions.FETCH_USER_INFO)
      if (userInfo) {
        /** @type {Route}**/
        const route = Config.getRoute()
        if (!userInfo.is_password_set) {
          return await this.$router.replace({ name: RouterName.REGISTER })
        }
        if (!userInfo.is_authorized) {
          return await this.$router.replace({ name: RouterName.NO_AUTHORIZED })
        }
        const replacePath = localStorage.getItem(LocalStorageKey.REPLACE_PATH, route.path)
        if (replacePath) {
          return await this.$router.replace(replacePath)
        }
        return await this.$router.replace({ name: RouterName.HOME })
      }
    },
    linkLineSignIn() {
      location.href = this.lineUrl
    },
  },
}
</script>

<style lang="scss">
.form {
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
