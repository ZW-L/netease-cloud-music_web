<template>
  <div>
    <!-- discover/recommend -->
    <div v-if="loginInfo" class="login-info">
      <p class="info-desc">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a class="info-btn">用户登录</a>
    </div>
    <div v-if="inSingers.length" class="content in-singers">
      <h3 class="title">
        入驻歌手
        <em class="title-more" @click="handleShowAbout()">查看全部&gt;</em>
      </h3>
      <div class="list">
        <div class="item" v-for="(item, i) of inSingers" :key="i">
          <div class="item-pic">
            <img :src="item.avatar">
          </div>
          <div class="item-info">
            <p class="info-name">{{item.name}}</p>
            <p class="info-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <p class="footer-text" @click="handleShowAbout()">申请成为音乐人</p>
      </div>
    </div>
    <div v-if="hotPlayers.length" class="content hot-players">
      <h3 class="title">热门主播</h3>
      <div class="list">
        <div class="item" v-for="(item, i) of hotPlayers" :key="i">
          <div class="item-avatar">
            <img :src="item.avatar">
          </div>
          <div class="item-info">
            <p class="info-name">
              {{item.name}}
              <i class="info-name-sup"></i>
            </p>
            <p class="info-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- song/:id -->
    <div v-if="relativePlaylist.length" class="content relative-playlist">
      <h3 class="title">包含这首歌的歌单</h3>
      <div class="list">
        <div class="item" v-for="(item, i) of relativePlaylist" :key="i">
          <div class="item-avatar">
            <img :src="item.coverImgUrl+'?param=50y50'">
          </div>
          <div class="item-info">
            <p class="info-name" @click="toPlaylistView(item)">{{item.name}}</p>
            <p class="info-creator">
              <em>by</em>
              <em v-show="item.creator"
                class="creator-name"
                @click="handleShowAbout()"
              >{{item.creator.nickname}}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="similarSong.length" class="content similar-song">
      <h3 class="title">相似歌曲</h3>
      <div class="list">
        <div class="item" v-for="(item, i) of similarSong" :key="i">
          <div class="item-info">
            <p class="info-name" @click="toSongView(item)">{{item.name}}</p>
            <p class="info-singers">
              <span class="singer-item"
                @click="handleShowAbout()"
              >{{similarSongSingers(item)}}</span>
            </p>
          </div>
          <div class="item-ctrl">
            <span class="ctrl-play" @click="toPlaySong(item)"></span>
            <span class="ctrl-add"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- album/:id -->
    <div v-if="albumLikes.length" class="content album-likes">
      <h3 class="title">喜欢这个专辑的人</h3>
      <div class="list">
        <div class="item" v-for="i of 8" :key="i">
          <img src="../../../public/img/icons/user_default.jpg" @click="handleShowAbout()">
        </div>
      </div>
    </div>
    <div v-if="ownAlbums.length" class="content own-albums">
      <h3 class="title">
        Ta 的其他热门专辑
        <em class="title-more" @click="handleShowAbout()">全部&gt;</em>
      </h3>
      <div class="list">
        <div class="item" v-for="(item, i) of ownAlbums" :key="i">
          <div class="item-avatar">
            <img :src="item.picUrl+'?param=50y50'">
          </div>
          <div class="item-info">
            <p class="info-name" @click="toAlbumView(item)">{{item.name}}</p>
            <p class="info-date">{{handleFormatTime(item.publishTime)}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- playlist/:id -->
    <div v-if="playlistLikes.length" class="content playlist-likes">
      <h3 class="title">喜欢这个歌单的人</h3>
      <div class="list">
        <div class="item" v-for="(item, i) of playlistLikes" :key="i">
          <img v-show="item.avatarUrl"
            :src="item.avatarUrl+'?param=40y40'"
            @click="handleShowAbout()">
        </div>
      </div>
    </div>
    <div v-if="relativeRecommend.length" class="content relative-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="list">
        <div class="item" v-for="(item, i) of relativeRecommend" :key="i">
          <div class="item-avatar">
            <img v-show="item.coverImgUrl" :src="item.coverImgUrl+'?param=50y50'">
          </div>
          <div class="item-info">
            <p class="info-name" @click="toPlaylistView(item)">{{item.name}}</p>
            <p v-show="item.creator !== undefined" class="info-creator">
              <em>by</em>
              <em class="creator-name" @click="handleShowAbout()">{{item.creator.nickname}}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 网易云音乐多端下载 -->
    <div v-if="download" class="content download">
      <h3 class="title">网易云音乐多端下载</h3>
      <div class="list">
        <div class="device ios"></div>
        <div class="device win"></div>
        <div class="device android"></div>
      </div>
      <p class="info">同步歌单，随时畅听320k好音乐</p>
    </div>
  </div>
</template>

<script>
import { toPlayById } from '@/utils/control'
import { getSingers, dateFormat } from '@/utils/util'

export default {
  name: 'aside-group',

  props: {
    loginInfo: {
      type: Boolean,
      default: false,
    },
    inSingers: {
      type: Array,
      default: () => [],
    },
    hotPlayers: {
      type: Array,
      default: () => [],
    },
    relativePlaylist: {
      type: Array,
      default: () => [],
    },
    similarSong: {
      type: Array,
      default: () => [],
    },
    albumLikes: {
      type: Array,
      default: () => [],
    },
    ownAlbums: {
      type: Array,
      default: () => [],
    },
    playlistLikes: {
      type: Array,
      default: () => [],
    },
    relativeRecommend: {
      type: Array,
      default: () => [],
    },
    download: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    similarSongSingers(item) {
      return getSingers(item.artists)
    },
    handleFormatTime(time) {
      return dateFormat(time)
    },
    toPlaylistView(item) {
      this.$router.push({ path: 'playlist', query: { id: item.id } })
    },
    toSongView(item) {
      this.$router.push({ path: 'song', query: { id: item.id } })
    },
    toAlbumView(item) {
      // 有可能路由相同，此时不跳转
      if (this.$route.query.id === item.id) {
        console.log('same route')
        return
      }
      this.$router.push({ path: 'album', query: { id: item.id } })
    },
    toPlaySong(item) {
      // console.log(item);
      toPlayById(this.$store, item.id)
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.content {
  box-sizing: border-box;
  padding: 20px 40px 10px 30px;
  font-size: $fontMin;
  .title {
    height: 23px;
    margin-bottom: 20px;
    line-height: 23px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    .title-more {
      float: right;
      font-weight: normal;
      @include hoverText();
    }
  }
  .list {
    overflow: hidden;
  }
}

// 用户登录
.login-info {
  width: 250px;
  height: 126px;
  background: url('../../../public/img/icons/index.png') no-repeat 0 0;
  .info-desc {
    margin: 0 auto;
    padding: 16px;
    line-height: 22px;
    font-size: 12px;
  }
  .info-btn {
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    text-shadow: 0 1px 0 $loginBtnShadow;
    color: $textLight;
    background: url('../../../public/img/icons/index.png') no-repeat 0 -195px;
    &:hover {
      cursor: pointer;
    }
  }
}

// 入驻歌手
.in-singers {
  padding: 15px 20px 10px 20px;
  .item {
    overflow: hidden;
    margin-bottom: 14px;
    .item-pic {
      float: left;
      width: 62px;
      height: 62px;
      background-color: #ccc;
    }
    .item-info {
      box-sizing: border-box;
      float: left;
      width: 145px;
      height: 62px;
      padding-left: 14px;
      border: 1px solid $bdcDefault;
      border-left: none;
      background-color: $bgUserCard;
      .info-name {
        height: 40px;
        line-height: 40px;
        font-size: $fontMinL;
        font-weight: bold;
      }
      .info-desc {
        font-size: $fontMin;
        @include ellipse();
      }
    }
    &:hover {
      .item-info {
        background-color: $bgTableLight;
      }
    }
  }
  .footer {
    height: 31px;
    text-align: center;
    line-height: 31px;
    background-color: $bgContentLight;
    border: 1px solid #ccc;
    border-radius: 5px;
    @include hoverBg($bgDefault);
    .footer-text {
      height: 31px;
      font-weight: bold;
    }
  }
}

// 热门主播
.hot-players {
  padding: 15px 20px 10px 20px;
  .item {
    overflow: hidden;
    height: 40px;
    margin-bottom: 15px;
    .item-avatar {
      float: left;
      width: 40px;
      height: 40px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 150px;
      margin-left: 5px;
      .info-name, .info-desc {
        height: 20px;
        line-height: 20px;
        @include ellipse();
      }
      .info-name {
        .info-name-sup {
          display: inline-block;
          width: 11px;
          height: 13px;
          vertical-align: middle;
          background: url('../../../public/img/icons/icon.png') no-repeat 0 1px;
        }
      }
      .info-desc {
        color: $info;
      }
    }
  }
}

// 相似歌曲
.similar-song {
  .item {
    height: 30px;
    margin-bottom: 10px;
    line-height: 30px;
    .item-info {
      float: left;
      width: 150px;
      .info-name, .info-singers {
        height: 15px;
        line-height: 15px;
        @include ellipse();
      }
      .info-name {
        @include hoverText();
      }
      .info-singers {
        color: $inputInfo;
        .singer-item {
          &:hover {
            @include hoverText();
          }
        }
      }
    }
    .item-ctrl {
      float: right;
      width: 40px;
      .ctrl-play, .ctrl-add {
        float: left;
        width: 10px;
        height: 11px;
        margin: 10px 0 0 10px;
        &:hover {
          cursor: pointer;
        }
      }
      .ctrl-play {
        background: url('../../../public/img/icons/icon2.png') no-repeat -69px -455px;
      }
      .ctrl-add {
        background: url('../../../public/img/icons/icon2.png') no-repeat -87px -454px;
      }
    }
  }
}

// Ta 的其他热门专辑
.own-albums {
  .item {
    overflow: hidden;
    height: 50px;
    margin-bottom: 15px;
    .item-avatar {
      float: left;
      width: 50px;
      height: 50px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 140px;
      margin-left: 5px;
      .info-name, .info-date {
        height: 25px;
        line-height: 25px;
        @include ellipse();
      }
      .info-name {
        font-size: $fontMinL;
        @include hoverText();
      }
    }
  }
}

// 喜欢这个歌单的人 / 喜欢这个歌单的人
.playlist-likes, .album-likes {
  .item {
    float: left;
    width: 40px;
    height: 40px;
    margin-left: 12px;
    margin-bottom: 12px;
    background-color: #ccc;
    &:nth-child(1), &:nth-child(5) {
      margin-left: 0;
    }
  }
}
// 包含这首歌的歌单 / 相关推荐
.relative-recommend, .relative-playlist {
  .item {
    overflow: hidden;
    height: 50px;
    margin-bottom: 15px;
    .item-avatar {
      float: left;
      width: 50px;
      height: 50px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 140px;
      margin-left: 10px;
      .info-name, .info-creator {
        height: 25px;
        line-height: 25px;
        @include ellipse();
      }
      .info-name {
        font-size: $fontMinL;
        @include hoverText();
      }
      .info-creator {
        color: $titleSub;
        .creator-name {
          margin-left: 5px;
          @include hoverText();
        }
      }
    }
  }
}

.download {
  .device {
    float: left;
    height: 60px;
    &:hover {
      cursor: pointer;
    }
  }
  .ios {
    width: 42px;
    background: url('../../../public/img/icons/ios_1.png');
    &:hover {
      background: url('../../../public/img/icons/ios_2.png');
    }
  }
  .win {
    width: 80px;
    margin: 0 18px;
    background: url('../../../public/img/icons/win_1.png');
    &:hover {
      background: url('../../../public/img/icons/win_2.png');
    }
  }
  .android {
    width: 42px;
    background: url('../../../public/img/icons/android_1.png');
    &:hover {
      background: url('../../../public/img/icons/android_2.png');
    }
  }
  .info {
    margin-top: 10px;
    color: $inputInfo;
  }
}
</style>
