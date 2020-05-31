<template>
  <div class="play-list-table">
    <div class="list-title">
      <span class="title-main">歌曲列表</span>
      <span class="title-sub">{{songList.length}}首歌</span>
      <span class="title-play" v-show="showPlayCount">播放：
        <em class="title-play-count">{{playCount}}</em>次
      </span>
    </div>
    <table v-show="songList.length">
      <thead>
        <tr class="header">
          <th class="th-indent"></th>
          <th class="th-title">标题</th>
          <th class="th-duration">时长</th>
          <th class="th-singers">歌手</th>
          <th v-if="showAlbum" class="th-album">专辑</th>
        </tr>
      </thead>
      <tbody>
        <tr class="song-item" v-for="(item, i) of songList" :key="i">
          <td class="td-indent">
            <span class="td-indent-order">{{i+1}}</span>
            <span class="td-title-play"
              @click="handlePlay(item)"
            >&nbsp;</span>
          </td>
          <td class="td-title">
            <div class="td-title-more">
              <span class="td-title-name">
                <router-link class="td-title-name-main"
                  :to="`/song?id=${item.id}`"
                >{{item.name}}</router-link>
                <em class="td-title-name-sub" v-show="item.alia.length">- ({{item.alia[0]}})</em>
              </span>
              <span v-if="item.mv > 0" class="td-title-mv"  @click="handleShowAbout()">&nbsp;</span>
            </div>
          </td>
          <td class="td-duration">
            <span class="td-duration-time">{{getDuration(item.dt)}}</span>
            <div class="td-duration-options">
              <span class="opt-add" @click="handleAddToPlaylist(item)"></span>
              <span class="opt-collect" @click="handleShowAbout()"></span>
              <span class="opt-share" @click="handleShowAbout()"></span>
              <span class="opt-download" @click="handleShowAbout()"></span>
            </div>
          </td>
          <td class="td-singers">
            <span v-for="(singer, index) of item.ar" :key="index">
              <em href="" class="td-singers-name" @click="handleShowAbout()">{{singer.name}}</em>
              <em v-show="index < item.ar.length - 1" class="td-singers-devide"> / </em>
            </span>
          </td>
          <td v-if="showAlbum" class="td-album">
            <router-link :to="`/album?id=${item.al.id}`">{{item.al.name}}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getDuration } from '@/utils/util'

export default {
  name: 'song-list-table',

  props: {
    songList: {
      type: Array,
      default: () => [],
    },
    showAlbum: {
      type: Boolean,
      default: false,
    },
    playCount: {
      type: Number,
      default: 999,
    },
    showPlayCount: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    getDuration(d) {
      return getDuration(d)
    },
    handlePlay(item) {
      this.$store.dispatch('toPlay', item)
    },
    handleAddToPlaylist(item) {
      this.$store.dispatch('addToPlaylist', item)
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
    margin-left: 20px;
  }
  .title-play {
    float: right;
    .title-play-count {
      color: $bgSubHeader;
    }
  }
}

table, th, td {
  box-sizing: border-box;
}
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid $bdcDefault;
  border-top: none;
  font-size: $fontMin;
  thead {
    .header {
      height: 35px;
      border-bottom: 1px solid $bdcDefault;
      .th-indent {
        width: 80px;
      }
      .th-title {
        // width: 240px;
      }
      .th-duration {
        width: 110px;
      }
      .th-singers {
        width: 14%;
      }
      .th-album {
        width: 20%;
      }
      th:not(:first-child) {
        padding-left: 7px;
        border-left: 1px solid $bdcDefault;
      }
    }
  }
  tbody {
    tr:nth-child(odd) {
      background-color: $bgTableLight;
    }
    td {
      padding-left: 7px;
      @include ellipse();
    }
  }
}

.song-item {
  height: 29px;
  line-height: 29px;
  /* 鼠标悬停时显示额外的选项 */
  &:hover {
    .td-duration .td-duration-time {
      display: none;
    }
    .td-duration > .td-duration-options {
      display: block;
    }
  }
  span {
    float: left;
  }
  .td-indent {
    .td-indent-order {
      margin-left: 8px;
      width: 17px;
      height: 17px;
      line-height: 17px;
    }
    .td-title-play {
      width: 17px;
      height: 17px;
      margin-left: 15px;
      background: url('../../../public/img/icons/table.png') no-repeat 0 -103px;
      cursor: pointer;
      &:hover {
        background: url('../../../public/img/icons/table.png') no-repeat 0 -128px;
      }
    }
  }
  .td-title {
    .td-title-more {
      height: 20px;
      line-height: 20px;
      .td-title-name {
        max-width: 180px;
        height: 17px;
        @include ellipse();
        .td-title-name-main {
          @include hoverText();
        }
        .td-title-name-sub {
          color: $textLinkDefault;
        }
      }
      .td-title-mv {
        width: 23px;
        height: 17px;
        margin-left: 5px;
        cursor: pointer;
        background: url('../../../public/img/icons/table.png') no-repeat 0 -151px;
        &:hover {
          background: url('../../../public/img/icons/table.png') no-repeat -30px -151px;
        }
      }
    }
  }
  .td-duration {
    position: relative;
    .td-duration-options {
      display: none;
      margin-top: 5px;
      height: 20px;
      .opt-add {
        width: 13px;
        height: 13px;
        background: url('../../../public/img/icons/icon.png') no-repeat 0 -700px;
        &:hover {
          cursor: pointer;
          background: url('../../../public/img/icons/icon.png') no-repeat -22px -700px;
        }
      }
      .opt-collect {
        width: 18px;
        height: 16px;
        margin-left: 3px;
        background: url('../../../public/img/icons/table.png') no-repeat 0 -174px;
        cursor: pointer;
        &:hover {
          background: url('../../../public/img/icons/table.png') no-repeat -20px -174px;
        }
      }
      .opt-share {
        width: 18px;
        height: 16px;
        margin-left: 3px;
        background: url('../../../public/img/icons/table.png') no-repeat 0 -195px;
        cursor: pointer;
        &:hover {
          background: url('../../../public/img/icons/table.png') no-repeat -20px -195px;
        }
      }
      .opt-download {
        width: 18px;
        height: 16px;
        margin-left: 3px;
        background: url('../../../public/img/icons/table.png') no-repeat -81px -174px;
        cursor: pointer;
        &:hover {
          background: url('../../../public/img/icons/table.png') no-repeat -104px -174px;
        }
      }
    }
  }
  .td-singers {
    span {
      float: none;
    }
    max-width: 170px;
    color: $textLinkDefault;
    @include ellipse();
    .td-singers-name {
      @include hoverText();
    }
  }
  .td-album {
    @include hoverText();
  }
}
</style>
