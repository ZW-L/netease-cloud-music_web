<template>
  <div class="top">
    <div class="cate">
      <div class="wrapper">
        <h1 class="cate-title">云音乐特色榜</h1>
        <div class="cate-list">
          <div v-for="(item, i) of featureRank" :key="i"
            :class="['card', { 'cate-item-active': item.id === id }]"
            @click="changeList(item.id)"
          >
            <div class="img">
              <img :src="item.coverImgUrl" :alt="item.name">
            </div>
            <div class="desc">
              <p class="name">{{item.name}}</p>
              <p class="info">{{item.updateFrequency}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <h1 class="cate-title">全球媒体榜</h1>
        <ul class="cate-list">
          <div v-for="(item, i) of globalRank" :key="i"
            :class="['card', { 'cate-item-active': item.id === id }]"
            @click="changeList(item.id)"
          >
            <div class="img">
              <img :src="item.coverImgUrl" :alt="item.name">
            </div>
            <div class="desc">
              <p class="name">{{item.name}}</p>
              <p class="info">{{item.updateFrequency}}</p>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div class="list" ref="list">
      <div class="list-poster">
        <!-- <rank-list-poster 
          :info="listInfo"
          :updateFrequency="updateFrequency"
        ></rank-list-poster> -->
        <div class="poster">
          <div class="wrapper">
            <img :src="listInfo.coverImgUrl" alt="">
          </div>
          <div class="desc">
            <div class="title">{{listInfo.name}}</div>
            <div class="info">
              <i class="info-icon"></i>
              <span class="info-update">最近更新：{{time}}</span>
              <span class="info-frequency">（{{updateFrequency}}）</span>
            </div>
            <div class="btn">
              <btn-bar @playAll="handlePlayAll">
                <span slot="collect">({{listInfo.subscribedCount}})</span>
                <span slot="share">({{listInfo.shareCount}})</span>
                <span slot="comment">({{listInfo.commentCount}})</span>
              </btn-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="list-main">
        <div class="list-title">
          <span class="title-main">歌曲列表</span>
          <span class="title-sub">{{trackCount}}首歌</span>
          <span class="title-play">播放：
            <em class="title-play-count">{{playCount}}</em>次
          </span>
        </div>
        <rank-list-table :songList="songList"></rank-list-table>
      </div>
    </div>
  </div>
</template>

<script>
// import RankListPoster from '@/components/base/RankListPoster.vue';
import RankListTable from '@/components/base/RankListTable.vue';
import BtnBar from '@/components/base/BtnBar.vue';
import { getToplistDetail, getBillboard } from '~api/get.js';
import { getMonthAndDay } from '~api/util.js';
import { mapGetters } from 'vuex';

export default {
  name: 'toplist-view',

  components: {
    // RankListPoster,
    RankListTable,
    BtnBar,
  },

  data() {
    return {
      listInfo: {
        name: '',
        coverImgUrl: '',
        updateTime: 0,
        subscribedCount: 0,
        shareCount: 0,
        commentCount: 0,
      },
      trackCount: 0,
      playCount: 0,
      songList: [],
      id: 19723756,
    }
  },

  computed: {
    ...mapGetters(['featureRank', 'globalRank', 'toIdx']),
    updateFrequency() {
      const oid = this.featureRank.find(v => v.id == this.id) || this.globalRank.find(v => v.id == this.id)
      return oid ? oid.updateFrequency : '每天更新';
    },
    idx() {
      return this.toIdx[`id_${this.id}`];
    },
    time() {
      return getMonthAndDay(this.listInfo.updateTime);
    },
  },

  mounted() {
    this.initialData();
  },

  beforeRouteEnter (to, from, next) {
    console.log('to other route...');
    next();
  },

  methods: {
    // 初始化页面数据
    initialData() {
      // 判断是否从路由跳转而来
      this.id = this.$route.query.id || this.id;
      // 获取排行榜的歌曲列表
      getBillboard(this.idx).then(res => {
        // console.log(res.data.playlist);
        this._extractBillboardData(res);
      }).catch(err => {
        console.log(err);
      });
    },
    // 切换排行榜
    changeList(id) {
      // 响应为当前路由，传递 id 参数
      this.$router.push({ path: '/discover/toplist', query: { id }});
    },
    // 提取排行榜右侧的信息: 图片、歌曲信息等各种数据
    _extractBillboardData(res) {
      const detail = res.data.playlist;
      const info = this.listInfo;
      info.name = detail.name;
      info.coverImgUrl = detail.coverImgUrl;
      info.updateTime = detail.updateTime;
      info.updateFrequency = detail.updateFrequency || info.updateFrequency;
      info.subscribedCount = detail.subscribedCount;
      info.shareCount = detail.shareCount;
      info.commentCount = detail.commentCount;
      this.trackCount = detail.trackCount;
      this.playCount = detail.playCount;
      this.songList = detail.tracks;
    },
    handlePlayAll() {
      this.$store.dispatch('changePlaylist', this.songList);
    },
  },

  watch: {
    // 监听路由变化，重新获取数据，复用当前组件
    '$route' (to, from) {
      this.id = to.query.id;
      this.initialData();
    }
  },

}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';
@import '~css/mixins.scss';

.top {
  display: flex;
  width: 983px;
  margin: 0 auto;
  .cate {
    width: 240px;
    padding-top: 40px;
    border-left: 1px solid $bdcDefault;
    border-right: 1px solid $bdcDefault;
    background-color: $bgContentLight;
    .wrapper {
      .cate-title {
        margin-top: 20px;
        padding: 0 10px 12px;
        font-size: $fontMinL;
        font-weight: bold;
      }
      .cate-list {
        .card {
          display: flex;
          padding: 10px 0 10px 20px;
          @include hoverBg($bgFooter);
          .img {
            width: 40px;
            height: 40px;
            img {
              width: 100%;
            }
          }
          .desc {
            flex: 1;
            margin-left: 8px;
            .name, .info  {
              height: 20px;
              line-height: 20px;
              font-size: $fontMin;
            }
            .info {
              color: $textLinkDefault;
            }
          }
        }
      }
    }
    .cate-item-active {
      background-color: $bgTableDark;
    }
  }
  .list {
    width: 740px;
    border-right: 1px solid $bdcDefault;
    background-color: $bgDefault;
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
}

.poster {
  position: relative;
  padding: 40px;
  .wrapper {
    float: left;
    box-sizing: border-box;
    width: 158px;
    height: 158px;
    padding: 3px 0 0 3px;
    border: 1px solid $textInfoLight;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .desc {
    margin-left: 187px;
    width: 473px;
    height: 113px;
    margin-top: 15px;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: $fontMiddle;
    }
    .info {
      margin-top: 5px;
      height: 13px;
      line-height: 13px;
      font-size: $fontMin;
      .info-icon {
        float: left;
        width: 13px;
        height: 13px;
        background: url('../../../../public/img/icons/icon.png') no-repeat -18px -682px;
      }
      .info-update {
        margin-left: 5px;
      }
      .info-frequency {
        margin-left: 5px;
        color: $textLinkDefault;
      }
    }
    .btn {
      margin-top: 30px;
    }
  }
}
</style>