import * as types from './mutation_type';

export default {
  [types.UPDATE_FEATURE_RANK](state, list) {
    state.toplist.detail.featureRank = list;
  },
  [types.UPDATE_GLOBAL_RANK](state, list) {
    state.toplist.detail.globalRank = list;
  },
  [types.UPDATE_NOW_PLAY](state, payload) {
    state.nowPlay.id = payload.id || '';
    state.nowPlay.name = payload.name || '';
    state.nowPlay.singer = payload.singer || '';
    state.nowPlay.picUrl = payload.picUrl || '';
  },
};
