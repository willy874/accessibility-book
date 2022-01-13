<template>
  <header>
    <nav>
      <ul v-if="menuList">
        <li v-for="model in sortMenuList" :key="model.uuid">
          <RouterLink :to="getMenuRoute(model.uuid)">{{ model.label }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { Getters, Actions, RouterName } from '@/consts'

export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    menuList() {
      return this.$store.getters[Getters.MENU_LIST]
    },
    sortMenuList() {
      return this.menuList.map((p) => p).sort((a, b) => a.sort - b.sort)
    },
  },
  methods: {
    /**
     * @return {Promise<MenuModel[]>}
     */
    fetchMenuList() {
      return this.$store.dispatch(Actions.FETCH_MENU_LIST)
    },
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getMenuRoute(id) {
      return {
        name: RouterName.MENU,
        params: { id },
      }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      await this.fetchMenuList()
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
      width: 100%;
      flex-wrap: wrap;
      li {
        padding-left: 8px;
        padding-right: 8px;
        flex-shrink: 0;
        flex-basis: 25%;
        display: flex;
        align-items: center;
        color: black;
        a {
          display: block;
          width: 100%;
          padding-top: 16px;
          padding-bottom: 16px;
          text-align: center;
          &.router-link-exact-active {
            cursor: auto;
            background: #42b983;
            color: white;
          }
          &:hover {
            cursor: pointer;
            background: #42b983;
            color: white;
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
