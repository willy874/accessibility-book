<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li>
          <RouterLink to="/book/">書本頁</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/', query: { 'liff.state': '/chapter/1' } }">章節1: 線性代數</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/', query: { 'liff.state': '/chapter/4' } }">章節4: 字音字形</RouterLink>
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
