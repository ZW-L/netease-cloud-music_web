import request from '@/utils/request'

// 首页轮播
export const getBanner = _ => {
  return request({
    url: '/api/banner',
    method: 'get'
  })
}

// 首页推荐歌单
export const getPersonalized = limit => {
  return request({
    url: '/api/personalized',
    method: 'get',
    params: { limit }
  })
}

// 首页新碟上架
export const getNewest = _ => {
  return request({
    url: '/api/album/newest',
    method: 'get'
  })
}