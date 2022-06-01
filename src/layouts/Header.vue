<template>
  <header>
    <SearchBar>
      <router-link title="回到首頁" :to="{ name: RouterName.HOME }">
        <img class="header-logo" :src="headerLogo ? headerLogo : 'https://eyestudy.org/media/static/Logo.jpg'" alt="" />
      </router-link>
    </SearchBar>
    <nav>
      <ul v-if="menuList.length">
        <li v-for="model in sortMenuList(menuList)" :key="model.uuid">
          <a
            :class="{ active: model.uuid === showMenu }"
            :title="`開關${model.label}選單`"
            :aria-expanded="String(model.uuid === showMenu)"
            role="button"
            target="_top"
            @click="toggleMenu(model)"
          >
            {{ model.label }}
          </a>
          <ul v-show="model.child && model.uuid === showMenu">
            <li v-for="child in sortMenuList(model.child)" :key="child.uuid">
              <a
                :class="{ active: isActiveId(child.uuid) }"
                :title="`前往${model.label}的${child.label}`"
                @click="pushMenuRouter(child.uuid)"
              >
                {{ child.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { Getters, Actions, RouterName } from '@/consts'
import SearchBar from '@/layouts/SearchBar.vue'
import { mapActions } from 'vuex'
import VueConfig from '@/config'

/**
 * @type {{
 *   fetchMenuList: function(): Promise<MenuModel[]>
 * }}
 */
const { fetchMenuList } = mapActions({
  fetchMenuList: Actions.FETCH_MENU_LIST,
})

export default {
  name: 'Header',
  components: {
    SearchBar,
  },
  props: {
    headerLogo: {
      type: String,
      default: 'https://eyestudy.org/media/static/Logo.jpg',
    },
  },
  data() {
    return {
      showMenu: '',
    }
  },
  computed: {
    /**
     * @return {MenuModel[]}
     */
    menuList() {
      return this.$store.getters[Getters.MENU_LIST]
    },
  },
  methods: {
    fetchMenuList,
    /**
     * @param {string} id
     * @return {boolean}
     */
    isActiveId(id) {
      const route = VueConfig.getRoute(this)
      return id === route.params.id
    },
    /**
     * @param {string} id
     */
    pushMenuRouter(id) {
      if (!this.isActiveId(id)) {
        this.$router.push({
          name: RouterName.MENU,
          params: { id },
        })
        this.showMenu = ''
      }
    },
    /**
     * @param {MenuModel[]} list
     * @return {MenuModel[]}
     */
    sortMenuList(list) {
      return list.map((p) => p).sort((a, b) => a.sort - b.sort)
    },
    toggleMenu(model) {
      if (this.showMenu === model.uuid) {
        this.showMenu = ''
      } else {
        this.showMenu = model.uuid
      }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      if (!this.menuList.length) {
        await this.fetchMenuList()
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
    position: relative;
    font-size: 1.25rem;
    font-weight: 500;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.4);
    > ul {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      > li {
        padding-left: 8px;
        padding-right: 8px;
        flex-shrink: 0;
        flex-basis: 50%;
        display: flex;
        align-items: center;
        color: black;
        > a {
          display: block;
          width: 100%;
          padding-top: 16px;
          padding-bottom: 16px;
          text-align: center;
          &:hover {
            cursor: pointer;
            background: #42b983;
            color: white;
            opacity: 0.8;
          }
        }
        > ul {
          position: absolute;
          width: 100%;
          top: 100%;
          left: 0;
          background-color: white;
          padding: 8px 0;
          z-index: 1;
          box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.4);
          > li {
            > a {
              display: block;
              padding: 8px 16px;
              font-weight: normal;
            }
          }
        }
      }

      a.active {
        cursor: auto;
        background: #42b983;
        color: white;
      }
    }
  }
  .header-logo {
    width: 30px;
  }
}
</style>
