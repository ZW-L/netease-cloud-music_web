<template>
  <div class="pc">
    <div class="pc-header">
      <div class="header-left">
        <h3 class="header-title">播放列表(92)</h3>
        <div class="header-ctrl">
          <span class="ctrl-collect">
            <i class="icon"></i>收藏全部
          </span>
          <span class="line"></span>
          <span class="ctrl-clear" @click="handleClearPlaylist()">
            <i class="icon"></i>清除
          </span>
        </div>
      </div>
      <div class="header-right">
        <div class="curr-title">{{nowPlay.name}}</div>
        <span class="header-close" @click="closeContent"></span>
      </div>
    </div>
    <div class="pc-wrapper">
      <ul class="wr-left">
        <li v-for="(item, i) of playlist" :key="i"
          :class="['song', { 'song-play': item.id === nowPlay.id }]"
          @click="handleToPlay(item)"
        >
          <span v-show="item.id === nowPlay.id" class="song-tag"></span>
          <h4 class="song-name">{{item.name}}</h4>
          <span class="song-ctrl">
            <i class="ctrl-icon ctrl-collect" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon ctrl-share" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon ctrl-download" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon ctrl-delete" @click.stop="handleDelete(item)"></i>
          </span>
          <span class="song-singer">{{_getSingers(item)}}</span>
          <span class="song-duration">{{_getDuration(item)}}</span>
          <span class="song-from"></span>
        </li>
      </ul>
      <div class="wr-right" ref="lyricWrapper">
        <ul class="lyric" ref="content">
          <li
            v-for="(item, i) of lyrics" :key="i" 
            :class="['lyric-item', { 'lyric-item-active': i === 1 }]"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingers, getDuration } from '~api/util.js';
import { getLyric } from '~api/get.js';
import { mapGetters } from 'vuex';

export default {
  name: 'play-content',

  components: {},

  props: {
    currentTime: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      lyric: '',
      timer: 0,
      count: 10,
    }
  },

  computed: {
    ...mapGetters(['nowPlay', 'playlist']),
    songId() {
      return this.nowPlay.id;
    },
    lyrics() {
      // console.log(this.lyric);
      return this.lyric.split('\n').map(v => v.replace(/[\[\]\d\:\.]+/, ''));
    },
  },

  mounted() {
    if (this.songId) {
      this.initialData();
    }
  },

  methods: {
    initialData() {
      getLyric(this.songId).then(res => {
        this.lyric = res.data.lrc ? res.data.lrc.lyric : '';
      });
    },
    _getPlaylistIndex(item) {
      return this.playlist.findIndex(v => v.id === item.id);
    },
    _getSingers(item) {
      const index = this._getPlaylistIndex(item);
      return getSingers(this.playlist[index].ar);
    },
    _getDuration(item) {
      const index = this._getPlaylistIndex(item);
      return getDuration(this.playlist[index].dt);
    },
    closeContent() {
      this.$emit('close');
    },
    handleToPlay(item) {
      this.$store.dispatch('toPlay', item);
    },
    handleClearPlaylist() {
      this.$store.dispatch('clearPlaylist');
    },
    handleDelete(item) {
      this.$store.dispatch('removeFromPlaylist', item);
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE');
    },
  },

  watch: {
    songId (newId) {
      this.initialData(newId);
    },
    currentTime(time) {

    },
  },

}
</script>

<style lang="scss" scoped>
@import '~css/variables.scss';
@import '~css/mixins.scss';

