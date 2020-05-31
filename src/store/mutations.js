import * as types from './mutation_type'

export default {
  [types.UPDATE_FEATURE_RANK](state, list) {
    state.toplist.detail.featureRank = list
  },
  [types.UPDATE_GLOBAL_RANK](state, list) {
    state.toplist.detail.globalRank = list
  },
  [types.UPDATE_NOW_PLAY](state, payload) {
    state.play.nowPlay.id = payload.id || ''
    state.play.nowPlay.name = payload.name || ''
    state.play.nowPlay.singer = payload.singer || ''
    state.play.nowPlay.picUrl = payload.picUrl || ''
  },
  [types.CHANGE_PLAYLIST](state, playlist) {
    state.play.playlist.length = 0
    state.play.playlist = playlist
  },
  [types.ADD_TO_PLAYLIST](state, song) {
    state.play.playlist.push(song)
  },
  [types.CLEAR_PLAYLIST](state) {
    state.play.playlist.length = 0
    state.play.playlist = []
  },
  [types.REMOVE_FROM_PLAYLIST](state, index) {
    state.play.playlist.splice(index, 1)
  },
  [types.SHOW_ABOUT_SITE](state) {
    state.isShowAboutSite = !state.isShowAboutSite
  },
}
