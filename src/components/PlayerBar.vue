<template>
  <div :class="['container', isBarLock ? 'container-lock' : 'container-open']" ref="container">
    <div class="right-bg">
      <span :class="['icon', isBarLock ? 'icon-lock' : 'icon-open']" @click="handleLock()"></span>
    </div>
    <div class="right-scroll"></div>
    <div class="left-bg"></div>
    <div class="content">
      <div class="main-ctrl">
        <span class="ctrl-prev" ref="prev" @click="handlePlayPrev()"></span>
        <span :class="['ctrl-play', playClass]" ref="play"
          @click="handlePlay()"
        ></span>
        <span class="ctrl-next" ref="next" @click="handlePlayNext()"></span>
      </div>
      <div class="song-info">
        <div class="info-pic">
          <img v-show="nowPlay.picUrl" class="pic" :src="nowPlay.picUrl">
          <a href="#" class="info-href" @click="toSongView()"></a>
        </div>
        <div class="info-gp">
          <div class="info-title">
            <a class="info-title-name" @click="toSongView()">{{nowPlay.name}}</a>
            <a class="info-title-singer">{{singers}}</a>
            <a v-show="nowPlay.name" class="info-title-icon">&nbsp;</a>
          </div>
          <progress-bar
            :duration="duration"
            :currentTime="currentTime"
            @update="handleUpdate"
          ></progress-bar>
        </div>
      </div>
      <div class="more-ctrl">
        <div :class="['voice-column', { 'voice-column-shown': isShowVoice }]">
          <div class="column-line"></div>
          <div class="column-btn"></div>
        </div>
        <a href="#" class="ctrl-voice" @click.prevent="handleChangeVoice()"></a>
        <a href="#" :class="['ctrl-mode', nowMode]" @click.prevent="handleChangePlaymode()"></a>
        <a class="ctrl-shown" @click="handleShowPlayContent()">
          <em>{{playlist.length}}</em>
        </a>
      </div>
      <div class="other-options">
        <a href="#" class="op-collect" @click="handleShowAbout()"></a>
        <a href="#" class="op-share" @click="handleShowAbout()"></a>
      </div>
    </div>
    <div class="audio-wrapper">
      <audio ref="audio" controls
        @canplay="handleCanplay()"
        @timeupdate="handleTimeupdate()"
        @ended="handleEnded()"
      >
        <source src="" type="">
      </audio>
    </div>
    <!-- <div  class="play-wrapper"> -->
    <transition name="slide">
      <play-content 
        v-show="isShowPlayContent" 
        class="play-wrapper"
        @close="handleShowPlayContent"
        :currentTime="currentTime"
      ></play-content>
    </transition>
    <!-- </div> -->
  </div>
</template>

<script>
import ProgressBar from './base/ProgressBar.vue';
import PlayContent from './PlayContent.vue';
import { mapGetters } from 'vuex';
import { getSingers } from '@/api/util.js';
import { getSongUrl } from '@/api/get.js';

