<template>
  <div>
    <h2>標籤列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="tagListById && tagListById.length">
      <div v-for="model in tagListById" :key="model.id" class="tag__list-item">
        <RouterLink :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else-if="tagList && tagList.length">
      <div v-for="model in tagList" :key="model.id" class="tag__list-item">
        <RouterLink :to="getTagRoute(model.id)">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else>沒有資料</div>
  </div>
</template>

<script>
import { RouterName, Getters, Actions } from '@/consts'

export default {
  name: 'Tag',
  data() {
    return {
      /** @type {TagModel} */
      tagListById: null,
      /** @type {number} */
      active: null,
    }
  },
  computed: {
    /**
     * @return {ChapterModel[]}
     */
    tagList() {
      return this.$store.getters[Getters.TAG_LIST]
    },
    /**
     * @returns {ChapterModel}
     */
    targetModel() {
      return this.tagList.find((p) => p.id === this.active)
    },
  },
  methods: {
    /**
     * @return {Promise<TagModel[]>}
     */
    fetchTagList() {
      return this.$store.dispatch(Actions.FETCH_TAG_LIST)
    },
    /**
     * @param {number} id
     * @return {Promise<ChapterModel>}
     */
    fetchChapterListByTagId(id) {
      return this.$store.dispatch(Actions.FETCH_CHAPTER_LIST_BY_TAG_ID, id)
    },
    /**
     * @param {number} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return {
        name: RouterName.CHAPTER,
        params: { id },
      }
    },
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
        this.tagListById = await this.fetchChapterListByTagId(id)
      } else {
        this.tagListById = null
        this.active = null
        this.listModel = await this.fetchTagList()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 8px;
}
.tag__list-item {
  padding: 8px;
  font-size: 20px;
}
</style>
