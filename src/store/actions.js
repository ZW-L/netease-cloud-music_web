/**
 * 提取歌曲详情(将用于提交 UPDATE_NOW_PLAY)
 * @param {Object} item
 */
const extractSongDetail = function (item) {
  const ret = {};
  ret.id = item.id;
  ret.name = item.name;
  ret.singer = item.ar;
  ret.picUrl = `${item.al.picUrl}?param=34y34`;
  return ret;
};

export default {
  // 播放歌曲
  toPlay({ commit, state }, song) {
    const index = state.playlist.findIndex(v => v.id === song.id);
    console.log(index);
    // 如果播放列表不存在则添加
    if (index < 0) {
      commit('ADD_TO_PLAYLIST', song);
    }
    const detail = extractSongDetail(song);
    commit('UPDATE_NOW_PLAY', detail);
  },
  // 更改播放列表
  changePlaylist({ commit, state }, playlist) {
    // 提交新的播放列表
    commit('CHANGE_PLAYLIST', playlist);
    const detail = extractSongDetail(state.playlist[0]);
    // 提交当前播放歌曲
    commit('UPDATE_NOW_PLAY', detail);
  },
  clearPlaylist({ commit }) {
    commit('CLEAR_PLAYLIST');
  },
  // 添加到播放列表
  addToPlaylist({ commit, state }, song) {
    const index = state.playlist.findIndex(v => v.id === song.id);
    if (index < 0) {
      commit('ADD_TO_PLAYLIST', song);
    }
  },
};
