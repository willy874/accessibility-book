<template>
  <div>
    <h2 class="form-title" title="這裡是註冊頁面">註冊</h2>
    <form>
      <div>
        <label>使用者名稱</label>
        <input
          v-model="form.username"
          type="text"
          name="email"
          title="請輸入使用者名稱"
          placeholder="請輸入使用者名稱"
        />
      </div>
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
    </form>
  </div>
</template>

<script>
import { apiPostRegister } from '@/api'
import Config from '@/config'
import { RouterName, LocalStorageKey, Actions } from '@/consts'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password1: '',
        password2: '',
        email: '',
      },
    }
  },
  methods: {
    async submit() {
      try {
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
      localStorage.setItem(LocalStorageKey.TOKEN, token)
      /** @type {UserModel}**/
      const userInfo = await this.$store.dispatch(Actions.FETCH_USER_INFO)
      /** @type {Route}**/
      const route = Config.getRoute()
      if (userInfo) {
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
  },
}
</script>
