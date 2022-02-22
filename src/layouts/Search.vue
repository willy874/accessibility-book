<template>
  <div class="search-bar">
    <div class="title">
      <router-link title="回到首頁" :to="{ name: RouterName.HOME }">首頁</router-link>
    </div>
    <div class="input">
      <input type="text" />
    </div>
  </div>
</template>

<script>
import { RouterName } from '@/consts'

export default {
  name: 'Search',
  data() {
    return {
      RouterName,
    }
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  .title {
    padding-right: 16px;
  }
  .input {
    flex-grow: 1;
    input {
      border: 1px solid #888;
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
