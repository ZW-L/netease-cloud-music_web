import * as get from './get'

/**
 * 知道歌曲的详情时，提取信息直接提交到 store
 * @param {$store} store
 * @param {Object} item
 */
export const toPlay = function (store, item) {
  const payload = {}
  payload.id = item.id
  payload.name = item.name
  payload.singer = item.ar
  payload.picUrl = `${item.al.picUrl}?param=34y34`
  store.commit('UPDATE_NOW_PLAY', payload)
}

/**
 * 只知道 id 时，发送一次请求获取歌曲详情，再提交到 store
 * @param {$store} store
 * @param {songId} songId
 */
export const toPlayById = function (store, songId) {
  const payload = { id: songId }
  get.getSongDetail(songId).then(res => {
    const data = res.data.songs[0]
    payload.name = data.name
    payload.singer = data.ar
    payload.picUrl = `${data.al.picUrl}?param=34y34`
    store.commit('UPDATE_NOW_PLAY', payload)
  })
}

export default {

}
