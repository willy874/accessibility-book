<template>
  <header>
    <nav>
      <ul>
        <li v-for="model in listModel" :key="model.uuid">
          <RouterLink :to="getMenuRoute(model.uuid, model.label)">{{ model.label }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { Actions, RouterName } from '@/consts'

export default {
  name: 'Header',
  data() {
    return {
      /** @type {MenuListModel[]} */
      listModel: null,
    }
  },
  async created() {
    this.listModel = await this.fetchMenuList()
    console.log(this.listModel)
  },
  methods: {
    /**
     * @return {Promise<MenuListModel[]>}
     */
    fetchMenuList() {
      return this.$store.dispatch(Actions.FETCH_MENU_LIST)
    },
    /**
     * @param {string} uuid
     * @return {VueRouteLocation}
     */
    getMenuRoute(uuid) {
      return {
        name: RouterName.MENULIST,
        params: { uuid },
      }
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
