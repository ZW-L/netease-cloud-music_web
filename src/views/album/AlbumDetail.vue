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
            <btn-bar></btn-bar>
          </div>
        </div>
      </div>
      <div class="desc">
        <h3 class="desc-title">专辑介绍：</h3>
        <div class="desc-content">
          <p class="content-line" v-for="(item, i) of description" :key="i">{{item}}</p>
        </div>
      </div>
      <song-list-table :songList="songList"></song-list-table>
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
      detail: {}, // 专辑详情
      ownAlbums: [], // 边栏参数，Ta 的其他热门专辑
      albumLikes: [1], // 边栏参数，
      download: true, // 边栏参数，
    };
  },

  computed: {
    albumId() {
      return this.$route.query.id;
    },
    singers() {
      // 获取数据前 artists 属性不可用
      return this.detail.artists ? getSingers(this.detail.artists) : [];
    },
    publishDate() {
      // 获取数据前 artists 属性不可用
      return this.detail.publishTime ? dateFormat(this.detail.publishTime) : '1970-01-01';
    },
    description() {
      // 获取数据前 artists 属性不可用
      return this.detail.description ? this.detail.description.split('\t') : '';
    }
  },

  mounted() {
    this.initialData();
  },

  methods: {
    initialData() {
      // 获取专辑信息
      getAlbumDetail(this.albumId).then(res => {
        // console.log(res.data);
        this.songList = res.data.songs;
        this.detail = res.data.album;
        // console.log(this.detail);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        // 获取歌手的相关专辑
        // console.log(this.detail.artists[0].id);
        getAllAlbum(this.detail.artists[0].id, 5).then(res => {
          // console.log(res.data.hotAlbums);
          this.ownAlbums = res.data.hotAlbums;
        });
      });
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
      // overflow: hidden;
      margin-bottom: 30px;
      font-size: $fontMin;
      .desc-title {
        height: 24px;
        // margin-bottom: 5px;
        line-height: 24px;
        font-weight: bold;
      }
      .desc-content {
        // height: 24px;
        text-indent: 2em;
        line-height: 24px;
        // white-space: wrap;
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
