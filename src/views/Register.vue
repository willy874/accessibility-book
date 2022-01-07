<template>
  <div>
    <h2 class="form-title" title="這裡是註冊頁面">註冊</h2>
    <form @submit="submit">
      <div>
        <label>密碼</label>
        <input v-model="form.password1" type="password" name="password" title="請輸入密碼" placeholder="請輸入密碼" />
      </div>
      <div>
        <label>確認密碼</label>
        <input
          v-model="form.password2"
          type="password"
          name="password_check"
          title="請輸入確認密碼"
          placeholder="請輸入確認密碼"
        />
      </div>
      <div>
        <label>電子信箱</label>
        <input v-model="form.email" type="email" name="email" title="請輸入電子信箱" placeholder="請輸入電子信箱" />
      </div>
      <div class="submit-btn-container">
        <button type="submit">送出</button>
      </div>
    </form>
  </div>
</template>

<script>
import { apiPostRegister } from '@/api'
import { validate, ValidateType } from '@/utils'
import { RouterName, StorageKey, Actions } from '@/consts'

/**
 * @typedef {Object} RegistrationForm
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {Blob} photo
 */
export default {
  name: 'Register',
  data() {
    return {
      /** @type {RegistrationForm} **/
      form: {
        first_name: '',
        last_name: '',
        email: '',
        photo: null,
        password1: '',
        password2: '',
      },
      errors: {},
    }
  },
  computed: {
    /**
     * @return {UserModel}
     */
    userInfo() {
      return this.$store.state.user.info
    },
  },
  methods: {
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
      try {
        if (validate(this.form).label) {
          return
        }
        const res = await apiPostRegister(this.form)
        if (res.isAxiosError) {
          throw new Error(res.data.detail)
        } else {
          this.loginHandler(res.data.key)
        }
      } catch (error) {
        this.$router.replace({ name: RouterName.LOGIN })
      }
    },
    async loginHandler(token) {
      await this.setStorage(StorageKey.TOKEN, token)
      const userInfo = await this.fetchUserInfo()
      if (userInfo) {
        if (!userInfo.is_authorized) {
          await this.$router.replace({ name: RouterName.NO_AUTHORIZED })
          return
        }
        this.checkLoginReplace()
      }
    },
    /**
     * @param {RegistrationForm} form
     * @return {string[]}
     */
    validate(form) {
      for (const key in form) {
        this.errors[key] = []
      }
      if (form.email === '') {
        this.errors.first_name.push('')
      }
      if (form.email === '') {
        this.errors.last_name.push('')
      }
      if (!validate(ValidateType.EMAIL, form.email)) {
        this.errors.email.push('電子郵件信箱格式不正確')
      }
      if (form.email === '') {
        this.errors.email.push('電子郵件信箱不可空白')
      }
      if (!validate(ValidateType.PASSWORD, form.password1)) {
        this.errors.password1.push('密碼請輸入6~30碼英數混合')
      }
      if (form.password1 === '') {
        this.errors.password1.push('密碼不可空白')
      }
      if (form.password1 !== form.password2) {
        this.errors.password2.push('確認密碼請與密碼相同')
      }
      if (!form.photo) {
        this.errors.photo.push('請上傳盲胞證或志工證')
      }
    },
    isValid(field) {
      const fieldError = this.errors[field]
      return fieldError.length
    },
  },
}
</script>
<style lang="scss" scoped>
form > div {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin: 8px 0;
  label {
    flex-shrink: 0;
    width: 120px;
  }
  input {
    flex-grow: 1;
    border: 1px solid #217842;
    border-radius: 4px;
    padding: 4px;
    height: 34px;
  }
}
.submit-btn-container {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
  button {
    border: 1px solid #000;
    background-color: transparent;
    padding: 4px 16px;
    font-size: 20px;
    border-radius: 4px;
  }
}
</style>
