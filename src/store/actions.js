/**
 * 提取歌曲详情(将用于提交 UPDATE_NOW_PLAY)
 * @param {Object} item
 */
const extractSongDetail = function (item) {
  const ret = {}
  ret.id = item.id
  ret.name = item.name
  ret.singer = item.ar
  ret.picUrl = `${item.al.picUrl}?param=34y34`
  return ret
}

const findIndexOfPlaylist = function (playlist, item) {
  return playlist.findIndex(v => v.id === item.id)
}

export default {
  updateToplistDetail({ commit }, { featureRank, globalRank }) {
    commit('UPDATE_FEATURE_RANK', featureRank)
    commit('UPDATE_GLOBAL_RANK', globalRank)
  },
  // 播放歌曲
  toPlay({ commit, state }, song) {
    const index = findIndexOfPlaylist(state.play.playlist, song)
    // 如果播放列表不存在则添加
    if (index < 0) {
      commit('ADD_TO_PLAYLIST', song)
    }
    const detail = extractSongDetail(song)
    commit('UPDATE_NOW_PLAY', detail)
  },
  // 更改播放列表
  changePlaylist({ commit, state }, playlist) {
    // 提交新的播放列表
    commit('CHANGE_PLAYLIST', playlist)
    const detail = extractSongDetail(state.play.playlist[0])
    // 提交当前播放歌曲
    commit('UPDATE_NOW_PLAY', detail)
  },
  clearPlaylist({ commit }) {
    commit('CLEAR_PLAYLIST')
  },
  // 添加到播放列表
  addToPlaylist({ commit, state }, song) {
    if (state.play.playlist.length === 0) { // 播放列表为空时，立即播放
      const detail = extractSongDetail(song)
      commit('UPDATE_NOW_PLAY', detail)
    }
    const index = findIndexOfPlaylist(state.play.playlist, song)
    if (index < 0) {
      commit('ADD_TO_PLAYLIST', song)
    }
  },
  // 从播放列表中删除一首歌
  removeFromPlaylist({ commit, state }, song) {
    let index = findIndexOfPlaylist(state.play.playlist, song)
    commit('REMOVE_FROM_PLAYLIST', index)
    if (song.id === state.nowPlay.id) { // 删除的是正在播放的音乐时
      index = index === state.play.playlist.length - 1 ? index : 0 // 删除的是最后一首音乐时
      const detail = extractSongDetail(state.play.playlist[index])
      commit('UPDATE_NOW_PLAY', detail)
    }
  },
}
