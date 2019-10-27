/**
 * @param {this.$store} store
 * @param {Object} item
 */
export const toPlay = function (store, item) {
  // const item = this.songList[i];
  // console.log(item);
  const payload = {};
  payload.id = item.id;
  payload.name = item.name;
  payload.singer = item.ar;
  payload.picUrl = `${item.al.picUrl}?param=34y34`;
  store.commit('UPDATE_NOW_PLAY', payload);
};

export default {

};
