<template>
  <div class="container">
    <div class="content">
      <div class="main">
        <div class="main-img">
          <div class="img-wrapper">
            <img :src="detail.picUrl+'?param=177y177'">
          </div>
        </div>
        <div class="main-info">
          <div class="info-header">
            <div class="header-icon"></div>
            <h2 class="header-title">{{detail.name}}</h2>
          </div>
          <p class="info-about info-singer">
            歌手：<span v-for="(item, i) of singers" :key="i">{{item}}</span>
          </p>
          <p class="info-about info-date">发行时间：{{publishDate}}</p>
          <p class="info-about info-company">发行公司：{{detail.company}}</p>
          <div class="info-btn">
            <btn-bar @playAll="handlePalyAll">
              <span slot="share">({{detail.info.shareCount}})</span>
              <span slot="comment">({{detail.info.commentCount}})</span>
            </btn-bar>
          </div>
        </div>
      </div>
      <div class="desc">
        <h3 class="desc-title">专辑介绍：</h3>
        <div class="desc-content">
          <p class="content-line" v-for="(item, i) of desc" :key="i">{{item}}</p>
          <!-- <p class="content-line" v-for="(item, i) of description" :key="i">{{item}}</p> -->
        </div>
        <p v-show="shortDesc.length !== fullDesc.length" class="desc-control" @click="handleShowAll()">
          <em v-if="!showAll" class="ctrl-text">展开</em>
          <em v-else class="ctrl-text">收起</em>
          <i :class="['ctrl-icon', showAll ? 'ctrl-up-icon' : 'ctrl-down-icon']"></i>
        </p>
      </div>
      <song-list-table :songList="songList" :showPlayCount="false"></song-list-table>
      <div class="comment"></div>
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
import BtnBar from '@/components/base/BtnBar.vue';
import SongListTable from '@/components/base/SongListTable.vue';
import AsideGroup from '@/components/group/AsideGroup';
import { getAlbumDetail, getAllAlbum } from '~api/get.js';
import { dateFormat, getSingers } from '~api/util.js';

export default {
  name: 'album-detail',

  components: {
    BtnBar,
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
      showAll: false, // 是否显示全部专辑介绍
      albumLikes: [1], // 边栏参数，喜欢这个专辑的人
      ownAlbums: [], // 边栏参数，Ta 的其他热门专辑
      download: true, // 边栏参数，显示 app 下载选项
    };
  },

  computed: {
    singers() {
      return getSingers(this.detail.artists);
    },
    publishDate() {
      return dateFormat(this.detail.publishTime)
    },
    /* desc() {
      return this.detail.desc.split('\n');
    }, */
    fullDesc() {
      return this.detail.desc.split('\n');
    },
    shortDesc() {
      if (this.detail.desc.length <= 100) {
        return this.fullDesc;
      }
      return this.detail.desc.slice(0, 97).concat('...').split('\n');
    },
    desc() {
      return this.showAll ? this.fullDesc : this.shortDesc;
    },
  },

  mounted() {
    this.initialData();
  },

  methods: {
    initialData() {
      // 获取专辑信息
      const albumId = this.$route.query.id;
      getAlbumDetail(albumId).then(res => {
        const album = res.data.album;
        this.songList = res.data.songs;
        this.detail.artists = album.artists;
        this.detail.publishTime = album.publishTime;
        this.detail.desc = album.description;
        this.detail.name = album.name;
        this.detail.company = album.company;
        this.detail.picUrl = album.picUrl;
        this.detail.info.shareCount = album.info.shareCount;
        this.detail.info.commentCount = album.info.commentCount;
        console.log(this.fullDesc);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        // 获取歌手的相关专辑
        getAllAlbum(this.detail.artists[0].id, 5).then(res => {
          this.ownAlbums = res.data.hotAlbums;
        });
      });
    },
    handlePalyAll() {
      this.$store.dispatch('changePlaylist', this.songList);
    },
    handleShowAll() {
      console.log('click...');
      this.showAll = !this.showAll;
    },
  },

  watch: {
    '$route' (to, from) {
      this.initialData();
    },
  },

}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

.container {
  overflow: hidden;
  box-sizing: border-box;
  width: 982px;
  margin: 0 auto;
  background-color: $bgDefault;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  .content {
    box-sizing: border-box;
    float: left;
    width: 710px;
    // height: 1000px;
    padding: 47px 30px 40px 39px;
    border-right: 1px solid $bdcDefault;
    .main {
      overflow: hidden;
      width: 640px;
      margin-bottom: 20px;
      // height: 210px;
      .main-img {
        float: left;
        .img-wrapper {
          position: relative;
          width: 209px;
          height: 177px;
          // background-color: #ccc;
          background: url('../../../public/img/icons/coverall.png') no-repeat 0 -986px;
          img {
            width: 177px;
          }
        }
      }
      .main-info {
        float: left;
        width: 400px;
        margin-left: 25px;
        font-size: $fontMin;
        .info-header {
          overflow: hidden;
          height: 32px;
          line-height: 32px;
          .header-icon {
            float: left;
            width: 54px;
            height: 24px;
            margin-top: 4px;
            background: url('../../../public/img/icons/icon.png') no-repeat 0 -186px;
          }
          .header-title {
            float: left;
            margin-left: 10px;
            font-size: $fontMiddle;
          }
        }
        .info-about {
          height: 18px;
          margin-top: 4px;
          line-height: 18px;
        }
        .info-singer {}
        .info-date {}
        .info-company {}
        .info-btn {
          padding-top: 15px;
        }
      }
      .sub-info {

      }
    }
    .desc {
      margin-bottom: 30px;
      font-size: $fontMin;
      .desc-title {
        height: 24px;
        line-height: 24px;
        font-weight: bold;
      }
      .desc-content {
        text-indent: 2em;
        line-height: 30px;
      }
      .desc-control {
        float: right;
        &:hover {
          cursor: pointer;
        }
        .ctrl-text {
          color: $textLinkBlueLight;
        }
        .ctrl-icon {
          display: inline-block;
          width: 11px;
          height: 8px;
          margin-left: 5px;
        }
        .ctrl-down-icon {
          background: url('../../../public/img/icons/icon.png') no-repeat -65px -520px;
        }
        .ctrl-up-icon {
          background: url('../../../public/img/icons/icon.png') no-repeat -45px -520px;
        }
      }
    }
    .comment {}
  }
  .aside {
    width: 270px;
    float: left;
  }
}
</style>
