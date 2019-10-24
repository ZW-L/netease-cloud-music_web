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
