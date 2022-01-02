<template>
  <footer class="footer">
    <nav>
      <ul class="footer-nav">
        <li><RouterLink to="/">回首頁</RouterLink></li>
        <li>返回</li>
        <li>前進</li>
        <li>目錄</li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
  background: white;
  .footer-nav {
    display: flex;
    flex-wrap: nowrap;
    li {
      flex: 1;
      text-align: center;
      border: 1px solid gray;
      padding: 1rem;
    }
  }
}
</style>
