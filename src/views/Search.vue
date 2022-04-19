<template>
  <div></div>
</template>

<script>
import { apiPostSearch } from '@/api'
import Config from '@/config'
export default {
  name: 'Search',
  methods: {
    async effectRoute() {
      const body = Config.getRoute(this).query
      console.log(body)
      try {
        const res = await apiPostSearch({ content: body })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
