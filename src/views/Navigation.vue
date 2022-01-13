<template>
  <nav>
    <ul>
      <li v-for="(nav, name) in navigation" :key="name">
        <RouterLink :to="{ name }">{{ nav.title }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { RouterName } from '@/consts'
export default {
  name: 'Navigation',
  data() {
    return {
      navigation: {
        [RouterName.HOME]: {
          title: '首頁',
        },
        [RouterName.BOOK]: {
          title: '書籍',
        },
        [RouterName.TAG]: {
          title: '標籤',
        },
        [RouterName.BOOK_MARK]: {
          title: '書籤',
        },
        [RouterName.HISTORY]: {
          title: '歷史紀錄',
        },
        [RouterName.USER]: {
          title: '使用者管理',
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
nav {
  ul {
    li {
      padding: 16px;
      font-size: 20px;
    }
  }
}
</style>
