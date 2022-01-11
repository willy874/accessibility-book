<template>
  <main>
    <form class="form" title="帳號登入的表單" @submit="submit">
      <h2 class="form-title" title="這裡是登入頁面">登入</h2>
      <div class="form-item">
        <label class="form-label" title="帳號信箱">帳號信箱</label>
        <input
          v-model="form.username"
          class="form-input"
          :class="{ 'is-valid': isValid(errors, 'username') }"
          type="text"
          name="email"
          title="這裡輸入帳號信箱"
        />
      </div>
      <div class="form-item">
        <label class="form-label" title="密碼">密碼</label>
        <input
          v-model="form.password"
          class="form-input"
          :class="{ 'is-valid': isValid(errors, 'password') }"
          type="password"
          name="password"
          title="這裡輸入帳號密碼"
        />
      </div>
      <button type="submit" title="點擊登入" class="btn-submit">登入</button>
      <button type="button" title="點擊使用Line登入" class="btn-submit" @click="linkLineSignIn">Line登入</button>
    </form>
  </main>
</template>

<script>
import { apiPostUserLogin, apiPostLineLogin } from '@/api'
import { HttpError, handleHttpErrorLog, validate, isValid, flatten } from '@/utils'
import Config from '@/config'
import { RouterName, StorageKey, Actions, ValidateType } from '@/consts'

/**
 * @typedef {Object} LoginForm
 * @property {string} username
 * @property {string} password
 */
/**
 * @typedef {Object} LoginError
 * @property {string[]} username
 * @property {string[]} password
 */
export default {
  name: 'Login',
  data() {
    return {
      form: { username: 'user', password: 'zY7bSBgk' },
      /**
       * @type {LoginError}
       */
      errors: {},
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
    /**
     * @return {string[]}
     */
    errorsToArray() {
      return flatten(Object.values(this.errors)).filter((v) => v)
    },
  },
  created() {
    const responseType = Config.value.lineLoginRequestParam.response_type
    if (this.$route.query[responseType]) {
      this.fetchLineLoginApi(this.$route.query[responseType])
    }
  },
  methods: {
    isValid,
    /**
     * @param {StorageKey} key
     * @param {string} value
     * @return {UserModel}
     */
    setStorage(key, value) {
      this.$store.dispatch(Actions.SET_STORAGE, { key, value })
    },
    /**
     * @return {UserModel}
     */
    fetchUserInfo() {
      return this.$store.dispatch(Actions.FETCH_USER_INFO)
    },
    checkLoginReplace() {
      this.$store.dispatch(Actions.CHECK_LOGIN_REPLACE)
    },
    async submit(e) {
      e.preventDefault()
      this.errors = await this.validate(this.form)
      if (this.errorsToArray.length) {
        alert('註冊失敗！\n\n' + this.errorsToArray.toString().replace(/,/g, '，\n') + '。')
        return
      }
      try {
        const res = await this.fetchUserLogin(this.form)
        if (res instanceof Error) {
          throw res
        } else {
          this.loginHandler()
        }
      } catch (error) {
        handleHttpErrorLog(error)
        this.$router.replace({ name: RouterName.LOGIN })
      }
    },
    /**
     * @param {LoginRequestParam} user
     * @return {LoginResponseData}
     */
    async fetchUserLogin(user) {
      try {
        const res = await apiPostUserLogin(user)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          this.loginHandler(res.data.key)
          return null
        }
      } catch (error) {
        handleHttpErrorLog(error)
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
      }
    },
    /**
     * @param {string} token
     */
    async loginHandler(token) {
      this.setStorage(StorageKey.TOKEN, token)
      const userInfo = await this.fetchUserInfo()
      if (userInfo) {
        if (!userInfo.is_password_set) {
          await this.$router.replace({ name: RouterName.REGISTER })
          return
        }
        if (!userInfo.is_authorized) {
          await this.$router.replace({ name: RouterName.NO_AUTHORIZED })
          return
        }
        this.checkLoginReplace()
      }
    },
    /**
     * @param {LoginForm} form
     * @return {LoginError}
     */
    async validate(form) {
      return await validate(form, {
        username: {
          [ValidateType.IS_EMPTY]: { message: '請填寫帳號' },
        },
        password: {
          [ValidateType.IS_EMPTY]: { message: '請填寫密碼' },
        },
      })
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
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border: 1px solid #217842;
  border-radius: 8px;
  background-color: #e0fff3;
}
.form-item {
  margin: 8px 0;
  input {
    font-size: 16px;
    border-radius: 8px;
    padding: 16px;
    outline-color: #217842;
    border: 1px solid #217842;
  }
}

.form-input {
  width: 100%;
}

.form-label {
  font-size: 24px;
}

.btn-submit {
  margin: 8px 0;
  font-size: 16px;
  border-radius: 8px;
  padding: 16px;
  outline-color: #217842;
  border: 1px solid #217842;
  background-color: #217842;
  color: #e0fff3;
  &:hover {
    background-color: #1a5f34;
  }
}

.msg {
  padding-top: 8px;
  height: 16px;
}

.error-msg {
  color: red;
  font-size: 18px;
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
