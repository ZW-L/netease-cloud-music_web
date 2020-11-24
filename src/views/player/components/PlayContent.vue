<template>
  <div class="pc">
    <div class="pc-header">
      <div class="header-left">
        <h3 class="header-title">播放列表(92)</h3>
        <div class="header-ctrl">
          <span class="header-ctrl__collect">
            <i class="icon header-ctrl__collect__icon"></i>收藏全部
          </span>
          <span class="line"></span>
          <span class="header-ctrl__clear" @click="handleClearPlaylist()">
            <i class="icon header-ctrl__clear__icon"></i>清除
          </span>
        </div>
      </div>
      <div class="header-right">
        <div class="title">{{nowPlay.name}}</div>
        <span class="header-right__close" @click="closeContent"></span>
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
            <i class="ctrl-icon song-ctrl__icon-collect" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon song-ctrl__icon-share" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon song-ctrl__icon-download" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon song-ctrl__icon-delete" @click.stop="handleDelete(item)"></i>
          </span>
          <span class="song-singer">{{getSingers(item)}}</span>
          <span class="song-duration">{{getDuration(item)}}</span>
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
import { mapGetters } from 'vuex'
import { getSingers, getDuration } from '@/utils/util'

export default {
  name: 'play-content',

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
      return this.nowPlay.id
    },
    lyrics() {
      // console.log(this.lyric);
      /* eslint-disable-next-line */
      return this.lyric.split('\n').map(v => v.replace(/[\[\]\d\:\.]+/, ''))
    },
  },

  mounted() {
    if (this.songId) {
      this.initialData()
    }
  },

  methods: {
    initialData() {
      this.$api.getLyric(this.songId).then(res => {
        this.lyric = res.data.lrc ? res.data.lrc.lyric : ''
      })
    },
    getPlaylistIndex(item) {
      return this.playlist.findIndex(v => v.id === item.id)
    },
    getSingers(item) {
      const index = this.getPlaylistIndex(item)
      return getSingers(this.playlist[index].ar)
    },
    getDuration(item) {
      const index = this.getPlaylistIndex(item)
      return getDuration(this.playlist[index].dt)
    },
    closeContent() {
      this.$emit('close')
    },
    handleToPlay(item) {
      this.$store.dispatch('toPlay', item)
    },
    handleClearPlaylist() {
      this.$store.dispatch('clearPlaylist')
    },
    handleDelete(item) {
      this.$store.dispatch('removeFromPlaylist', item)
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
  },

  watch: {
    songId(newId) {
      this.initialData(newId)
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.pc {
  background-color: #000;
  color: $textLight;
  border-radius: 10px;
  .pc-header {
    height: 41px;
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
        &__collect, &__clear {
          float: left;
          margin: 0 10px;
          .icon {
            float: left;
            width: 16px;
            height: 15px;
            margin-top: 12px;
            margin-right: 5px;
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
      .title {
        line-height: 41px;
        text-align: center;
      }
      &__close {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
      }
    }
  }
  .pc-wrapper {
    height: 260px;
    font-size: $fontMin;
    color: $textLinkDefault;
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
        }
        .song-singer {
          float: left;
          width: 80px;
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
