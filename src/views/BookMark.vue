<template>
  <div>
    <h2>書籤列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="bookmarkList.length">
      <div v-for="model in bookmarkList" :key="model.id">
        <div class="bookmark__list-item list-group-item">
          <RouterLink class="d-flex" :to="getChapterRoute(model.chapter)">{{ model.chapter_name }}</RouterLink>
          <button @click="deleteBookmark(model.id)">刪除</button>
        </div>
      </div>
    </div>
    <div v-else>無資料</div>
  </div>
</template>

<script>
import { throttle } from '@/utils'
import { RouterName, Getters, Actions } from '@/consts'
import { mapActions, mapGetters } from 'vuex'

/**
 * @type {{
 *   bookmarkList: GetterFunction<import('@/store/bookmark').bookmarkList>
 * }}
 */
const { bookmarkList } = mapGetters({
  bookmarkList: Getters.BOOKMARK_LIST,
})

/**
 * @type {{
 *   fetchBookmarkList: ActionFunction<import('@/store/bookmark').fetchBookmarkList>,
 *   deleteBookmark: ActionFunction<import('@/store/bookmark').deleteBookmark>,
 * }}
 */
const { deleteBookmark, fetchBookmarkList } = mapActions({
  fetchBookmarkList: Actions.FETCH_BOOKMARK_LIST,
  deleteBookmark: Actions.DELETE_BOOKMARK,
})

export default {
  name: 'BookMark',
  computed: {
    bookmarkList,
  },
  methods: {
    fetchBookmarkList,
    deleteBookmark: throttle(deleteBookmark, 400),
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return {
        name: RouterName.CHAPTER,
        params: { id },
      }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      await this.fetchBookmarkList()
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 8px;
}
.bookmark__list-item {
  padding: 8px;
  font-size: 18px;
  display: flex;
  align-items: flex-start;
  a {
    flex-grow: 1;
  }
  button {
    flex-shrink: 0;
  }
  &:hover {
    background-color: #68c79c;
    color: #fff;
    button {
      color: #fff;
    }
  }
}
</style>
