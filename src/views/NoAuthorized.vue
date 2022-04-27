<template>
  <h2>尚未審核通過</h2>
</template>

<script>
export default {
  name: 'NoAuthorized',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    cu() {
      return ''
    },
  },
  methods: {
    test() {
      console.log(this)
    },
  },
}
</script>
