<template>
  <div class="container">
    <div class="content">
      <div class="main">
        <div class="main-img">
          <div class="img-wrapper">
            <img src="http://p3.music.126.net/VFd5cboNTbnYsWZ5DBn9bg==/18953381440004340.jpg?param=200y200">
          </div>
        </div>
        <div class="main-info">
          <div class="info-header">
            <div class="header-icon"></div>
            <h2 class="header-title">我和我的祖国</h2>
          </div>
          <p class="info-create">
            <span class="create-item ctor-pic">
              <img src="http://p1.music.126.net/YUDAnswzzBas9Rdb9iYutQ==/109951163240891777.jpg?param=40y40">
            </span>
            <a href="" class="create-item ctor-name">流年忧光影</a>
            <span class="create-item create-time">2017-11-07 创建</span>
          </p>
          <div class="info-btn">
            <btn-bar></btn-bar>
          </div>
          <div class="info-tag">
            <span class="tag-name">标签：</span>
            <span class="tag-item">粤语</span>
            <span class="tag-item">怀旧</span>
            <span class="tag-item">华语</span>
          </div>
          <div class="info-desc">
            介绍： 在时光中沉淀的首首经典老歌，承载了一段段印刻在内心最深处的回忆。重温经典，回味那些逝去的时光...
          </div>
        </div>
      </div>
      <playlist-table :songList="songList"></playlist-table>
      <div class="comment"></div>
    </div>
    <div class="aside">
      <aside-assembly
        :playlistLikes="playlistLikes"
        :relativeRecommend="relativeRecommend"
        :download="download"
      ></aside-assembly>
    </div>
  </div>
</template>

<script>
import BtnBar from '@/components/base/BtnBar.vue';
import PlaylistTable from '@/components/base/PlaylistTable.vue';
import AsideAssembly from '@/components/AsideAssembly';
import { getBillboard } from '~api/get.js';

export default {
  name: 'playlist-detail',

  components: {
    BtnBar,
    PlaylistTable,
    AsideAssembly,
  },

  props: {},

  data() {
    return {
      songList: [],
      playlistLikes: [1],
      relativeRecommend: [1],
      download: true,
    };
  },

  mounted() {
    getBillboard(3).then(res => {
      // console.log(res.data.playlist.tracks);
      this.songList = this.songList.concat(res.data.playlist.tracks);
    }).catch(err => {
      console.log(err);
    });
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
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .main {
      width: 640px;
      height: 210px;
      margin-bottom: 30px;
      .main-img {
        float: left;
        .img-wrapper {
          padding: 3px;
          img {
            width: 200px;
          }
          border: 1px solid #ccc;
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
            width: 72px;
            height: 24px;
            margin-top: 4px;
            background: url('../../../public/img/icons/icon2.png') no-repeat -110px -275px;
          }
          .header-title {
            float: left;
            margin-left: 10px;
            font-size: $fontMiddle;
          }
        }
        .info-create {
          height: 35px;
          line-height: 35px;
          margin: 5px 0;
          .create-item {
            float: left;
          }
          .ctor-pic {
            img {
              width: 35px;
            }
          }
          .ctor-name {
            margin-left: 10px;
          }
          .create-time {
            margin-left: 15px;
          }
        }
        .info-btn {
          padding-top: 10px;
        }
        .info-tag {
          margin: 10px 0 5px 0;
          .tag-item {
            display: inline-block;
            margin-right: 10px;
            height: 22px;
            line-height: 22px;
            padding: 2px 6px;
            border: 1px solid #ccc;
            border-radius: 8px;
          }
        }
        .info-desc {
          margin-top: 4px;
          line-height: 18px;
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
