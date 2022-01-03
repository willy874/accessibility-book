<template>
  <nav>
    <ul>
      <li>
        <RouterLink :to="{ name: RouterName.HOME }">首頁</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: RouterName.BOOK }">書籍</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: RouterName.TAG }">標籤</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: RouterName.BOOKMARK }">書籤</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: RouterName.HISTORY }">歷史觀看列表</RouterLink>
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
      RouterName,
    }
  },
}
</script>

<style lang="scss" scoped></style>
