import Vue from 'vue';
import Router from 'vue-router';
// 发现页组件
import Discover from '@discover/DiscoverView.vue';
import DiscoverAlbum from '@discover/views/AlbumView.vue';
import DiscoverArtist from '@discover/views/ArtistView.vue';
import DiscoverDjradio from '@discover/views/DjradioView.vue';
import DiscoverPlaylist from '@discover/views/PlaylistView.vue';
import DiscoverRecommend from '@discover/views/RecommendView.vue';
import DiscoverToplist from '@discover/views/ToplistView.vue';
// 歌单详情页组件
import PlaylistDetail from '@/views/playlist/PlaylistDetail.vue';
// 专辑详情页组件
import AlbumDetail from '@/views/album/AlbumDetail.vue';
// 歌曲详情页组件
import SongDetail from '@/views/song/SongDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'discover',
      component: Discover,
      children: [
        {
          path: '/discover/album',
          name: 'discover-album',
          component: DiscoverAlbum,
        },
        {
          path: '/discover/artist',
          name: 'discover-artist',
          component: DiscoverArtist,
        },
        {
          path: '/discover/djradio',
          name: 'discover-diradio',
          component: DiscoverDjradio,
        },
        {
          path: '/discover/playlist',
          name: 'discover-playlist',
          component: DiscoverPlaylist,
        },
        {
          path: '/discover/recommend',
          name: 'discover-recommend',
          component: DiscoverRecommend,
        },
        {
          path: '/discover/toplist',
          name: 'discover-toplist',
          component: DiscoverToplist,
        },
      ],
    },
    {
      path: '/album', // /album?id=12345
      name: 'album',
      component: AlbumDetail,
    },
    {
      path: '/playlist', // /playlist?id=12345
      name: 'playlist',
      component: PlaylistDetail,
    },
    {
      path: '/song', // /song?id=12345
      name: 'song',
      component: SongDetail,
    },
  ],
});