.pc {
  background-color: #000;
  color: $textLight;
  border-radius: 10px;
  .pc-header {
    height: 41px;
    background: url('../../public/img/icons/playlist_bg.png') no-repeat -2px 0;
    .header-left {
      box-sizing: border-box;
      float: left;
      width: 580px;
      height: 41px;
      padding-left: 25px;
      line-height: 41px;
      .header-title {
        float: left;
        font-weight: bold;
        font-size: $fontMinL;
      }
      .header-ctrl {
        float: right;
        margin-right: 25px;
        font-size: $fontMin;
        color: $textLinkDefault;
        .ctrl-collect, .ctrl-clear {
          float: left;
          margin: 0 10px;
          .icon {
            float: left;
            width: 16px;
            height: 15px;
            margin-top: 12px;
            margin-right: 5px;
            background: url('../../public/img/icons/playlist.png') no-repeat -24px 0;
          }
        }
        .ctrl-collect {
          &:hover {
            cursor: pointer;
            color: $textLight;
            .icon {
              background: url('../../public/img/icons/playlist.png') no-repeat -24px -20px;
            }
          }
        }
        .ctrl-clear {
          .icon {
            width: 13px;
            background: url('../../public/img/icons/playlist.png') no-repeat -51px 0;
          }
          &:hover {
            cursor: pointer;
            color: $textLight;
            .icon {
              background: url('../../public/img/icons/playlist.png') no-repeat -51px -20px;
            }
          }
        }
        .line {
          float: left;
          height: 15px;
          margin: 12px 5px 5px 5px;
          @include divideLine();
        }
      }
    }
    .header-right {
      position: relative;
      float: left;
      width: 402px;
      .curr-title {
        line-height: 41px;
        text-align: center;
      }
      .header-close {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        background: url('../../public/img/icons/playlist.png') no-repeat -195px 9px;
        &:hover {
          background: url('../../public/img/icons/playlist.png') no-repeat -195px -21px;
        }
      }
    }
  }
  .pc-wrapper {
    height: 260px;
    font-size: $fontMin;
    color: $textLinkDefault;
    background: url('../../public/img/icons/playlist_bg.png') repeat-y -1016px 0;
    .wr-left {
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 8px;
        background-color: rgba(0, 0, 0, .05);
      }
      &::-webkit-scrollbar-thumb{
        background-color: rgba(255, 255, 255, .3);
        border-radius: 20px;
      }
      float: left;
      width: 580px;
      height: 259px;
      background-color: rgba(0, 0, 0, .3);
      .song {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding-left: 30px;
        &-play {
          color: $textLight;
        }
        &:hover {
          cursor: pointer;
          color: $textLight;
          .song-ctrl {
            visibility: visible;
          }
        }
        .song-tag {
          position: absolute;
          width: 10px;
          height: 13px;
          top: 6px;
          left: 10px;
          background: url('../../public/img/icons/playlist.png') no-repeat -182px 0;
        }
        .song-name {
          float: left;
          width: 280px;
          @include ellipse();
        }
        .song-ctrl {
          visibility: hidden;
          float: left;
          width: 88px;
          height: 28px;
          .ctrl-icon {
            float: left;
            width: 16px;
            height: 16px;
          }
          .ctrl-collect {
            margin: 6px 6px 0 0;
            background: url('../../public/img/icons/playlist.png') no-repeat -24px 0;
            &:hover {
              background: url('../../public/img/icons/playlist.png') no-repeat -24px -20px;
            }
          }
          .ctrl-download {
            margin: 6px 6px 0 0;
            background: url('../../public/img/icons/playlist.png') no-repeat -57px -50px;
            &:hover {
              background: url('../../public/img/icons/playlist.png') no-repeat -80px -50px;
            }
          }
          .ctrl-share {
            margin: 6px 6px 0 0;
            background: url('../../public/img/icons/playlist.png') no-repeat 0 0;
            &:hover {
              background: url('../../public/img/icons/playlist.png') no-repeat 0 -20px;
            }
          }
          .ctrl-delete {
            margin: 6px 6px 0 0;
            background: url('../../public/img/icons/playlist.png') no-repeat -51px 0;
            &:hover {
              background: url('../../public/img/icons/playlist.png') no-repeat -51px -20px;
            }
          }
        }
        .song-singer {
          float: left;
          width: 80px;
          // overflow: hidden;
          @include ellipse();
        }
        .song-duration {
          float: left;
          width: 45px;
          margin-left: 10px;
          @include ellipse();
        }
        .song-from {
          float: left;
          width: 14px;
          height: 16px;
          margin: 6px 10px;
          background: url('../../public/img/icons/playlist.png') no-repeat -80px 0;
          &:hover {
            background: url('../../public/img/icons/playlist.png') no-repeat -80px -20px;
          }
        }
      }
    }
    .wr-right {
      overflow-y: scroll;
      position: relative;
      float: left;
      width: 402px;
      height: 259px;
      &::-webkit-scrollbar{
        width: 8px;
        background-color: rgba(0, 0, 0, .05);
      }
      &::-webkit-scrollbar-thumb{
        background-color: rgba(255, 255, 255, .3);
        border-radius: 20px;
      }
      .lyric {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        top: 100px;
        padding-bottom: 130px;
        transition: all .2s;
        .lyric-item {
          display: block;
          text-align: center;
          line-height: 30px;
          padding: 3px 10px;
          &-active {
            color: $textLight;
            font-size: $fontMinL;
          }
        }
      }
    }
  }
}
</style>
