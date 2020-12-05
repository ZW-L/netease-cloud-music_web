<template>
  <div class="album">
    <div class="content">
      <album-poster :detail="detail" @playAll="handlePalyAll"/>
      <album-recommend :desc="detail.desc" />
      <song-list-table :songList="songList" :showPlayCount="false"></song-list-table>
    </div>
    <div class="aside">
      <aside-group
        :albumLikes="albumLikes"
        :ownAlbums="ownAlbums"
        :download="download"
      ></aside-group>
    </div>
  </div>
</template>

<script>
import { getAlbumDetail, getAllAlbum } from '@/api/get'
import SongListTable from '@/components/base/SongListTable.vue'
import AsideGroup from '@/components/group/AsideGroup.vue'
import AlbumPoster from './components/AlbumPoster.vue'
import AlbumRecommend from './components/AlbumRecommend.vue'

export default {
  name: 'album-detail',

  components: {
    AlbumPoster,
    AlbumRecommend,
    SongListTable,
    AsideGroup,
  },

  data() {
    return {
      songList: [], // 专辑歌曲列表
      detail: { // 专辑详情
        artists: [],
        publishTime: 0,
        desc: '',
        name: '',
        company: '',
        picUrl: '',
        info: {
          shareCount: 0,
          commentCount: 0,
        },
      },
      albumLikes: [1], // 边栏参数，喜欢这个专辑的人
      ownAlbums: [], // 边栏参数，Ta 的其他热门专辑
      download: true, // 边栏参数，显示 app 下载选项
    }
  },

  mounted() {
    this.initialData()
  },

  methods: {
    initialData() {
      // 获取专辑信息
      const albumId = this.$route.query.id
      this.$api.getAlbumDetail(albumId).then(res => {
        const { album } = res.data
        this.songList = res.data.songs
        this.detail.artists = album.artists
        this.detail.publishTime = album.publishTime
        this.detail.desc = album.description
        this.detail.name = album.name
        this.detail.company = album.company
        this.detail.picUrl = album.picUrl
        this.detail.info.shareCount = album.info.shareCount
        this.detail.info.commentCount = album.info.commentCount
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 获取歌手的相关专辑
        this.$api.getAllAlbum(this.detail.artists[0].id, 5).then(res => {
          this.ownAlbums = res.data.hotAlbums
        })
      })
    },
    handlePalyAll() {
      this.$store.dispatch('changePlaylist', this.songList)
    },
  },

  watch: {
    /* eslint-disable-next-line */
    '$route' (to, from) {
      this.initialData()
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.album {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 47px 30px 40px 39px;
    border-right: 1px solid $bdcDefault;
  }
  .aside {
    width: 270px;
  }
}
</style>
