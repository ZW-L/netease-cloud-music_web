import request from '@/utils/request'

export const getArtistCate = function (cat = 1001, initial = '', limit = 100) {
  const url = `/api/artist/list?cat=${cat}&initial=${initial}&limit=${limit}`
  console.log(url)
  return request.get(url)
}
