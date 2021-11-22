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
        <div class="msg">
          <strong v-if="emailError" class="error-msg" title="帳號信箱格式錯誤">帳號信箱格式錯誤</strong>
        </div>
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
          <strong v-if="passwordError" class="error-msg" title="帳號密碼格式錯誤">帳號密碼格式錯誤</strong>
        </div>
      </div>
      <!-- <p>{{ emailError }}</p> -->
      <button type="submit" title="點擊登入" class="btn-submit">登入</button>
    </form>
  </main>
</template>

<script>
import { apiPostUser } from '@/api'
// import { validate } from '@/utils'

// console.log(validate('email', 123))

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
  },
}
</script>

<style lang="scss">
form {
  max-width: $xs;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 10px 15px;
  border: 1px solid #217842;
  border-radius: 0.5rem;
  background-color: #e0fff3;
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
