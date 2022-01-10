import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

export function formDataFormat(data) {
  const format = (value, keys = []) => {
    Object.keys(value).forEach((key) => {
      const formName = [...keys, key].map((k, i) => (i ? `[${k}]` : k)).join('')
      if (value[key] instanceof Blob) {
        formData.append(formName, value[key], value[key].name)
      } else if (typeof value[key] === 'object') {
        format(value[key], [...keys, key])
      } else if (value[key] !== undefined && value[key] !== '') {
        if (/base64/.test(formName)) {
          return
        }
        formData.append(formName, value[key])
      }
    })
  }
  const formData = new FormData()
  format(data)
  return formData
}

export { throttle, debounce }
