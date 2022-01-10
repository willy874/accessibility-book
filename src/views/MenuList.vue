<template>
  <div>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else-if="childListModel && childListModel.length">
      <div v-for="model in childListModel" :key="model.uuid" class="menu__list-item">
        <RouterLink :to="getBookRouteByTagName(model.targetTag)">{{ model.label }} </RouterLink>
      </div>
    </template>
    <template v-else>
      <div>沒有資料</div>
    </template>
  </div>
</template>

<script>
import { Actions, RouterName } from '@/consts'
import Config from '@/config'
export default {
  name: 'MenuList',
  data() {
    return {
      /** @type {MenuModel} */
      childListModel: null,
      loading: false,
      title: '',
    }
  },
  watch: {
    $route() {
      this.effectComponentPage()
    },
  },
  async created() {
    this.effectComponentPage()
  },
  methods: {
    /**
     * @param {string[]} tags
     * @returns {VueRouteLocation}
     */
    getBookRouteByTagName(tags) {
      return {
        name: RouterName.BOOK,
        query: { tag__name: tags },
      }
    },
    /**
     * @return {Promise<MenuModel[]>}
     */
    async getMenuList() {
      return this.$store.dispatch(Actions.FETCH_MENU_LIST)
    },
    /**
     * @depend
     * @param {MenuModel[]} this.childListModel
     */
    async effectComponentPage() {
      /** @type {Route} */
      const route = Config.getRoute(this)
      if (!route) return
      /** @type {string} */
      const id = route.params.uuid
      if (id) {
        this.loading = true
        const listModel = await this.getMenuList(id)
        const menuModel = listModel.find((item) => item.uuid === id)
        if (menuModel) {
          this.childListModel = menuModel.child
        }
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 8px;
}
h3 {
  margin-bottom: 8px;
}
.menu__list-item {
  padding: 8px;
  font-size: 20px;
}
</style>
