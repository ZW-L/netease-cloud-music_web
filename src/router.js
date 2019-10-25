import Vue from 'vue';
import Router from 'vue-router';
import AlbumView from '@discover/views/AlbumView.vue';
import ArtistView from '@discover/views/ArtistView.vue';
import DjradioView from '@discover/views/DjradioView.vue';
import PlaylistView from '@discover/views/PlaylistView.vue';
import RecommendView from '@discover/views/RecommendView.vue';
import ToplistView from '@discover/views/ToplistView.vue';
import DiscoverView from '@discover/DiscoverView.vue';
import SongView from '@/views/song/SongView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'discover',
      component: DiscoverView,
      children: [
        {
          path: '/discover/album',
          name: 'album',
          component: AlbumView,
        },
        {
          path: '/discover/artist',
          name: 'artist',
          component: ArtistView,
        },
        {
          path: '/discover/djradio',
          name: 'diradio',
          component: DjradioView,
        },
        {
          path: '/discover/playlist',
          name: 'playlist',
          component: PlaylistView,
        },
        {
          path: '/discover/recommend',
          name: 'recommend',
          component: RecommendView,
        },
        {
          path: '/discover/toplist',
          name: 'toplist',
          component: ToplistView,
        },
      ],
    },
    {
      path: '/song/:id',
      name: 'song',
      component: SongView,
    },
  ],
});
