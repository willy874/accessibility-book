<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li>
          <RouterLink to="/book/">書籍</RouterLink>
        </li>
        <li>
          <RouterLink to="/tag/">標籤</RouterLink>
        </li>
      </ul>
      <div>
        <button type="button" @click="signOut">登出</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { apiPostLogout } from '@/api'
import { RouterName, LocalStorageKey } from '@/consts'

export default {
  name: 'Header',
  methods: {
    async signOut() {
      try {
        const res = await apiPostLogout()
        if (res.isAxiosError) {
          throw res
        }
        localStorage.removeItem(LocalStorageKey.TOKEN)
        this.$router.replace({ name: RouterName.LOGIN })
      } catch (error) {}
    },
  },
}
</script>

<style></style>
