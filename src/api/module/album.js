import request from '@/utils/request'

/**
 * 最新专辑
 */
export const getAlbumNewest = () => {
  return request({
    url: '/api/album/newest',
    method: 'get'
  })
}

/**
 * 新碟上架
 * @param {Number} limit
 * @param {Number} offset
 */
export const getTopAlbum = ({ limit = 50, offset = 0 } = {}) => {
  return request({
    url: '/api/top/album',
    method: 'get',
    params: { limit, offset }
  })
}

/**
 * 专辑内容
 * @param {Number} id
 */
export const getAlbumDetail = id => {
  return request({
    url: '/api/album',
    method: 'get',
    params: { id }
  })
}

/**
 * 歌手的全部专辑
 * @param {Number} id
 * @param {Number} limit
 */
export const getAllAlbum = ({ id, limit = 50 } = {} ) => {
  return request({
    url: '/api/artist/album',
    method: 'get',
    params: { id, limit }
  })
}
