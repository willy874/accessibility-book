<template>
  <div>
    <div v-show="visible">
      <ul ref="status" role="status" aria-live="assertive" aria-relevant="additions">
        <li></li>
      </ul>
      <ul ref="list" role="list" :style="listStyle">
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'update ',
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
    }
  },
  computed: {
    listStyle() {
      return {}
    },
  },
  watch: {
    visible(value) {
      if (value) {
        this.onOpen()
      } else {
        this.onClose()
      }
    },
  },
  mounted() {
    const listElement = this.$refs.list
    const statusElement = this.$refs.status
    if (listElement && listElement instanceof Element && this.visible) {
      document.body.appendChild(listElement)
    }
    if (statusElement && statusElement instanceof Element && this.visible) {
      document.body.appendChild(statusElement)
    }
  },
  destroyed() {
    const listElement = this.$refs.list
    const statusElement = this.$refs.status
    if (listElement && listElement instanceof Element && listElement.parentNode) {
      listElement.parentNode.removeChild(listElement)
    }
    if (statusElement && statusElement instanceof Element && statusElement.parentNode) {
      statusElement.parentNode.removeChild(statusElement)
    }
  },
  methods: {
    open() {
      this.$emit('update', true)
    },
    close() {
      this.$emit('update', false)
    },
    onOpen() {
      //
    },
    onClose() {
      //
    },
  },
}
</script>

<style></style>
