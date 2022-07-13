<template>
  <div>
    <h2>標籤列表</h2>
    <div v-if="isLoading">讀取中</div>
    <div v-else-if="tagListById && tagListById.length">
      <ul>
        <li v-for="model in tagListById" :key="model.id" class="tag__list-item list-group-item">
          <RouterLink class="d-flex" :to="getChapterRoute(model.id)">{{ model.name }}</RouterLink>
        </li>
      </ul>
    </div>
    <div v-else-if="tagList && tagList.length">
      <ul>
        <li v-for="model in tagList" :key="model.id" class="tag__list-item list-group-item">
          <RouterLink class="d-flex" :to="getTagDetailRoute(model.id)">{{ model.name }}</RouterLink>
        </li>
      </ul>
    </div>
    <div v-else>沒有資料</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Getters, Actions, RouterName } from '@/consts'
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
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getChapterRoute(id) {
      return { name: RouterName.CHAPTER, params: { id } }
    },
    /**
     * @param {string} id
     * @return {VueRouteLocation}
     */
    getTagDetailRoute(id) {
      return { name: RouterName.TAG_DETAIL, params: { id } }
    },
    /**
     * @param {LifecycleHookEnum} type
     */
    async effectRoute(type) {
      const route = VueConfig.getRoute(this)
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
  &:hover {
    background-color: #68c79c;
    color: #fff;
  }
}
</style>