export default {
  name: 'player-bar',

  components: {
    ProgressBar,
    PlayContent,
  },

  data() {
    return {
      isPaused: true, // 当前播放状态
      duration: 0, // 当前歌曲的总时长
      currentTime: 0, // 当前歌曲的播放时间
      isShowPlayContent: false, // 是否显示播放窗口
      isBarLock: false, // 是否锁定播放条
      isShowVoice: false, // 是否显示音量控制
      defaultPlayMode: 0, // 默认循环播放
    }
  },

  computed: {
    ...mapGetters(['nowPlay', 'playlist']),
    songId() {
      return this.nowPlay.id;
    },
    songIndex() {
      return this.playlist.findIndex(v => v.id === this.songId);
    },
    singers() {
      return getSingers(this.nowPlay.singer);
    },
    playClass() {
      return this.isPaused ? 'paused' : 'playing';
    },
    nowMode() {
      switch(this.defaultPlayMode) {
        case 0:
          return 'list-cycle';
          break;
        case 1:
          return 'random-play';
          break;
        case 2:
          return 'single-cycle';
          break;
      }
    },
  },

  methods: {
    // 能够开始播放时
    handleCanplay() {
      this.duration = this.$refs.audio.duration;
      // console.log(this.duration);
    },
    // 播放时间改变时
    handleTimeupdate() {
      this.currentTime = this.$refs.audio.currentTime;
    },
    // 子组件改变播放时间
    handleUpdate(t) {
      console.log(t);
      this.$refs.audio.currentTime = t;
    },
    // 获取缓存事件（暂未使用）
    handleBuffered() {
      /* const buf = this.$refs.audio.buffered;
      const length = buf.length;
      const start = buf.start(0);
      const end = buf.end(length - 1);
      console.log(length, start, end); */
      console.log(this.nowPlay);
    },
    handleEnded() {
      if (this.playlist.length === 1) {
        // 只有一首歌时，重新播放
        this.handlePlay();
      }
      if (this.defaultPlayMode === 0) {
        // 列表循环时，提交 nowPlay
        const next = this.songIndex === this.playlist.length - 1 ?  0 : this.songIndex + 1;
        this.$store.dispatch('toPlay', this.playlist[next]);
      } else if (this.defaultPlayMode === 1) {
        // 随机播放时
        this.$store.dispatch('toPlay', this.playlist[this._randomIndex()]);
      } else {
        // 单曲循环时，重新播放即可
        this.handlePlay();
      }
    },
    // 开始/暂停按钮
    handlePlay() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.isPaused = false;
      } else {
        this.$refs.audio.pause();
        this.isPaused = true;
      }
    },
    handlePlayPrev() {
      if (this.defaultPlayMode === 1) {
        // 随机播放的上一曲
        this.$store.dispatch('toPlay', this.playlist[this._randomIndex()]);
      } else {
        // 列表循环和单曲循环的上一曲
        const prevIndex = this.songIndex === 0 ? this.playlist.length - 1 : this.songIndex - 1;
        this.$store.dispatch('toPlay', this.playlist[prevIndex]);
      }
    },
    handlePlayNext() {
      if (this.defaultPlayMode === 1) {
        // 随机播放的下一曲
        this.$store.dispatch('toPlay', this.playlist[this._randomIndex()]);
      } else {
        // 列表循环和单曲循环的下一曲
        const next = this.songIndex === this.playlist.length - 1 ?  0 : this.songIndex + 1;
        this.$store.dispatch('toPlay', this.playlist[next]);
      }
    },
    // 切换当前歌曲
    _changeSong(id) {
      getSongUrl(id).then(res => {
        // console.log(res.data);
        this._handleChangeSrc(res.data.data[0].url, true);
      }).catch(err => {
        console.log(err);
      });
    },
    // 切换 src 时需要进行的处理
    _handleChangeSrc(src, toPlay) {
      const audio = this.$refs.audio;
      audio.pause();
      audio.src = src;
      this.isPaused = true;
      if (toPlay) {
        audio.play();
        this.isPaused = false;
      }
    },
    _randomIndex() {
      return Math.floor(Math.random() * this.playlist.length);
    },
    handleShowPlayContent() {
      this.isShowPlayContent = !this.isShowPlayContent;
    },
    handleChangePlaymode() {
      this.defaultPlayMode = this.defaultPlayMode === 2 ? 0 : this.defaultPlayMode + 1;
    },
    handleChangeVoice() {
      this.isShowVoice = !this.isShowVoice;
    },
    toSongView() {
      this.$router.push({ path: '/song', query: { id: this.nowPlay.id }});
    },
    handleLock() {
      const container = this.$refs.container;
      this.isBarLock = !this.isBarLock;
      container.style.bottom = this.isBarLock ? '0' : '-43px';
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE');
    },
  },
  watch: {
    songId(newId) {
      // 当歌曲 id 改变时，切换当前播放的歌曲
      this._changeSong(newId);
    }
  },
}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

