import * as get from './module/get'
import * as song from './module/song'
import * as album from './module/album'
import * as playlist from './module/playlist'
import * as rank from './module/rank'
import * as search from './module/search'
import * as artist from './module/artist'

export default {
  ...get,
  ...song,
  ...album,
  ...playlist,
  ...rank,
  ...search,
  ...artist
}
