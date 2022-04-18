<template>
  <div>
    <!--
      <div role="status" aria-live="assertive" aria-relevant="additions"></div>
      <div role="alert" aria-labelledby="alertTitle" aria-describedby="alertDesc"></div>
      <div role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc"></div>
      <div role="alertdialog" aria-labelledby="alertdialogTitle" aria-describedby="alertdialogDesc"></div>
    -->
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
      <div v-show="visible" class="el-dialog__wrapper" @click.self="handleWrapperClick">
        <div
          :key="key"
          ref="dialog"
          role="dialog"
          aria-modal="true"
          :aria-label="title || 'dialog'"
          :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
          :style="style"
        >
          <div class="el-dialog__header">
            <slot name="title">
              <span class="el-dialog__title">{{ title }}</span>
            </slot>
            <button v-if="showClose" type="button" class="el-dialog__headerbtn" aria-label="Close" @click="handleClose">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </div>
          <div v-if="rendered" class="el-dialog__body"><slot></slot></div>
          <div v-if="$slots.footer" class="el-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'

let hasModal = false
let hasInitZIndex = false
let zIndex
let idSeed = 1
let scrollBarWidth

/**
 * @param {HTMLElement} dom
 * @param {string} name
 * @return {boolean}
 */
const hasClass = (dom, name) => {
  let bool = false
  dom.classList.forEach((n) => {
    bool = n === name
  })
  return bool
}
const addClass = (dom, name) => {
  dom.classList.add(name)
}
const removeClass = (dom, name) => {
  dom.classList.remove(name)
}

const getModal = function () {
  if (Vue.prototype.$isServer) return
  let modalDom = PopupManager.modalDom
  if (modalDom) {
    hasModal = true
  } else {
    hasModal = false
    modalDom = document.createElement('div')
    PopupManager.modalDom = modalDom

    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault()
      event.stopPropagation()
    })

    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick()
    })
  }

  return modalDom
}

const instances = {}

const PopupManager = {
  modalFade: true,

  getInstance: function (id) {
    return instances[id]
  },

  register: function (id, instance) {
    if (id && instance) {
      instances[id] = instance
    }
  },

  deregister: function (id) {
    if (id) {
      instances[id] = null
      delete instances[id]
    }
  },

  nextZIndex: function () {
    return PopupManager.zIndex++
  },

  modalStack: [],

  doOnModalClick: function () {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1]
    if (!topItem) return

    const instance = PopupManager.getInstance(topItem.id)
    if (instance && instance.closeOnClickModal) {
      instance.close()
    }
  },

  openModal(id, zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) return
    if (!id || zIndex === undefined) return
    this.modalFade = modalFade

    const modalStack = this.modalStack

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i]
      if (item.id === id) {
        return
      }
    }

    const modalDom = getModal()

    addClass(modalDom, 'v-modal')
    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter')
    }
    if (modalClass) {
      const classArr = modalClass.trim().split(/\s+/)
      classArr.forEach((item) => addClass(modalDom, item))
    }
    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter')
    }, 200)

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom)
    } else {
      document.body.appendChild(modalDom)
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex
    }
    modalDom.tabIndex = 0
    modalDom.style.display = ''

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass })
  },

  closeModal: function (id) {
    const modalStack = this.modalStack
    const modalDom = getModal()

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1]
      if (topItem.id === id) {
        if (topItem.modalClass) {
          const classArr = topItem.modalClass.trim().split(/\s+/)
          classArr.forEach((item) => removeClass(modalDom, item))
        }

        modalStack.pop()
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1)
            break
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave')
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
          modalDom.style.display = 'none'
          PopupManager.modalDom = undefined
        }
        removeClass(modalDom, 'v-modal-leave')
      }, 200)
    }
  },
}

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || (Vue.prototype.$ELEMENT || {}).zIndex || 2000
      hasInitZIndex = true
    }
    return zIndex
  },
  set(value) {
    zIndex = value
  },
})

const getTopPopup = function () {
  if (Vue.prototype.$isServer) return
  if (PopupManager.modalStack.length > 0) {
    const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1]
    if (!topPopup) return
    const instance = PopupManager.getInstance(topPopup.id)

    return instance
  }
}

