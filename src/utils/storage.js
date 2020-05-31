const storage = localStorage

export const setLocalStorage = (key, data, maxAge = 60) => {
  storage.setItem(key, JSON.stringify({
    data,
    maxAge: maxAge * 1000, // 数据有效期
    lastModify: Date.now(), // 最后修改时间
  }))
}

export const getLocalStorage = (key) => {
  const val = storage.getItem(key)

  // 数据不存在
  if (!val) {
    return undefined
  }

  const temp = JSON.parse(val)

  // 数据已过期
  if (temp.maxAge + temp.lastModify < Date.now()) {
    return undefined
  }

  return temp.data
}

export default {

}
