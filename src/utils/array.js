function baseFlatten(array, handler, result = []) {
  let index = -1
  const length = array.length
  while (++index < length) {
    const value = array[index]
    if (Array.isArray(value)) {
      baseFlatten(value, result)
    } else {
      result[result.length] = handler(value)
    }
  }
  return result
}

export function flatten(array, func) {
  const param1 = array ?? []
  const param2 = func ?? ((v) => v)
  if (array.length) {
    baseFlatten(param1, param2)
  }
}
