<template>
  <div>
    <h2>書籤列表</h2>
    <template v-if="loading">
      <div>讀取中</div>
    </template>
    <template v-else>
      <div v-if="listModel.length">
        <div v-for="model in listModel" :key="model.id">
          <RouterLink :to="getChapterRoute(model.id)">{{ model.chapter_name }}</RouterLink>
          <button @click="deleteBookMark(model.id)">刪除</button>
        </div>
      </div>
      <div v-else>
        <div>沒有資料</div>
      </div>
    </template>
  </div>
</template>

<script>
import { HttpError, handleHttpErrorLog } from '@/utils'
import { apiGetBookMark, apiDeleteBookMark } from '@/api/index'
import { RouterName } from '@/consts'

export default {
  name: 'BookMark',
  data() {
    return {
      /** @type {BookMarkModel[]} */
      listModel: null,
      loading: false,
    }
  },
  watch: {
    $route() {
      this.effectComponentPage()
    },
  },
  async created() {
    this.effectComponentPage()
  },
  methods: {
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
    async deleteBookMark(id) {
      try {
        const res = await apiDeleteBookMark(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          this.effectComponentPage()
        }
      } catch (error) {
        handleHttpErrorLog(error)
      }
    },
    /**
     * @depend
     * @param {BookMarkModel[]} this.listModel
     * @param {number} this.active
     */
    async effectComponentPage() {
      this.loading = true
      const res = await apiGetBookMark()
      this.listModel = res.data
      this.loading = false
    },
  },
}
</script>
