/**
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('The result is not a string.'))
      }
    }
    reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsDataURL(blob)
  })
}

/**
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
export async function urlToImageElement(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      requestAnimationFrame(() => {
        resolve(img)
      })
    }
    img.onerror = (e) => {
      reject(e)
    }
    img.src = url
  })
}

export function transformFileSize(value) {
  if (typeof value === 'string') {
    const size = value.replace(/\s+/g, '').toUpperCase()
    if (/KB$/.test(size)) {
      const num = size.replace(/KB$/, '')
      return Number(num) * 10 ** 3
    }
    if (/MB$/.test(size)) {
      const num = size.replace(/MB$/, '')
      return Number(num) * 10 ** 6
    }
    if (/GB$/.test(size)) {
      const num = size.replace(/GB$/, '')
      return Number(num) * 10 ** 9
    }
    if (/TB$/.test(size)) {
      const num = size.replace(/TB$/, '')
      return Number(num) * 10 ** 12
    }
    return Number(size)
  }
  if (typeof value === 'number') {
    return value
  }
}

/**
 * @param {string} url
 * @return {Promise<any>}
 */
export function useImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = url
  })
}
