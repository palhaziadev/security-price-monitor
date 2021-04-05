export const properyMapper = function (arrayOfObjects) {
  return arrayOfObjects.map(obj => {
    const newObj = {}
    for(const prop in obj) {
      const oldKey = prop.split(' ')
      const newKey = oldKey.length > 1 ? oldKey[1] : oldKey[0]
      newObj[newKey] = obj[prop]
    }
    return newObj
  })

}