<template>
  <header>
    <nav>
      <ul>
        <li>國一</li>
        <li>國二</li>
        <li>國三</li>
        <li>國中總複習</li>
        <li>高一</li>
        <li>高二</li>
        <li>高三</li>
        <li>高中總複習</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
nav {
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
}
</style>
