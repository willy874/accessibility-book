<template>
  <div>
    <div v-if="step === 0">
      <div v-if="userInfo">
        <h2 class="form-title">資料均已填寫</h2>
        <div class="bottom-bar">
          <button type="button" title="點擊後回到首頁" @click="toHome">返回首頁</button>
        </div>
      </div>
      <div v-else>
        <h2 class="form-title">使用者資料讀取中</h2>
      </div>
    </div>
    <div v-if="step === 1">
      <h2 class="form-title">密碼設定</h2>
      <form @submit="submitPassword">
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
        <div class="submit-btn-container">
          <button type="submit">送出</button>
        </div>
      </form>
    </div>
    <div v-if="step === 2">
      <h2 class="form-title">資料填寫</h2>
      <form @submit="submitUpdateUser">
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
  isAxiosError,
} from '@/utils'
import { RouterName, Actions, ValidateType, LifecycleHook } from '@/consts'

/**
 * @typedef {Object} RegistrationForm
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {Blob} photo
 * @property {string} password1
 * @property {string} password2
 */
/** @type {RegistrationForm} **/
const form = {
  first_name: '',
  last_name: '',
  email: '',
  photo: null,
  password1: '',
  password2: '',
}

/**
 * @type {{
 *   userInfo: () => UserModel
 * }}
 */
const { userInfo } = mapState({
  userInfo: (state) => state.user.info,
})

/**
 * @type {{
 *   fetchUserInfo: ActionFunction<import('@/store/user/actions').fetchUserInfo>
 *   updateUserInfo: ActionFunction<import('@/store/user/actions').updateUserInfo>
 *   checkLoginReplace: ActionFunction<import('@/store/user/actions').checkLoginReplace>
 * }}
 */
const { fetchUserInfo, updateUserInfo, checkLoginReplace } = mapActions({
  fetchUserInfo: Actions.FETCH_USER_INFO,
  updateUserInfo: Actions.UPDATED_USER_INFO,
  checkLoginReplace: Actions.CHECK_LOGIN_REPLACE,
})

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
      form,
      /** @type {number} */
      step: 0,
      /** @type {Partial<RegistrationError>} */
      errors: {},
      /** @type {string} */
      preview: '',
    }
  },
  computed: {
    userInfo,
    /**
     * @return {boolean}
     */
    isEmailEmpty() {
      if (this.userInfo) {
        return !this.userInfo.email
      }
      return false
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
    fetchUserInfo,
    checkLoginReplace,
    updateUserInfo,
    toHome() {
      this.$router.push({ name: RouterName.HOME })
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      if (type === LifecycleHook.CREATED) {
        await this.fetchUserInfo()
        if (!this.userInfo.is_password_set) {
          this.step = 1
        }
      }
    },
    /**
     * @param {PasswordRegisterRequestParam} form
     * @return {Promise<{ detail: string } | void>}
     */
    async createPassword(form) {
      try {
        const res = await apiPostPasswordRegister(form)
        if (isAxiosError(res)) {
          throw new HttpError(res)
        }
        return res.data
      } catch (error) {
        handleHttpErrorLog(error)
      }
    },
    throttle: throttle(function () {
      return true
    }, 400),
    /**
     * @param {SubmitEvent} e
     */
    async submitPassword(e) {
      if (!this.throttle()) {
        return
      }
      e.preventDefault()
      this.errors = await this.validatePassword()
      if (isValid(this.errors)) {
        alert('註冊失敗！\n\n' + errorsToArray(this.errors).toString().replace(/,/g, '，\n') + '。')
        return
      }
      try {
        await this.createPassword({
          new_password1: this.form.password1,
          new_password2: this.form.password2,
        })
        this.step = 2
      } catch (error) {
        handleHttpErrorLog(error)
        this.$router.replace({ name: RouterName.LOGIN })
      }
    },
    /**
     * @param {SubmitEvent} e
     */
    async submitUpdateUser(e) {
      if (!this.throttle()) {
        return
      }
      e.preventDefault()
      const form = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        photo: this.form.photo,
      }
      this.errors = await this.validateUser()
      if (isValid(this.errors)) {
        alert('註冊失敗！\n\n' + errorsToArray(this.errors).toString().replace(/,/g, '，\n') + '。')
        return
      }
      try {
        const errors = await this.updateUserInfo({
          first_name: form.first_name,
          last_name: form.last_name,
          photo: form.photo,
          email: !this.isEmailEmpty ? form.email : undefined,
        })
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
    /**
     * @param {Event} e
     */
    async onPhotoUpload(e) {
      /** @type {HTMLInputElement}} */
      // @ts-ignore
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
     * @return {Promise<Partial<RegistrationError>>}
     */
    async validatePassword() {
      const form = {
        password1: this.form.password1,
        password2: this.form.password2,
      }
      const result = await validate(form, {
        password1: {
          [ValidateType.IS_EMPTY]: { message: '請填寫密碼' },
          [ValidateType.PASSWORD]: { min: 6, max: 30 },
        },
        password2: {
          [ValidateType.IS_EMPTY]: { message: '請填寫確認密碼' },
          [ValidateType.EQUAL]: { message: '請確認填寫密碼是否相等', equal: form.password1 },
        },
      })
      return result
    },
    /**
     * @return {Promise<Partial<RegistrationError>>}
     */
    async validateUser() {
      const form = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        photo: this.form.photo,
      }
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
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.form-title {
  font-size: 24px;
}
.bottom-bar {
  padding: 16px;
  text-align: center;
  font-size: 18px;
}
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
