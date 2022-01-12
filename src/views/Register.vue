<template>
  <div>
    <h2 class="form-title" title="這裡是註冊頁面">註冊</h2>
    <form @submit="throttleSubmit">
      <div class="form-item">
        <label>姓氏</label>
        <input
          v-model="form.last_name"
          :class="{ 'is-valid': isValid(errors, 'last_name') }"
          type="text"
          name="last_name"
          title="請輸入姓氏"
          placeholder="請輸入姓氏"
        />
      </div>
      <div class="form-item">
        <label>名字</label>
        <input
          v-model="form.first_name"
          :class="{ 'is-valid': isValid(errors, 'first_name') }"
          type="text"
          name="first_name"
          title="請輸入名字"
          placeholder="請輸入名字"
        />
      </div>
      <div class="form-item">
        <label>密碼</label>
        <input
          v-model="form.password1"
          :class="{ 'is-valid': isValid(errors, 'password1') }"
          type="password"
          name="password"
          title="請輸入密碼"
          placeholder="請輸入密碼"
        />
      </div>
      <div class="form-item">
        <label>確認密碼</label>
        <input
          v-model="form.password2"
          :class="{ 'is-valid': isValid(errors, 'password2') }"
          type="password"
          name="password_check"
          title="請輸入確認密碼"
          placeholder="請輸入確認密碼"
        />
      </div>
      <div v-if="isEmailEmpty" class="form-item">
        <label>電子信箱</label>
        <input
          v-model="form.email"
          class="form-item"
          :class="{ 'is-valid': isValid(errors, 'email') }"
          type="text"
          name="email"
          title="請輸入電子郵件信箱"
          placeholder="請輸入郵件電子信箱"
        />
      </div>
      <div v-else class="form-item readonly">
        <label>電子信箱</label>
        <input :value="userInfo.email" type="text" name="email" title="電子郵件信箱" readonly />
      </div>
      <div class="form-item">
        <label>證件上傳</label>
        <input type="file" :class="{ 'is-valid': isValid(errors, 'photo') }" name="photo" @change="onPhotoUpload" />
      </div>
      <div class="submit-btn-container">
        <button type="submit">送出</button>
      </div>
      <div v-if="preview" class="form-item">
        <label>證件預覽</label>
        <div class="preview"><img :src="preview" alt="證件預覽圖" /></div>
      </div>
    </form>
  </div>
</template>

<script>
import { apiPostPasswordRegister } from '@/api'
import {
  validate,
  isValid,
  errorsToArray,
  flatten,
  HttpError,
  handleHttpErrorLog,
  blobToBase64,
  throttle,
} from '@/utils'
import { RouterName, Actions, ValidateType } from '@/consts'

/**
 * @typedef {Object} RegistrationForm
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {Blob} photo
 * @property {string} password1
 * @property {string} password2
 */
/**
 * @typedef {Object} RegistrationError
 * @property {string[]} first_name
 * @property {string[]} last_name
 * @property {string[]} email
 * @property {string[]} photo
 * @property {string[]} password1
 * @property {string[]} password2
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
      /**
       * @type {RegistrationError|{}}
       */
      errors: {},
      /**
       * @type {string}
       */
      preview: '',
      throttleSubmit: throttle(this.submit, 400),
    }
  },
  computed: {
    /**
     * @return {UserModel}
     */
    userInfo() {
      return this.$store.state.user.info
    },
    isEmailEmpty() {
      return !this.userInfo?.email
    },
    /**
     * @return {string[]}
     */
    errorsToArray() {
      return flatten(Object.values(this.errors)).filter((v) => v)
    },
  },
  methods: {
    isValid,
    /**
     * @param {StorageKey} key
     * @param {string} value
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
    /**
     * @param {UserUpdateRequestParam} form
     * @return {UserModel}
     */
    async updateUserInfo(form) {
      const data = {
        first_name: form.first_name,
        last_name: form.last_name,
        photo: form.photo,
        email: !this.isEmailEmpty ? form.email : undefined,
      }
      return this.$store.dispatch(Actions.UPDATED_USER_INFO, data)
    },
    /**
     * @param {PasswordRegisterRequestParam} form
     * @return {{ detail: string }}
     */
    async createPassword(form) {
      const data = {
        new_password1: form.password1,
        new_password2: form.password2,
      }
      try {
        const res = await apiPostPasswordRegister(data)
        if (res.isAxiosError) {
          throw new HttpError(res)
        }
        return res.data
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
    async submit(e) {
      e.preventDefault()
      this.errors = await this.validate(this.form)
      if (isValid(this.errors)) {
        alert('註冊失敗！\n\n' + errorsToArray(this.errors).toString().replace(/,/g, '，\n') + '。')
        return
      }
      try {
        const result = await Promise.all([this.updateUserInfo(this.form), this.createPassword(this.form)])
        const errors = result.find((r) => r instanceof HttpError)
        if (errors) {
          throw errors
        } else {
          this.loginHandler()
        }
      } catch (error) {
        handleHttpErrorLog(error)
        this.$router.replace({ name: RouterName.LOGIN })
      }
    },
    async onPhotoUpload(e) {
      /** @type {HTMLInputElement}} */
      const input = e.target
      if (input && input.files.length) {
        const file = Array.from(input.files)[0]
        this.form.photo = file
        this.preview = await blobToBase64(file)
      }
    },
    async loginHandler() {
      if (this.userInfo) {
        if (!this.userInfo.is_authorized) {
          await this.$router.replace({ name: RouterName.NO_AUTHORIZED })
          return
        }
        this.checkLoginReplace()
      }
    },
    /**
     * @param {RegistrationForm} form
     * @return {RegistrationError}
     */
    async validate(form) {
      return await validate(form, {
        first_name: {
          [ValidateType.IS_EMPTY]: { message: '請填寫名字' },
        },
        last_name: {
          [ValidateType.IS_EMPTY]: { message: '請填寫姓氏' },
        },
        email: this.isEmailEmpty
          ? {
              [ValidateType.IS_EMPTY]: { message: '請填寫電子郵件信箱' },
              [ValidateType.EMAIL]: { message: '請輸入正確的電子郵件信箱格式' },
            }
          : undefined,
        photo: {
          [ValidateType.IS_EMPTY]: { message: '請上傳盲胞證或志工證' },
          [ValidateType.IMAGE]: {
            size: '2MB',
            type: 'jpg,jpeg,png',
            messageOption: {
              size: '檔案大小上限不可超過 2MB',
              type: '檔案類型僅允許 jpg、png',
            },
          },
        },
        password1: {
          [ValidateType.IS_EMPTY]: { message: '請填寫密碼' },
          [ValidateType.PASSWORD]: { min: 6, max: 30 },
        },
        password2: {
          [ValidateType.IS_EMPTY]: { message: '請填寫確認密碼' },
          [ValidateType.EQUAL]: { message: '請確認填寫密碼是否相等', equal: form.password1 },
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
form {
  .form-item {
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
      border-radius: 4px;
      padding: 4px;
      height: 34px;
    }
    input[type='file'] {
      border: 0;
    }
    .preview {
      img {
        max-width: 100%;
      }
    }
    &.readonly input {
      border: 1px solid transparent;
    }
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
