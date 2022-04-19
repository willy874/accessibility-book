<template>
  <div class="search-bar">
    <div class="title"><slot name="default" /></div>
    <div class="input">
      <input v-model="inputText" type="text" @input="onInput" @keydown="onKeydown" />
      <TipList ref="tip" @change="onChange" @enter="onEnter" />
    </div>
  </div>
</template>

<script>
import { Getters } from '@/consts'
import TipList from '@/components/Dialog/TipList.vue'
import { mapGetters } from 'vuex'

/**
 * @type {{
 *   tagList: GetterFunction<import('@/store/tag').tagList>
 * }}
 */
const { tagList } = mapGetters({
  tagList: Getters.TAG_LIST,
})

export default {
  name: 'SearchBar',
  components: {
    TipList,
  },
  data() {
    return {
      inputText: '',
    }
  },
  computed: {
    tagList,
    /**
     * 取出 TipList 該 Component
     * @return {any}
     */
    TipList() {
      return this.$refs.tip || null
    },
  },
  methods: {
    onInput() {
      if (/^\//.test(this.inputText)) {
        const infoTagList = this.tagList.filter((tag) => new RegExp(this.inputText.replace(/^\//, '')).test(tag.name))
        this.TipList.update(infoTagList.map((tag) => ({ id: tag.id, value: tag.id, text: tag.name })))
      } else {
        this.TipList.update()
      }
    },
    /**
     * @param {KeyboardEvent} e
     */
    onKeydown(e) {
      switch (e.key) {
        case 'Enter':
          this.TipList.onEnter()
          break
        case 'ArrowUp':
          this.TipList.onPrev()
          break
        case 'ArrowDown':
          this.TipList.onNext()
          break
      }
    },
    /**
     * @param {SelectData} data
     */
    onChange(data) {
      // console.log('onChange', data)
    },
    /**
     * @param {SelectData} data
     */
    onEnter(data) {
      this.inputText = '/' + data.text
      this.TipList.update()
    },
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  .title {
    padding-right: 16px;
  }
  .input {
    flex-grow: 1;
    input {
      border: 1px solid #888;
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
