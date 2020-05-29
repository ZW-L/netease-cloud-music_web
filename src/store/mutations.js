import * as types from './mutation_type'

export default {
  [types.UPDATE_FEATURE_RANK](state, list) {
    state.toplist.detail.featureRank = list
  },
  [types.UPDATE_GLOBAL_RANK](state, list) {
    state.toplist.detail.globalRank = list
  },
  [types.UPDATE_NOW_PLAY](state, payload) {
    state.nowPlay.id = payload.id || ''
    state.nowPlay.name = payload.name || ''
    state.nowPlay.singer = payload.singer || ''
    state.nowPlay.picUrl = payload.picUrl || ''
  },
  [types.CHANGE_PLAYLIST](state, playlist) {
    state.playlist.length = 0
    state.playlist = playlist
  },
  [types.ADD_TO_PLAYLIST](state, song) {
    state.playlist.push(song)
  },
  [types.CLEAR_PLAYLIST](state) {
    state.playlist.length = 0
    state.playlist = []
  },
  [types.REMOVE_FROM_PLAYLIST](state, index) {
    state.playlist.splice(index, 1)
  },
  [types.SHOW_ABOUT_SITE](state) {
    state.isShowAboutSite = !state.isShowAboutSite
  },
}
