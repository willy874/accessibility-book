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
        <h2 class="chapter__heading">章節列表</h2>
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

export default {
  name: 'Chapter',
  data() {
    return {
      active: null,
    }
  },
  computed: {
    /**
     * @return {ChapterModel[]}
     */
    chapterList() {
      return this.$store.getters[Getters.CHAPTER_LIST]
    },
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.chapterList.find((p) => p.id === this.active)
    },
    /**
     * @return {BookModel}
     */
    activeBook() {
      return this.$store.state.chapter.activeBook
    },
  },
  methods: {
    transformMarkdownToHtml,
    /**
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getTagRoute(id) {
      return {
        name: RouterName.TAG_DETAIL,
        params: { id },
      }
    },
    /**
     * @param {number} id
     * @return {Promise<ChapterModel>}
     */
    fetchChapterById(id) {
      return this.$store.dispatch(Actions.FETCH_CHAPTER_BY_ID, id)
    },
    /**
     * @depend
     * @param {Route} this.route
     * @param {number} this.active
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      /** @type {number} */
      const id = Number(this.route.params.id)
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
