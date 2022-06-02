<template>
  <div>
    <h2>搜尋列表</h2>
    <ul v-if="resData">
      <li v-for="searchList in resData" :key="searchList.id" class="serch-list">
        <RouterLink :to="`book/${searchList.id}`" title="前往該標籤">{{ searchList.name }}</RouterLink>
      </li>
      <li v-if="errText" class="serch-list">{{ errText }}</li>
    </ul>
  </div>
</template>

<script>
import { apiPostSearch } from '@/api'
import { handleHttpErrorLog } from '@/utils'
import Config from '@/config'
export default {
  name: 'Search',
  data() {
    return {
      resData: null,
      errText: '',
    }
  },
  methods: {
    linkTo(link) {
      this.$router.push(`book/${link}`)
    },
    async effectRoute() {
      const body = Config.getRoute(this).query

      try {
        this.errText = ''
        const res = await apiPostSearch(body)
        this.resData = res.data.results
        document.querySelector('title').innerHTML =
          document.querySelector('title').innerHTML + '-' + body.content.replace(/\//, '')
        if (!this.resData.length) {
          this.errText = '查無結果'
        }
      } catch (error) {
        handleHttpErrorLog(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.serch-list {
  font-size: 18px;
  padding: 8px;
}
h2 {
  margin-bottom: 8px;
}
</style>
