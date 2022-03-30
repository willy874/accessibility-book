<template>
  <div>
    <h2>標籤列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="tagListById && tagListById.length">
      <div v-for="model in tagListById" :key="model.id" class="tag__list-item">
        <RouterLink :to="{ name: RouterName.CHAPTER, params: { id: model.id } }">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else-if="tagList && tagList.length">
      <div v-for="model in tagList" :key="model.id" class="tag__list-item">
        <RouterLink :to="{ name: RouterName.TAG_DETAIL, params: { id: model.id } }">{{ model.name }}</RouterLink>
      </div>
    </div>
    <div v-else>沒有資料</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Getters, Actions } from '@/consts'
import VueConfig from '@/config'

/**
 * @type {{
 *   tagList: GetterFunction<import('@/store/tag').tagList>
 * }}
 */
const { tagList } = mapGetters({
  tagList: Getters.TAG_LIST,
})

/**
 * @type {{
 *   fetchTagList: ActionFunction<import('@/store/tag').fetchTagList>,
 *   fetchChapterListByTagId: function(number): Promise<ChapterModel>;
 * }}
 */
const { fetchTagList, fetchChapterListByTagId } = mapActions({
  fetchTagList: Actions.FETCH_TAG_LIST,
  fetchChapterListByTagId: Actions.FETCH_CHAPTER_LIST_BY_TAG_ID,
})

export default {
  name: 'Tag',
  data() {
    return {
      /** @type {TagModel | null} */
      tagListById: null,
      /** @type {number | null} */
      active: null,
      /** @type {TagModel[]} */
      listModel: [],
    }
  },
  computed: {
    tagList,
    /**
     * @returns {TagModel}
     */
    activeTagModel() {
      return this.tagList.find((p) => p.id === this.active)
    },
  },
  methods: {
    fetchTagList,
    fetchChapterListByTagId,
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      const route = VueConfig.getRoute()
      const id = Number(route.params.id)
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
