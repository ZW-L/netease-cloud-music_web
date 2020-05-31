import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/discover/recommend',
    },
    {
      path: '/discover',
      redirect: '/discover/recommend',
      component: Layout,
      children: [
        {
          path: 'album', // /discover/album
          component: () => import('@discover/views/AlbumView.vue'),
        },
        {
          path: 'artist',
          component: () => import('@discover/views/ArtistView.vue'),
        },
        {
          path: 'djradio',
          component: () => import('@discover/views/DjradioView.vue'),
        },
        {
          path: 'playlist',
          component: () => import('@discover/views/PlaylistView/index.vue'),
        },
        {
          path: 'recommend',
          alias: '/discover',
          component: () => import('@discover/views/RecommendView/index.vue'),
        },
        {
          path: 'toplist', // /discover/toplist?idx=:idx
          component: () => import('@discover/views/ToplistView/index.vue'),
        },
      ],
    },
    {
      path: '/album', // /album?id=:id
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/album/index.vue'),
        },
      ],
    },
    {
      path: '/playlist', // /playlist?cate=:cate
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/playlist/index.vue'),
        },
      ],
    },
    {
      path: '/song', // /song?id=:id
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/song/index.vue'),
        },
      ],
    },
  ],
  /* eslint-disable-next-line */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})
