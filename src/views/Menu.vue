<template>
  <div>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="childListModel && childListModel.length">
      <div v-for="model in childListModel" :key="model.id" class="menu__list-item">
        <RouterLink :to="getBookRouteByTagName(model.targetTag)">{{ model.label }} </RouterLink>
      </div>
    </div>
    <div v-else>無資料</div>
  </div>
</template>

<script>
import { Actions, RouterName } from '@/consts'
import { treeEach } from '@/utils'

export default {
  name: 'Menu',
  data() {
    return {
      /** @type {MenuModel} */
      childListModel: null,
      title: '',
    }
  },
  methods: {
    /**
     * @param {string[]} tags
     * @returns {VueRouteLocation}
     */
    getBookRouteByTagName(tags) {
      return {
        name: RouterName.BOOK,
        query: { tag__name: tags.join(',') },
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
     * @param {Route} this.route
     * @param {MenuModel[]} this.childListModel
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      /** @type {import('@/mixins/app').AppMixin} */
      // @ts-ignore
      const appMixin = this
      const id = appMixin.route.params.id
      if (id) {
        const listModel = await this.getMenuList()
        treeEach(listModel, (item) => {
          if (item.uuid === id) {
            this.childListModel = item.child
            return true
          }
        })
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
