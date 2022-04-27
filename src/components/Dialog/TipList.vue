<template>
  <div>
    <div v-show="listData.length">
      <div ref="status" role="status" aria-live="assertive" aria-relevant="additions">
        <div v-if="activeData" :key="activeData.text">{{ activeData.text }}</div>
      </div>
      <ul ref="list" class="tip-list" role="list" :style="listStyle">
        <li v-for="(item, index) in listData" :key="item.id" :class="{ item: true, active: index === active }">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { getViewportOffset } from '@/utils'

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: Number,
      default: 250,
    },
  },
  data() {
    return {
      listData: [],
      position: [0, 0],
      active: -1,
    }
  },
  computed: {
    /**
     * @return {Partial<CSSStyleDeclaration>}
     */
    listStyle() {
      const [top, left] = this.position
      return {
        transform: `translate(${left}px,${top}px)`,
        maxHeight: this.maxHeight + 'px',
      }
    },
    /**
     * @return {Partial<SelectData>}
     */
    activeData() {
      const active = this.listData[this.active]
      return active || null
    },
    /**
     * @return {Element}
     */
    listElement() {
      const el = this.$refs.list
      return el && el instanceof Element ? el : null
    },
    /**
     * @return {Element}
     */
    statusElement() {
      const el = this.$refs.status
      return el && el instanceof Element ? el : null
    },
  },
  created() {
    this.update()
    document.addEventListener('click', this.closeList)
  },
  mounted() {
    if (this.listElement) document.body.appendChild(this.listElement)
    if (this.statusElement) document.body.appendChild(this.statusElement)
    if (this.$el) {
      const { top, left } = getViewportOffset(this.$el)
      this.position = [top, left]
    }
  },
  destroyed() {
    if (this.listElement && this.listElement.parentNode) {
      this.listElement.parentNode.removeChild(this.listElement)
    }
    if (this.statusElement && this.statusElement.parentNode) {
      this.statusElement.parentNode.removeChild(this.statusElement)
    }
    document.removeEventListener('click', this.closeList)
  },
  methods: {
    /**
     * @param {SelectData[]} [list]
     */
    closeList() {
      this.listData = []
    },
    update(list) {
      if (list) {
        this.listData = list.map((item) => ({ id: uuid(), ...item }))
      } else {
        this.listData = this.list.map((item) => ({ id: uuid(), ...item }))
      }
    },
    onEnter() {
      if (this.activeData) {
        this.$emit('enter', this.activeData)
      }
    },
    onChange() {
      if (this.activeData) {
        this.$emit('change', this.activeData)
      }
    },
    onNext() {
      if (this.active + 1 >= this.listData.length) {
        this.active = 0
      } else {
        this.active++
      }
      this.onChange()
    },
    onPrev() {
      if (this.active - 1 < 0) {
        this.active = this.listData.length - 1
      } else {
        this.active--
      }
      this.onChange()
    },
  },
}
</script>

<style lang="scss" scoped>
.tip-list {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: auto;
  background-color: #fff;
  border: 1px solid #888;
  color: #444;
  .item {
    padding: 4px 16px;
    &.active {
      background-color: #42b983;
      color: #fff;
    }
  }
}
</style>
