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
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style></style>
