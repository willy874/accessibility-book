<template>
  <nav>
    <h2>選單列表</h2>
    <ul>
      <li v-for="(nav, name) in navigation" :key="name" class="navigation-list">
        <RouterLink :to="{ name }">{{ nav.title }}</RouterLink>
      </li>
      <li class="navigation-list">
        <a :href="lineUrl">綁定信箱</a>
      </li>
      <li>
        <button class="logout-button btn btn-primary" type="button" @click="logout">登出</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { RouterName, Actions } from '@/consts'
import { mapActions } from 'vuex'
import Config from '@/config'
import { throttle } from '@/utils'
/**
 * @type {{
 *   logout: ActionFunction<import('@/store/user/actions').logout>
 * }}
 */
const { logout } = mapActions({
  logout: Actions.LOGOUT,
})

export default {
  name: 'Navigation',
  data() {
    return {
      navigation: {
        [RouterName.HOME]: {
          title: '首頁',
        },
        [RouterName.BOOK]: {
          title: '書籍',
        },
        [RouterName.TAG]: {
          title: '標籤',
        },
        [RouterName.BOOK_MARK]: {
          title: '書籤',
        },
        [RouterName.HISTORY]: {
          title: '歷史紀錄',
        },
        [RouterName.REVICE_PASSWORD]: {
          title: '變更密碼',
        },
        [RouterName.ABOUT]: {
          title: '關於',
        },
        // [RouterName.USER]: {
        //   title: '使用者管理',
        // },
      },
    }
  },
  computed: {
    lineUrl() {
      const qs = new URLSearchParams({
        ...Config.value.lineLoginRequestParam,
        state: 'state=12345abcde',
      })
      console.log('https://access.line.me/oauth2/v2.1/authorize?' + qs)
      console.log(qs)
      return `https://access.line.me/oauth2/v2.1/authorize?${qs}`
    },
  },
  methods: {
    logout: throttle(logout, 400),
  },
}
</script>

<style lang="scss" scoped>
nav {
  ul {
    li {
      padding: 16px;
      font-size: 20px;
    }
  }
}
.logout-button {
  padding: 1rem;
  color: white;
  &:hover {
    color: white;
  }
}
.navigation-list {
  &:hover {
    background-color: #68c79c;
    color: #fff;
  }
}
</style>
