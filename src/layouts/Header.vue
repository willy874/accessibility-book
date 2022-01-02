<template>
  <header>
    <nav class="header">
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
        <li>
          <RouterLink to="/bookmark">書籤</RouterLink>
        </li>
        <li>
          <RouterLink to="/history">歷史觀看列表</RouterLink>
        </li>
      </ul>

      <button class="signout-button" type="button" @click="signOut">登出</button>
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

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background: white;
}
.header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.4);
  li {
    text-align: center;
    color: black;
    &:hover {
      background: #42b983;
      color: white;
    }
  }
  a {
    display: block;
    padding: 1rem;
    height: 100%;
    width: 100%;
  }
  ul {
    display: flex;
    list-style: none;
    flex: 1;
    li {
      flex: 1;
    }
  }
  .signout-button {
    padding: 1rem;
    background: gray;
    color: white;
  }
}
</style>
