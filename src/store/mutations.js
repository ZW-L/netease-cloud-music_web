import * as types from './mutation_type';

export default {
  [types.UPDATE_FEATURE_RANK](state, list) {
    state.toplist.detail.featureRank = list;
  },
  [types.UPDATE_GLOBAL_RANK](state, list) {
    state.toplist.detail.globalRank = list;
  },
};