.container {
  z-index: 99;
  position: fixed;
  bottom: -43px;
  width: 100%;
  height: 53px;
  transition: all .5s;
  &:hover {
    bottom: 0 !important;
  }
  .right-bg {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background: url('../../public/img/icons/playbar.png') no-repeat 0 -380px;
    .icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      &-lock {
        background: url('../../public/img/icons/playbar.png') no-repeat -100px -380px;
        &:hover {
          cursor: pointer;
          background: url('../../public/img/icons/playbar.png') no-repeat -100px -400px;
        }
      }
      &-open {
        background: url('../../public/img/icons/playbar.png') no-repeat -80px -380px;
        &:hover {
          cursor: pointer;
          background: url('../../public/img/icons/playbar.png') no-repeat -80px -400px;
        }
      }
    }
  }
  .right-scroll {
    position: absolute;
    top: -1px;
    right: 0px;
    width: 15px;
    height: 54px;
    background: url('../../public/img/icons/playbar.png') no-repeat -52px -393px;
  }
  .left-bg {
    height: 53px;
    margin-right: 67px;
    background: url('../../public/img/icons/playbar.png') repeat-x 0 0;
  }
}
.content {
  z-index: 99;
  position: absolute;
  top: 6px;
  left: 50%;
  margin-left: -490px;
  width: 980px;
  height: 47px;
  // background-color: #ccc;
  .main-ctrl {
    float: left;
    padding-top: 6px;
    width: 137px;
    height: 42px;
    .ctrl-prev {
      float: left;
      width: 28px;
      height: 28px;
      margin-top: 5px;
      margin-right: 8px;
      background: url('../../public/img/icons/playbar.png') no-repeat 0 -130px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -30px -130px;
      }
    }
    .ctrl-play {
      float: left;
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    .paused {
      background: url('../../public/img/icons/playbar.png') no-repeat 0 -204px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -40px -204px;
      }
    }
    .playing {
      background: url('../../public/img/icons/playbar.png') no-repeat 0 -165px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -40px -165px;
      }
    }
    .ctrl-next {
      float: left;
      width: 28px;
      height: 28px;
      margin-top: 5px;
      margin-right: 8px;
      background: url('../../public/img/icons/playbar.png') no-repeat -80px -130px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -110px -130px;
      }
    }
  }
  .song-info {
    .info-pic {
      position: relative;
      float: left;
      margin: 6px 15px 0 0;
      width: 34px;
      height: 34px;
      .pic {
        width: 100%;
      }
      .info-href {
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 35px;
        background: url('../../public/img/icons/playbar.png') no-repeat 0 -80px;
      }
    }
    .info-gp {
      float: left;
      .info-title {
        width: 100%;
        height: 28px;
        line-height: 28px;
        a {
          float: left;
          margin-right: 10px;
          font-size: $fontMin;
          &:not(:last-child):hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .info-title-name {
          color: $textLight;
        }
        .info-title-singer {
          color: $inputInfo;
        }
        .info-title-icon {
          width: 14px;
          height: 15px;
          margin: 7px 0 0 3px;
          background: url('../../public/img/icons/playbar.png') no-repeat -110px -103px;
          &:hover {
            background: url('../../public/img/icons/playbar.png') no-repeat -130px -103px;
          }
        }
      }
    }
  }
  .other-options {
    float: right;
    .op-collect, .op-share {
      float: left;
      width: 25px;
      height: 25px;
      margin: 11px 2px 0 0;
    }
    .op-collect {
      background: url('../../public/img/icons/playbar.png') no-repeat -88px -163px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -88px -189px;
      }
    }
    .op-share {
      background: url('../../public/img/icons/playbar.png') no-repeat -114px -163px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -114px -189px;
      }
    }
  }
  .more-ctrl {
    position: relative;
    float: right;
    .voice-column {
      display: none;
      position: absolute;
      width: 32px;
      height: 113px;
      top: -112px;
      left: -3px;
      background: url('../../public/img/icons/playbar.png') 0 -503px;
      &-shown {
        display: block;
      }
      .column-line {
        position: absolute;
        width: 4px;
        height: 0px; // max: 100px
        left: 14px;
        bottom: 9px;
        background: url('../../public/img/icons/playbar.png') -40px bottom;
      }
      .column-btn {
        position: absolute;
        width: 18px;
        height: 19px;
        left: 7px;
        bottom: 0;
        background: url('../../public/img/icons/iconall.png') -40px -250px;
        &:hover {
          background: url('../../public/img/icons/iconall.png') -40px -280px;          
        }
      }
    }
    .ctrl-voice, .ctrl-mode {
      float: left;
      width: 25px;
      height: 25px;
      margin: 11px 2px 0 0;
    }
    .ctrl-voice {
      background: url('../../public/img/icons/playbar.png') no-repeat -2px -248px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -31px -248px;
      }
    }
    .single-cycle {
      background: url('../../public/img/icons/playbar.png') no-repeat -66px -344px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -93px -344px;
      }
    }
    .random-play {
      background: url('../../public/img/icons/playbar.png') no-repeat -66px -248px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -93px -248px;
      }
    }
    .list-cycle {
      background: url('../../public/img/icons/playbar.png') no-repeat -3px -344px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -33px -344px;
      }
    }
    .ctrl-shown {
      float: left;
      width: 59px;
      height: 25px;
      margin: 11px 2px 0 0;
      line-height: 26px;
      text-indent: 29px;
      font-size: $fontMin;
      color: $homeLogin;
      background: url('../../public/img/icons/playbar.png') no-repeat -42px -68px;
      &:hover {
        cursor: pointer;
        color: $textLight;
        background: url('../../public/img/icons/playbar.png') no-repeat -42px -98px;
      }
    }
  }
}
.audio-wrapper {
  visibility: hidden;
  position: absolute;
  top: -60px;
}

.container {
  .play-wrapper {
    z-index: 10;
    position: absolute;
    top: -295px;
    // top: -200px;
    width: 982px;
    height: 300px;
    margin-left: 50%;
    left: -491px;
  }
}

.slide-enter, .slide-leave-to {
  transform: translateY(300px);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: all .2s ease-out;
}
</style>
