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
export const getCategoryBy = function (tag = '全部', offset = 0, limit = 35) {
  const url = `${baseUrl}/top/playlist?tag=${tag}&offset=${offset}&limit=${limit}`;
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


// 歌曲 url
export const getSongUrl = function (id) {
  const url = `${baseUrl}/song/url?id=${id}`;
  return axios.get(url);
};
