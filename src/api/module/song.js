import request from '@/utils/request'

/**
 * 新歌速递
 * @param {number} type
 */
export const getTopSong = (type = 7) => {
  return request({
    url: '/api/top/song',
    method: 'get',
    params: { type }
  })
}

/**
 * 获取歌曲详情，支持同时获取多个
 * @param {number | array} id
 */
export const getSongDetail = id => {
  const ids = Array.isArray(id) ? id.join(',') : id
  return request({
    url: '/api/song/detail',
    method: 'get',
    params: { ids }
  })
}

/**
 * 获取歌曲 URL 地址
 * @param {number | string} id
 */
export const getSongUrl = id => {
  return request({
    url: '/api/song/url',
    method: 'get',
    params: { id }
  })
}

/**
 * 获取歌词
 * @param {Number} id
 */
export const getLyric = id => {
  return request({
    url: '/api/lyric',
    method: 'get',
    params: { id }
  })
}

// 相似音乐
export const getSimSong = id => {
  return request({
    url: '/api/simi/song',
    method: 'get',
    params: { id }
  })
}