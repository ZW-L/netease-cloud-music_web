import request from '@/utils/request'

/**
 * 获取默认搜索关键字
 */
export const getSearchDefault = _ => {
  return request({
    url: '/api/search/default',
    method: 'get'
  })
}

/**
 * 获取热搜(详细)
 */
export const getSearchHotDetail = _ => {
  return request({
    url: '/api/search/hot/detail',
    method: 'get'
  })
}

/**
 * 获取搜索建议
 * @param {String} keywords
 * @param {String} type
 */
export const getSearchSuggest = keywords => {
  return request({
    url: '/api/search/suggest',
    method: 'get',
    params: { keywords, type }
  })
}

/**
 * 获取搜索结果
 * type: 1(单曲), 10(专辑), 100(歌手), 1000(歌单), 1002(用户)
 *       1004(MV), 1006(歌词), 1009(电台), 1014(视频), 1018(综合)
 * @param {String} keywords
 * @param {Number} limit
 * @param {Number} offset
 * @param {Number} type
 */
export const getSearch = ({ keywords, limit = 30, offset = 0, type = 1018 } = {}) => {
  const params = type === 1018
    ? { keywords, type }
    : { keywords, limit, offset, type }
  return request({
    url: '/api/search',
    method: 'get',
    params
  })
}

/**
 * 获取搜索多重匹配
 * @param {String} keywords
 */
export const getSearchMultimatch = keywords => {
  return request({
    url: '/api/search/multimatch',
    method: 'get',
    params: { keywords }
  })
}
