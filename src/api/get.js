import request from '@/utils/request'

// 首页轮播
export const getBanner = function () {
  const url = '/banner'
  return request.get(url)
}

// 首页推荐歌单
export const getPersonalized = function (limit) {
  const url = `/personalized?limit=${limit}`
  return request.get(url)
}

// 首页新碟上架
export const getNewest = function () {
  const url = '/album/newest'
  return request.get(url)
}


/* /discover/playlist */
// 获取歌单分类信息
export const getCategoryList = function () {
  const url = '/playlist/catlist'
  return request.get(url)
}

// 获取歌单分类
export const getCategoryBy = function (cat = '全部', offset = 0, limit = 35) {
  const url = `/top/playlist?cat=${cat}&offset=${offset}&limit=${limit}`
  return request.get(url)
}

// 新碟上架页，全部新碟
export const getNewestAll = function (offset = 0, limit = 35) {
  const url = `/top/album?offset=${offset}&limit=${limit}`
  return request.get(url)
}

// 排行榜
export const getBillboard = function (idx) {
  const url = `/top/list?idx=${idx}`
  return request.get(url)
}

/* 排行榜 */
// 排行榜左侧详情
export const getToplistDetail = function () {
  const url = '/toplist/detail'
  return request.get(url)
}

// 专辑详情
export const getAlbumDetail = function (albumId) {
  const url = `/album?id=${albumId}`
  return request.get(url)
}

// 获取歌手的全部专辑
export const getAllAlbum = function (singerId, limit = 30) {
  const url = `/artist/album?id=${singerId}&limit=${limit}`
  return request.get(url)
}

// 歌曲详情
export const getSongDetail = function (songId) {
  const url = `/song/detail?ids=${songId}`
  return request.get(url)
}

// 歌曲 url
export const getSongUrl = function (songId) {
  const url = `/song/url?id=${songId}`
  return request.get(url)
}

// 歌词
export const getLyric = function (songId) {
  const url = `/lyric?id=${songId}`
  return request.get(url)
}

// 相似歌单
export const getSimPlaylist = function (playlistId) {
  const url = `/simi/playlist?id=${playlistId}`
  return request.get(url)
}

// 歌单详情
export const getPlaylistDetail = function (playlistId) {
  const url = `/playlist/detail?id=${playlistId}`
  return request.get(url)
}

// 最近收藏歌单的用户
export const getCollectPlaylistUsers = function (playlistId, limit = 30) {
  const url = `/playlist/subscribers?id=${playlistId}&limit=${limit}`
  return request.get(url)
}

// 相关歌单推荐
export const getRelativePlaylist = function (playlistId) {
  const url = `/related/playlist?id=${playlistId}`
  return request.get(url)
}

// 相似音乐
export const getSimSong = function (songId) {
  const url = `/simi/song?id=${songId}`
  return request.get(url)
}

// 搜索建议
export const getSearchSuggest = function (keywords = '') {
  const url = `/search/suggest?keywords=${keywords}`
  return request.get(url)
}

export const getArtistCate = function (cat = 1001, initial = '', limit = 100) {
  const url = `/artist/list?cat=${cat}&initial=${initial}&limit=${limit}`
  console.log(url)
  return request.get(url)
}
