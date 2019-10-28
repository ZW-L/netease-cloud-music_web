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
      redirect: '/discover/recommend',
    },
    {
      path: '/discover',
      name: 'discover',
      redirect: '/discover/recommend',
      component: Discover,
      children: [
        {
          path: 'album', // /discover/album
          name: 'discover-album',
          component: DiscoverAlbum,
        },
        {
          path: 'artist',
          name: 'discover-artist',
          component: DiscoverArtist,
        },
        {
          path: 'djradio',
          name: 'discover-diradio',
          component: DiscoverDjradio,
        },
        {
          path: 'playlist',
          name: 'discover-playlist',
          component: DiscoverPlaylist,
        },
        {
          path: 'recommend',
          name: 'discover-recommend',
          component: DiscoverRecommend,
          alias: '/discover',
        },
        {
          path: 'toplist', // /discover/toplist?idx=:idx
          name: 'discover-toplist',
          component: DiscoverToplist,
        },
      ],
    },
    {
      path: '/album', // /album?id=:id
      name: 'album',
      component: AlbumDetail,
    },
    {
      path: '/playlist', // /playlist?cate=:cate
      name: 'playlist',
      component: PlaylistDetail,
    },
    {
      path: '/song', // /song?id=:id
      name: 'song',
      component: SongDetail,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition;
  },
});
