<template>
  <footer>
    <nav>
      <ul class="footer-nav">
        <li>
          <RouterLink :to="{ name: RouterName.USER }">使用者</RouterLink>
        </li>
        <li>
          <a href="javascript:;" @click="routerBack">返回</a>
        </li>
        <li>
          <a href="javascript:;">下一章</a>
        </li>
        <li>
          <RouterLink :to="{ name: RouterName.NAVIGATION }">目錄</RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
import { RouterName } from '@/consts'
export default {
  name: 'Footer',
  data() {
    return {
      RouterName,
    }
  },
  methods: {
    routerBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss">
footer {
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  .footer-nav {
    display: flex;
    flex-wrap: nowrap;
    li {
      flex: 1;
      width: 0;
      height: 80px;
      text-align: center;
      border: 1px solid gray;
      display: flex;
      align-items: center;
      justify-content: center;
      @include stretched-link;
    }
  }
}
</style>
