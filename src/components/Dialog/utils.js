import { v4 as uuid } from 'uuid'

/** @type {Record<string, object>} */
const toolListCollection = {}

export function createToolList() {
  const list = []
  const toolList = {
    id: uuid(),
    isVisible: false,
    list,
    addItem(item) {
      list.push(item)
    },
    removeItem(item) {
      const index = list.indexOf(item)
      if (index >= 0) {
        list.splice(index, 1)
      }
    },
  }
  toolListCollection[toolList.id] = toolList
  return toolList
}

export function getToolList() {
  return {}
}
