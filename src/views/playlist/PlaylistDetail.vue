<template>
  <div class="container">
    <div class="content">
      <div class="main">
        <div class="main-img">
          <div class="img-wrapper">
            <img v-show="detail.coverImgUrl" :src="detail.coverImgUrl+'?param=200y200'">
          </div>
        </div>
        <div class="main-info">
          <div class="info-header">
            <div class="header-icon"></div>
            <h2 class="header-title">{{detail.name}}</h2>
          </div>
          <p class="info-create">
            <span class="create-item ctor-pic">
              <img :src="creatorPic">
            </span>
            <a href="#" class="create-item ctor-name">{{creatorName}}</a>
            <span class="create-item create-time">
              <em>{{createTime}}</em>
               创建
            </span>
          </p>
          <div class="info-btn">
            <btn-bar @playAll="handlePlayAll">
              <span slot="collect">({{detail.subscribedCount}})</span>
              <span slot="share">({{detail.shareCount}})</span>
              <span slot="comment">({{detail.commentCount}})</span>
            </btn-bar>
          </div>
          <div class="info-tag">
            <span class="tag-name">标签：</span>
            <span class="tag-item" v-for="(tag, i) of detail.tags" :key="i">{{tag}}</span>
          </div>
          <div class="info-desc">
            介绍：
            <p class="desc-item" v-for="(item, i) of desc" :key="i">{{item}}</p>
          </div>
          <p v-show="shortDesc.length !== fullDesc.length" class="desc-control" @click="handleShowAll()">
            <em v-if="!showAll" class="ctrl-text">展开</em>
            <em v-else class="ctrl-text">收起</em>
            <i :class="['ctrl-icon', showAll ? 'ctrl-up-icon' : 'ctrl-down-icon']"></i>
          </p>
        </div>
      </div>
      <song-list-table 
        :songList="songList" 
        :showAlbum="true"
        :trackCount="detail.trackCount"
        :playCount="detail.playCount"
      ></song-list-table>
      <div class="comment"></div>
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
import AsideGroup from '@/components/group/AsideGroup';
import BtnBar from '@/components/base/BtnBar.vue';
import SongListTable from '@/components/base/SongListTable.vue';
import { getPlaylistDetail, getCollectPlaylistUsers, getRelativePlaylist } from '~api/get.js';
import { dateFormat } from '~api/util.js';
import { toPlay } from '~api/control.js';

export default {
  name: 'playlist-detail',

  components: {
    AsideGroup,
    BtnBar,
    SongListTable,
  },

  data() {
    return {
      showAll: false, // 是否显示全部歌单介绍
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
    };
  },

  computed: {
    playlistId() {
      return this.$route.query.id;
    },
    // 怎么优化处理数据？？？
    creatorPic() {
      return this.detail.creator ? `${this.detail.creator.avatarUrl}?param=40y40` : '';
    },
    creatorName() {
      return this.detail.creator ? this.detail.creator.nickname : '';
    },
    createTime() {
      return this.detail.createTime ? dateFormat(this.detail.createTime) : '1970-01-01';
    },
    shortDesc() {
      if (this.detail.desc.length <= 100) {
        return this.fullDesc;
      }
      return this.detail.desc.slice(0, 97).concat('...').split('\n');
    },
    fullDesc() {
      return this.detail.desc.split('\n').concat('');
    },
    desc() {
      return this.showAll ? this.fullDesc : this.shortDesc;
    },
  },

  mounted() {
    this.initialData();
  },

  methods: {
    // 初始化数据
    initialData() {
      // 获取歌单信息
      getPlaylistDetail(this.playlistId).then(res => {
        const data = res.data.playlist;
        const obj = this.detail;
        obj.coverImgUrl = data.coverImgUrl,
        obj.name = data.name,
        obj.creator = data.creator,
        obj.createTime = data.createTime,
        obj.subscribedCount = data.subscribedCount,
        obj.shareCount = data.shareCount,
        obj.commentCount = data.commentCount,
        obj.tags = data.tags,
        obj.desc = data.description,
        obj.trackCount = data.trackCount,
        obj.playCount = data.playCount,
        this.songList = data.tracks;
      });
      // 获取喜欢歌单的人
      getCollectPlaylistUsers(this.playlistId, 8).then(res => {
        // console.log(res.data.subscribers);
        this.playlistLikes = res.data.subscribers;
      });
      // 获取相关歌单推荐
      getRelativePlaylist(this.playlistId).then(res => {
        // console.log(res.data);
        this.relativeRecommend = res.data.playlists;
      });
    },
    handlePlayAll() {
      this.$store.dispatch('changePlaylist', this.songList);
    },
    handleShowAll() {
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
@import '~css/mixins.scss';

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
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .main {
      overflow: hidden;
      width: 640px;
      // height: 210px;
      margin-bottom: 30px;
      .main-img {
        float: left;
        .img-wrapper {
          padding: 3px;
          img {
            width: 100%;
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
          // height: 32px;
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
            width: 320px;
            margin-left: 5px;
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
            width: 35px;
            height: 35px;
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
          color: $info;
          .desc-item {
            margin-bottom: 15px;
          }
        }
        .desc-control {
          float: right;
          // background-color: #ccc;
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
    }
    .comment {}
  }
  .aside {
    float: left;
    width: 270px;
  }
}
</style>
