<template>
  <div class="revise-password-wrapper">
    <form @submit.prevent="submitHandler">
      <div class="form-item">
        <label>密碼</label>
        <input v-model="password.newPassword" title="請輸入密碼" placeholder="請輸入密碼" type="password" />
      </div>
      <div class="form-item">
        <label>確認密碼</label>
        <input v-model="password.checkPassword" title="請輸入確認密碼" placeholder="請輸入確認密碼" type="password" />
      </div>
      <div class="revise-password-submit-btn">
        <button type="submit">確認</button>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * @typedef {Object} RegistrationError
 * @property {string[]} password1
 * @property {string[]} password2
 */
import { apiPostPasswordRegister } from '@/api/index'
import { ValidateType } from '@/consts'
import { validate, throttle, isValid, flatten, isAxiosError, errorsToArray } from '@/utils'
export default {
  data() {
    return {
      password: {
        newPassword: '',
        checkPassword: '',
      },
      /** @type {Partial<RegistrationError>} */
      errors: {},
    }
  },
  methods: {
    isValid,
    throttle: throttle(() => true, 400),
    errorsToArray() {
      return flatten(Object.values(this.errors)).filter((v) => v)
    },
    async validatePassword() {
      const form = {
        password1: this.password.newPassword,
        password2: this.password.checkPassword,
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
    async revisePassword() {
      const data = {
        new_password1: this.password.newPassword,
        new_password2: this.password.checkPassword,
      }
      try {
        const res = await apiPostPasswordRegister(data)
        if (isAxiosError(res)) {
          throw res
        } else {
          alert('變更密碼成功')
        }
      } catch (error) {
        console.dir(error)
        alert('變更失敗')
      }
    },
    async submitHandler() {
      if (!this.throttle()) {
        return
      }
      this.errors = await this.validatePassword()
      if (isValid(this.errors)) {
        alert('註冊失敗！\n\n' + errorsToArray(this.errors).toString().replace(/,/g, '，\n') + '。')
        return
      }
      this.revisePassword()
    },
  },
}
</script>

<style lang="scss" scoped>
.revise-password-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

form {
  .form-item {
    padding-bottom: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
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
  }
}
.revise-password-submit-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
