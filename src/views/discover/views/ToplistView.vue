<template>
  <div class="top">
    <div class="cate">
      <div class="wrapper">
        <h1 class="cate-title">云音乐特色榜</h1>
        <div class="cate-list">
          <rank-list-card 
            v-for="(item, i) of featureRank" :key="i"
            :detail="item"
            :class="{ 'cate-item-active': item.id === id }"
            @click.native="changeList(item.id)"
          ></rank-list-card>
        </div>
      </div>
      <div class="wrapper">
        <h1 class="cate-title">全球媒体榜</h1>
        <ul class="cate-list">
          <rank-list-card 
            v-for="(item, i) of globalRank" :key="i"
            :detail="item"
            :class="{ 'cate-item-active': item.id === id }"
            @click.native="changeList(item.id)"
          ></rank-list-card>
        </ul>
      </div>
    </div>
    <div class="list">
      <div class="list-poster">
        <rank-list-poster :info="listInfo"></rank-list-poster>
      </div>
      <div class="list-main">
        <div class="list-title">
          <span class="title-main">歌曲列表</span>
          <span class="title-sub">100首歌</span>
          <span class="title-play">播放：
            <em class="title-play-count" v-if="listInfo.playCount">{{listInfo.playCount}}</em>次
          </span>
        </div>
        <rank-list-table :songList="songList"></rank-list-table>
      </div>
    </div>
  </div>
</template>

<script>
import RankListCard from '@/components/base/RankListCard.vue';
import RankListPoster from '@/components/base/RankListPoster.vue';
import RankListTable from '@/components/base/RankListTable.vue';
import { getToplistDetail, getBillboard } from '~api/get.js';
import { mapGetters } from 'vuex';

export default {
  name: '',

  components: {
    RankListCard,
    RankListPoster,
    RankListTable,
  },

  props: {},

  data() {
    return {
      songList: [],
      id: 19723756,
    }
  },

  computed: {
    ...mapGetters(['featureRank', 'globalRank', 'toIdx']),
    listInfo() {
      return this.featureRank.find(v => v.id === this.id) || this.globalRank.find(v => v.id === this.id);
    },
  },

  mounted() {
    this._handleGetData();
    // console.log(this.featureRank);
  },

  methods: {
    _handleGetData() {
      getToplistDetail().then(res => {
        // console.log(res.data.list);
        const data = res.data.list;
        const featureRank = data.slice(0, 4);
        const globalRank = data.slice(4);
        this.$store.commit('UPDATE_FEATURE_RANK', featureRank);
        this.$store.commit('UPDATE_GLOBAL_RANK', globalRank);
      }).catch(err => {
        console.log(err);
      });
      getBillboard(3).then(res => {
        // console.log(res.data.playlist.tracks);
        this.songList = this.songList.concat(res.data.playlist.tracks);
      }).catch(err => {
        console.log(err);
      });
    },
    
    changeList(i) {
      this.id = i;
      const idx = this.toIdx[`id_${i}`];
      getBillboard(idx).then(res => {
        // console.log(res.data.playlist.tracks);
        this.songList = res.data.playlist.tracks;
      }).catch(err => {
        console.log(err);
      });
    },
  },

}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

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
</style>