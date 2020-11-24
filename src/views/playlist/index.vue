<template>
  <div class="playlist">
    <div class="content">
      <playlist-poster :detail="detail" />
      <song-list-table
        :songList="songList"
        :showAlbum="true"
        :trackCount="detail.trackCount"
        :playCount="detail.playCount"
      ></song-list-table>
    </div>
    <div class="aside">
      <aside-group
        :playlistLikes="playlistLikes"
        :relativeRecommend="relativeRecommend"
        :download="download"
      ></aside-group>
    </div>
  </div>
</template>

<script>
import AsideGroup from '@/components/group/AsideGroup.vue'
import SongListTable from '@/components/base/SongListTable.vue'
import PlaylistPoster from './components/PlaylistPoster.vue'

export default {
  name: 'playlist-detail',
  components: {
    PlaylistPoster,
    SongListTable,
    AsideGroup,
  },
  data () {
    return {
      detail: { // 歌单详情
        coverImgUrl: '',
        name: '',
        creator: '',
        createTime: 0,
        subscribedCount: 0,
        shareCount: 0,
        commentCount: 0,
        tags: [],
        desc: '',
        trackCount: 0,
        playCount: 0,
      },
      songList: [], // 歌单的所有歌曲
      playlistLikes: [], // 边栏参数，喜欢歌单的人
      relativeRecommend: [], // 边栏参数，相关歌单推荐
      download: true, // 边栏参数，app 选项
    }
  },
  mounted () {
    this.initialData()
  },
  computed: {
    playlistId () {
      return this.$route.query.id
    }
  },
  methods: {
    initialData () {
      // 获取歌单信息
      this.$api.getPlaylistDetail(this.playlistId).then(res => {
        // console.log(res)
        const data = res.data.playlist
        const obj = this.detail
        obj.coverImgUrl = data.coverImgUrl
        obj.name = data.name
        obj.creator = data.creator
        obj.createTime = data.createTime
        obj.subscribedCount = data.subscribedCount
        obj.shareCount = data.shareCount
        obj.commentCount = data.commentCount
        obj.tags = data.tags
        obj.desc = data.description
        obj.trackCount = data.trackCount
        obj.playCount = data.playCount
        this.songList = data.tracks
      })
      // 获取喜欢歌单的人
      this.$api.getCollectPlaylistUsers({ id: this.playlistId, limit: 8 }).then(res => {
        // console.log(res.data.subscribers);
        this.playlistLikes = res.data.subscribers
      })
      // 获取相关歌单推荐
      this.$api.getRelatedPlaylist(this.playlistId).then(res => {
        // console.log(res.data);
        this.relativeRecommend = res.data.playlists
      })
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route' (to, from) {
      this.initialData()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.playlist {
  overflow: hidden;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
  }
  .aside {
    width: 270px;
  }
}
</style>
