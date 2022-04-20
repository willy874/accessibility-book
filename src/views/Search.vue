<template>
  <div>
    <h2>搜尋列表</h2>
    <ul v-if="resData">
      <li v-for="searchList in resData" :key="searchList.id" class="serch-list" @click="linkTo(searchList.id)">
        {{ searchList.name }}
      </li>
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
    }
  },
  methods: {
    linkTo(link) {
      this.$router.push(`book/${link}`)
    },
    async effectRoute() {
      const body = Config.getRoute(this).query
      try {
        const res = await apiPostSearch(body)
        this.resData = res.data.results
      } catch (error) {
        handleHttpErrorLog(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.serch-list {
  cursor: pointer;
  font-size: 18px;
  padding: 8px;
}
h2 {
  margin-bottom: 8px;
}
</style>
