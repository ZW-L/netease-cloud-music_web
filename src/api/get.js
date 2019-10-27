import axios from 'axios';

const baseUrl = 'http://localhost:3000';

// 首页轮播
export const getBanner = function () {
  const url = `${baseUrl}/banner`;
  return axios.get(url);
};

// 首页推荐歌单
export const getPersonalized = function (limit) {
  const url = `${baseUrl}/personalized?limit=${limit}`;
  return axios.get(url);
};

// 首页新碟上架
export const getNewest = function () {
  const url = `${baseUrl}/album/newest`;
  return axios.get(url);
};


/* /discover/playlist */
// 获取歌单分类信息
export const getCategoryList = function () {
  const url = `${baseUrl}/playlist/catlist`;
  return axios.get(url);
};

// 获取歌单分类
export const getCategoryBy = function (cat = '全部', offset = 0, limit = 35) {
  const url = `${baseUrl}/top/playlist?cat=${cat}&offset=${offset}&limit=${limit}`;
  return axios.get(url);
};

// 新碟上架页，全部新碟
export const getNewestAll = function (offset = 0, limit = 35) {
  const url = `${baseUrl}/top/album?offset=${offset}&limit=${limit}`;
  return axios.get(url);
};

// 排行榜
export const getBillboard = function (idx) {
  const url = `${baseUrl}/top/list?idx=${idx}`;
  return axios.get(url);
};

/* 排行榜 */
// 排行榜左侧详情
export const getToplistDetail = function () {
  const url = `${baseUrl}/toplist/detail`;
  return axios.get(url);
};

// 排行榜

// 专辑详情
export const getAlbumDetail = function (albumId) {
  const url = `${baseUrl}/album?id=${albumId}`;
  return axios.get(url);
};

// 获取歌手的全部专辑
export const getAllAlbum = function (singerId, limit = 30) {
  const url = `${baseUrl}/artist/album?id=${singerId}&limit=${limit}`;
  return axios.get(url);
};

// 歌曲详情
export const getSongDetail = function (songId) {
  const url = `${baseUrl}/song/detail?ids=${songId}`;
  return axios.get(url);
};

// 歌曲 url
export const getSongUrl = function (songId) {
  const url = `${baseUrl}/song/url?id=${songId}`;
  return axios.get(url);
};

// 歌词
export const getLyric = function (songId) {
  const url = `${baseUrl}/lyric?id=${songId}`;
  return axios.get(url);
};

// 相似歌单
export const getSimPlaylist = function (playlistId) {
  const url = `${baseUrl}/simi/playlist?id=${playlistId}`;
  return axios.get(url);
};

// 歌单详情
export const getPlaylistDetail = function (playlistId) {
  const url = `${baseUrl}/playlist/detail?id=${playlistId}`;
  return axios.get(url);
};

// 最近收藏歌单的用户
export const getCollectPlaylistUsers = function (playlistId, limit = 30) {
  const url = `${baseUrl}/playlist/subscribers?id=${playlistId}&limit=${limit}`;
  return axios.get(url);
};

// 相关歌单推荐
export const getRelativePlaylist = function (playlistId) {
  const url = `${baseUrl}/related/playlist?id=${playlistId}`;
  return axios.get(url);
};

// 相似音乐
export const getSimSong = function (songId) {
  const url = `${baseUrl}/simi/song?id=${songId}`;
  return axios.get(url);
};
