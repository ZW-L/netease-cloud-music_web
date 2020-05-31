<template>
  <div class="list">
    <rank-list-poster
      :listInfo="listInfo"
      :songList="songList"
      :updateFrequency="updateFrequency" />
    <div class="list-main">
      <div class="list-title">
        <span class="title-main">歌曲列表</span>
        <span class="title-sub">{{trackCount}}首歌</span>
        <span class="title-play">播放：
          <em class="title-play-count">{{playCount}}</em>次
        </span>
      </div>
      <rank-list-table :songList="songList" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBillboard } from '@/api/get'
import RankListTable from './RankListTable.vue'
import RankListPoster from './RankListPoster.vue'

export default {
  name: 'toplist-view',

  components: {
    RankListTable,
    RankListPoster,
  },

  props: {
    id: Number,
  },

  data() {
    return {
      listInfo: {
        name: '',
        coverImgUrl: '',
        updateTime: 0,
        updateFrequency: '每日更新',
        subscribedCount: 0,
        shareCount: 0,
        commentCount: 0,
      },
      trackCount: 0,
      playCount: 0,
      songList: [],
    }
  },

  mounted() {
    this.initialData()
  },

  computed: {
    ...mapGetters(['featureRank', 'globalRank', 'toIdx']),
    idx() {
      return this.toIdx[`id_${this.id}`]
    },
    updateFrequency() {
      const oid = this.featureRank.find(v => v.id === this.id)
        || this.globalRank.find(v => v.id === this.id)
      return oid ? oid.updateFrequency : '每天更新'
    },
  },

  methods: {
    initialData() {
      // 判断是否从路由跳转而来
      const id = this.$route.query.id || this.id
      this.$emit('updateId', id)
      // 获取排行榜的歌曲列表
      getBillboard(this.idx).then(res => {
        this.extractBillboardData(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 提取排行榜右侧的信息: 图片、歌曲信息等各种数据
    extractBillboardData(res) {
      const detail = res.data.playlist
      const info = this.listInfo
      info.name = detail.name
      info.coverImgUrl = detail.coverImgUrl
      info.updateTime = detail.updateTime
      info.updateFrequency = detail.updateFrequency || info.updateFrequency
      info.subscribedCount = detail.subscribedCount
      info.shareCount = detail.shareCount
      info.commentCount = detail.commentCount
      this.trackCount = detail.trackCount
      this.playCount = detail.playCount
      this.songList = detail.tracks
    },
  },

  watch: {
    // 监听路由变化，重新获取数据，复用当前组件
    // eslint-disable-next-line
    '$route'(to, from) {
      this.initialData()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.list {
  width: 740px;
  .list-main {
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 0 40px;
    .list-title {
      height: 35px;
      line-height: 35px;
      font-size: $fontMin;
      border-bottom: 2px solid $bdcTitle;
      .title-main {
        float: left;
        font-size: $fontMiddle;
      }
      .title-sub {
        float: left;
        margin-left: 10px;
      }
      .title-play {
        float: right;
        .title-play-count {
          color: $bgSubHeader;
        }
      }
    }
  }
}
</style>
