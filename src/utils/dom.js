export const boxOffsetLeft = (element) => {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }

  return actualLeft
}

export const boxOffsetTop = (element) => {
  let actualTop = element.offsetTop
  let current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }

  return actualTop
}

export const isChild = (pNode, cNode) => {
  let temp = cNode
  while (temp) {
    if (pNode === temp) {
      return true
    }
    temp = temp.parentNode
  }

  return false
}

export default {

}