if (!Vue.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      const topPopup = getTopPopup()

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose
          ? topPopup.handleClose()
          : topPopup.handleAction
          ? topPopup.handleAction('cancel')
          : topPopup.close()
      }
    }
  })
}

function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    var name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  name: 'ElDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    modal: {
      type: Boolean,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '',
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    top: {
      type: String,
      default: '15vh',
    },
    beforeClose: {
      type: Function,
      default: () => {},
    },
    center: {
      type: Boolean,
      default: false,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    modalFade: {
      type: Boolean,
      default: true,
    },
    modalClass: {},
    openDelay: {},
    closeDelay: {},
    zIndex: {},
  },
  data() {
    return {
      key: 0,
      opened: false,
      closed: false,
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false,
      $popupId: null,
      $closeTimer: null,
      $openTimer: null,
      $closing: false,
      $opening: false,
    }
  },
  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
      }
      return style
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          /** @type {HTMLElement} */
          const el = this.$refs.dialog
          el.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
        if (this.$opening) return
        if (!this.rendered) {
          this.rendered = true
          Vue.nextTick(() => {
            this.open()
          })
        } else {
          this.open()
        }
      } else {
        this.close()
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++
          })
        }
      }
    },
  },
  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  beforeMount() {
    this.$popupId = 'popup-' + idSeed++
    PopupManager.register(this.$popupId, this)
  },
  beforeDestroy() {
    PopupManager.deregister(this.$popupId)
    PopupManager.closeModal(this.$popupId)

    this.restoreBodyStyle()
  },
  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true
      }

      const props = merge({}, this.$props || this, options)

      if (this.$closeTimer) {
        clearTimeout(this.$closeTimer)
        this.$closeTimer = null
      }
      clearTimeout(this.$openTimer)

      const openDelay = Number(props.openDelay)
      if (openDelay > 0) {
        this.$openTimer = setTimeout(() => {
          this.$openTimer = null
          this.doOpen(props)
        }, openDelay)
      } else {
        this.doOpen(props)
      }
    },
    getMigratingConfig() {
      return {
        props: {
          size: 'size is removed.',
        },
      }
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
    doOpen(props) {
      if (this.$isServer) return
      // if (this.willOpen && !this.willOpen()) return
      if (this.opened) return

      this.$opening = true

      const dom = this.$el

      const modal = props.modal

      const zIndex = props.zIndex
      if (zIndex) {
        PopupManager.zIndex = zIndex
      }

      if (modal) {
        if (this.$closing) {
          PopupManager.closeModal(this.$popupId)
          this.$closing = false
        }
        PopupManager.openModal(
          this.$popupId,
          PopupManager.nextZIndex(),
          this.modalAppendToBody ? undefined : dom,
          props.modalClass,
          props.modalFade
        )
        if (props.lockScroll) {
          this.withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden')
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight
            this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10)
          }
          scrollBarWidth = getScrollBarWidth()
          const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
          const bodyOverflowY = getStyle(document.body, 'overflowY')
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
            document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px'
          }
          addClass(document.body, 'el-popup-parent--hidden')
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute'
      }

      dom.style.zIndex = PopupManager.nextZIndex()
      this.opened = true

      // this.onOpen && this.onOpen()

      this.doAfterOpen()
    },

    doAfterOpen() {
      this.$opening = false
    },

    close() {
      // if (this.willClose && !this.willClose()) return

      if (this.$openTimer !== null) {
        clearTimeout(this.$openTimer)
        this.$openTimer = null
      }
      clearTimeout(this.$closeTimer)

      const closeDelay = Number(this.closeDelay)

      if (closeDelay > 0) {
        this.$closeTimer = setTimeout(() => {
          this.$closeTimer = null
          this.doClose()
        }, closeDelay)
      } else {
        this.doClose()
      }
    },

    doClose() {
      this.$closing = true

      // this.onClose && this.onClose()

      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200)
      }

      this.opened = false

      this.doAfterClose()
    },

    doAfterClose() {
      PopupManager.closeModal(this.$popupId)
      this.$closing = false
    },

    restoreBodyStyle() {
      if (this.modal && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight
        removeClass(document.body, 'el-popup-parent--hidden')
      }
      this.withoutHiddenClass = true
    },
  },
}
</script>

<style></style>
