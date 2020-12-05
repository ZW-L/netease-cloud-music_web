<template>
  <div class="song">
    <div class="content">
      <div class="main">
        <song-album :al="detail.al"></song-album>
        <div class="main-info">
          <song-poster :detail="detail" />
          <song-lyric :lyric="lyric" />
        </div>
      </div>
    </div>
    <div class="aside">
      <aside-group
        :relativePlaylist="relativePlaylist"
        :similarSong="similarSong"
        :download="download"
      ></aside-group>
    </div>
  </div>
</template>

<script>
import {
  getLyric,
  getSimSong,
  getSongDetail,
  getSimPlaylist,
} from '@/api/get'
import AsideGroup from '@/components/group/AsideGroup.vue'
import SongAlbum from './components/SongAlbum.vue'
import SongPoster from './components/SongPoster.vue'
import SongLyric from './components/SongLyric.vue'

export default {
  name: 'song-detail',

  components: {
    SongAlbum,
    AsideGroup,
    SongPoster,
    SongLyric,
  },

  data() {
    return {
      detail: { // 歌曲详情
        al: {},
        alia: '',
        ar: [],
        name: '',
      },
      lyric: '', // 歌词
      relativePlaylist: [], // 边栏参数，相似歌单
      similarSong: [], // 边栏参数，相似歌曲
      download: true, // 边栏参数
    }
  },

  mounted() {
    this.initialDetail()
  },

  methods: {
    // 初始化页面信息
    initialDetail() {
      // 获取歌曲信息
      const songId = this.$route.query.id
      this.$api.getSongDetail(songId).then(res => {
        // console.log(res.data.songs[0])
        const data = res.data.songs[0]
        this.detail.al = data.al
        this.detail.alia = data.alia
        this.detail.ar = this.detail.ar.concat(data.ar)
        this.detail.name = data.name
        this.detail.id = data.id
        this.detail.picUrl = data.al.picUrl
      })
      // 获取歌词
      this.$api.getLyric(songId).then(res => {
        // console.log(res.data.lrc.lyric)
        this.lyric = res.data.lrc.lyric
      })
      // 获取相似歌单
      this.$api.getSimPlaylist(songId).then(res => {
        // console.log(res.data.playlists)
        this.relativePlaylist = res.data.playlists
      })
      // 获取相似音乐
      this.$api.getSimSong(songId).then(res => {
        // console.log(res.data.songs)
        this.similarSong = res.data.songs
      })
    },
    toAlbumView(albumId) {
      this.$router.push({ path: '/album', query: { id: albumId } })
    },
  },

  watch: {
    /* eslint-disable-next-line */
    '$route' (to, from) {
      this.initialDetail()
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.song {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .main {
      .main-info {
        float: left;
        width: 415px;
        margin-left: 25px;
        font-size: $fontMin;
      }
    }
  }
  .aside {
    width: 270px;
  }
}
</style>
