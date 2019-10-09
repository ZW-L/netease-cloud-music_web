<template>
  <div class="top">
    <div class="cate">
      <div class="wrapper">
        <h1 class="cate-title">云音乐特色榜</h1>
        <ul class="cate-list">
          <rank-list-card 
            v-for="(item, i) of featureRank" :key="i"
            :detail="item"
          ></rank-list-card>
        </ul>
      </div>
      <div class="wrapper">
        <h1 class="cate-title">全球媒体榜</h1>
        <ul class="cate-list">
          <rank-list-card 
            v-for="(item, i) of globalRank" :key="i"
            :detail="item"
          ></rank-list-card>
        </ul>
      </div>
    </div>
    <div class="list">
      <div class="list-poster">
        <rank-list-poster></rank-list-poster>
      </div>
      <div class="list-main">
        <div class="list-title">
          <span class="title-main">歌曲列表</span>
          <span class="title-sub">100首歌</span>
          <span class="title-play">播放：
            <em class="title-play-count">2418100736</em>次
          </span>
        </div>
        <div class="list-content">
          <table>
            <thead>
              <tr>
                <th class="indent"></th>
                <th class="title">标题</th>
                <th class="duration">时长</th>
                <th class="singers">歌手</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i of 100" :key="i">
                <td class="order">{{i}}</td>
                <td class="title">悄悄的他</td>
                <td class="duration">03:28</td>
                <td class="singers">花粥</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RankListCard from '@/components/base/RankListCard.vue';
import RankListPoster from '@/components/base/RankListPoster.vue';
import { getToplistDetail } from '~api/get.js';
import { mapGetters } from 'vuex';

export default {
  name: '',

  components: {
    RankListCard,
    RankListPoster,
  },

  props: {},

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters(['featureRank', 'globalRank']),
  },

  mounted() {
    this._handleGetData();
  },

  methods: {
    _handleGetData() {
      getToplistDetail().then(res => {
        // console.log(res.data.list);
        const data = res.data.list,
              featureRank = data.slice(0, 4),
              globalRank = data.slice(4);
        this.$store.commit('UPDATE_FEATURE_RANK', featureRank);
        this.$store.commit('UPDATE_GLOBAL_RANK', globalRank);
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
  }
  .list {
    width: 740px;
    border-right: 1px solid $bdcDefault;
    background-color: $bgDefault;
    .list-main {
      margin-top: 40px;
      padding: 0 40px;
      .list-title {
        height: 35px;
        line-height: 35px;
        font-size: $fontMin;
        // background-color: #ccc;
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
      .list-content {
        table, th, td {
          box-sizing: border-box;
        }
        table {
          border: 1px solid $bdcDefault;
          border-top: none;
          font-size: $fontMin;
        }
        thead {
          th {
            height: 35px;
            border-bottom: 1px solid $bdcDefault;
            &.indent {
              width: 78px;
            }
            &.title {
              width: 328px;
            }
            &.duration {
              width: 90px;
            }
            &.singers {
              width: 170px;
            }
            &:not(:first-child) {
              padding-left: 5px;
              border-left: 1px solid $bdcDefault;
            }
          }
        }
        tbody {
          tr:nth-child(odd) {
            background-color: $bgTableLight;
          }
          td {
            padding-left: 5px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>