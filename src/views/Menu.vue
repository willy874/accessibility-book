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
import { mapActions } from 'vuex'
import { Actions, RouterName } from '@/consts'
import { treeEach } from '@/utils'
import VueConfig from '@/config'

/**
 * @type {{
 *   fetchMenuList: ActionFunction<import('@/store/menu').fetchMenuList>
 * }}
 */
const { fetchMenuList } = mapActions({
  fetchMenuList: Actions.FETCH_MENU_LIST,
})

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
    fetchMenuList,
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
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      const route = VueConfig.getRoute(this)
      const id = route.params.id
      if (id) {
        const listModel = await this.fetchMenuList()
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
