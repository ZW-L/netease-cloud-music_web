import request from '@/utils/request'

/**
 * 获取所有榜单简介
 */
export const getAllRankDetail = () => {
  return request({
    url: '/api/toplist',
    method: 'get'
  })
}

/**
 * 所有排行榜详情
 */
export const getToplistDetail = () => {
  console.warn('get id:')
  return request({
    url: '/api/toplist/detail',
    method: 'get'
  })
}

/**
 * 获取指定榜单的详细信息 getBillboard
 * @param {number|string} id
 */
export const getRankList = id => {
  return request({
    url: '/api/playlist/detail',
    method: 'get',
    params: { id }
  })
}