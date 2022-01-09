<template>
  <div>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else>
      <div v-if="targetModel">
        <div v-for="model in targetModel" :key="model.uuid" class="menu__list-item">
          <RouterLink :to="getBookRouteByTagName(model.targetTag)">{{ model.label }} </RouterLink>
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
    /**
     * @param {array<T>} tags
     * @returns {VueRouteLocation}
     */
    getBookRouteByTagName(tags) {
      return {
        name: RouterName.BOOK,
        query: { tag__name: tags },
      }
    },
    /**
     * @return {Promise<MenuListModel>}
     */
    async getMenuList(id) {
      const list = await this.$store.dispatch(Actions.FETCH_MENU_LIST)
      const filterModel = list.find((item) => item.uuid === id)
      return filterModel
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
      this.loading = true
      this.listModel = await this.getMenuList(id)
      this.targetModel = this.listModel.child
      console.log(this.targetModel.targetTag)
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
