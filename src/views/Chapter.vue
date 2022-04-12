<template>
  <div>
    <div v-if="activeBook" class="tag-list">
      <div v-for="tag in activeBook.tag" :key="tag.id" class="tag-item">
        <RouterLink :to="getTagRoute(tag.id)" title="搜尋該標籤列表">{{ tag.name }}</RouterLink>
      </div>
    </div>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="targetModel">
      <div>
        <h2 class="chapter__heading">
          <RouterLink :to="getBookRoute(targetModel.id)">
            {{ targetModel.name }}
          </RouterLink>
        </h2>
      </div>
      <div v-html="transformMarkdownToHtml(targetModel.content)"></div>
    </div>
    <div v-else>
      <div>無資料</div>
    </div>
  </div>
</template>

<script>
import { transformMarkdownToHtml } from '@/utils'
import { apiPostHistory } from '@/api/index'
import { RouterName, Getters, Actions } from '@/consts'
import VueConfig from '@/config'
import { mapActions, mapGetters, mapState } from 'vuex'

/**
 * @type {{
 *   activeBook: () => BookModel
 * }}
 */
const { activeBook } = mapState({
  activeBook: (state) => state.chapter.activeBook,
})

/**
 * @type {{
 *   chapterList: GetterFunction<import('@/store/chapter').chapterList>
 * }}
 */
const { chapterList } = mapGetters({
  chapterList: Getters.CHAPTER_LIST,
})

/**
 * @type {{
 *   fetchChapterById: ActionFunction<import('@/store/chapter').fetchChapterById>,
 * }}
 */
const { fetchChapterById } = mapActions({
  fetchChapterById: Actions.FETCH_CHAPTER_BY_ID,
})

export default {
  name: 'Chapter',
  data() {
    return {
      active: null,
    }
  },
  computed: {
    chapterList,
    activeBook,
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.chapterList.find((p) => p.id === this.active)
    },
  },
  methods: {
    transformMarkdownToHtml,
    fetchChapterById,
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getTagRoute(id) {
      return {
        name: RouterName.TAG_DETAIL,
        params: { id },
      }
    },
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getBookRoute(id) {
      return {
        name: RouterName.BOOK_DETAIL,
        params: { id },
      }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      const route = VueConfig.getRoute(this)
      const id = Number(route.params.id)
      if (id) {
        this.active = id
        await this.fetchChapterById(id)
        await apiPostHistory({ chapter: id })
      } else {
        this.active = null
        await this.$router.replace({ name: RouterName.HOME })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.chapter__heading {
  margin-bottom: 12px;
}
.chapter__bookmark {
  padding: 16px;
}
.tag-list {
  display: flex;
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.tag-item {
  padding: 4px 16px;
  white-space: nowrap;
}
</style>
