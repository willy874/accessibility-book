<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink>國一</RouterLink></li>
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
// import { apiGetMenuJson } from '@/api'
import { Actions } from '@/consts'

export default {
  name: 'Header',
  async created() {
    const res = await this.fetchMenuList()
    console.log(res)
  },
  methods: {
    /**
     * @return {Promise<MenuListModel[]>}
     */
    fetchMenuList() {
      return this.$store.dispatch(Actions.FETCH_MENU_LIST)
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  nav {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 500;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.4);
    ul {
      display: flex;
      flex-wrap: nowrap;
      li {
        padding: 4px;
        text-align: center;
        flex-shrink: 0;
        flex-basis: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        &:hover {
          cursor: pointer;
          background: #42b983;
          color: white;
        }
        a {
          display: block;
          padding: 1rem;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
