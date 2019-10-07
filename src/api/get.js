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
export const getTopAlbum = function (limit) {
  const url = `${baseUrl}/top/album?limit=${limit}`;
  return axios.get(url);
};

// 排行榜
export const getBillboard = function (idx) {
  const url = `${baseUrl}/top/list?idx=${idx}`;
  return axios.get(url);
};

export default {};
