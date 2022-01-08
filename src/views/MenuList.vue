<template>
  <div>
    <h2>{{ title }}</h2>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else>
      <div v-if="targetModel">
        <div v-for="model in targetModel" :key="model.uuid" class="menu__list-item">
          <RouterLink :to="getBookRouteByTagName(model.taregtTag)">{{ model.label }} </RouterLink>
        </div>
      </div>
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
      /** @type {MenuListModel} */
      listModel: null,
      targetModel: null,
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
    getBookRouteByTagName(tags) {
      return {
        name: RouterName.BOOK,
        query: { tag__name: [tags] },
      }
    },
    /**
     * @return {Promise<MenuListModel>}
     */
    async fetchMenuList(id) {
      const list = await this.$store.dispatch(Actions.FETCH_MENU_LIST)
      const filted = await list.find((item) => item.uuid === id)
      return filted
    },
    /**
     * @depend
     * @param {MenuListModel} this.listModel
     */
    async effectComponentPage() {
      /** @type {Route} */
      const route = Config.getRoute(this)
      if (!route) return
      /** @type {string} */
      const id = route.params.uuid
      this.title = route.params.label
      this.loading = true
      this.listModel = await this.fetchMenuList(id)
      this.targetModel = await this.listModel.child
      this.loading = false
      console.log(this.targetModel)
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
