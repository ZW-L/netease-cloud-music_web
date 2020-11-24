import request from '@/utils/request'

/**
 * 歌单详情
 * @param {number} id
 */
export const getPlaylistDetail = id => {
  return request({
    url: '/api/playlist/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 歌单分类 getCategoryList
 */
export const getPlaylistCatlist = _ => {
  return request({
    url: '/api/playlist/catlist',
    method: 'get'
  })
}

/**
 * 相关歌单推荐 getRelativePlaylist
 * @param {Number} id
 */
export const getRelatedPlaylist = id => {
  return request({
    url: '/api/related/playlist',
    method: 'get',
    params: { id }
  })
}

/**
 * 相似歌单
 * @param {Number} id
 */
export const getSimPlaylist = id => {
  return request({
    url: '/api/simi/playlist',
    method: 'get',
    params: { id }
  })
}

/**
 * 最近收藏歌单的用户
 * @param {Number} id
 * @param {Number} limit
 */
export const getCollectPlaylistUsers = ({ id, limit = 30 } = {}) => {
  return request({
    url: '/api/playlist/subscribers',
    method: 'get',
    params: { id, limit }
  })
}

/**
 * 获取歌单分类
 * @param {String} cat
 * @param {Number} offset
 * @param {Number} limit
 */
export const getTopPlaylist = ({ cat = '全部', offset = 0, limit = 35 } = {}) => {
  return request({
    url: '/api/top/playlist',
    method: 'get',
    params: { cat, offset, limit }
  })
}