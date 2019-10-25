<template>
  <div class="container">
    <div class="right-bg">
      <a href="" class="right-bg-icon"></a>
    </div>
    <div class="right-scroll"></div>
    <div class="left-bg"></div>
    <div class="content">
      <div class="main-ctrl">
        <span class="ctrl-prev" ref="prev" @click="handleUpdate(10)"></span>
        <span :class="['ctrl-play', playClass]" ref="play"
          @click="handlePlay()"
        ></span>
        <span class="ctrl-next" ref="next" @click="handleBuffered()"></span>
      </div>
      <div class="song-info">
        <div class="info-pic">
          <img :src="nowPlay.picUrl">
          <a href="" class="info-href"></a>
        </div>
        <div class="info-gp">
          <div class="info-title">
            <a class="info-title-name">{{nowPlay.name}}</a>
            <a class="info-title-singer">{{singers}}</a>
            <a class="info-title-icon">&nbsp;</a>
          </div>
          <progress-bar
            :duration="duration"
            :currentTime="currentTime"
            @update="handleUpdate"
          ></progress-bar>
        </div>
      </div>
      <div class="more-ctrl">
        <a href="" class="ctrl-voice"></a>
        <a href="" class="ctrl-mode"></a>
        <a href="" class="ctrl-shown">
          <em>60</em>
        </a>
      </div>
      <div class="other-options">
        <a href="" class="op-collect"></a>
        <a href="" class="op-share"></a>
      </div>
    </div>
    <div class="audio-wrapper">
      <audio ref="audio" controls
        @canplay="handleCanplay()"
        @timeupdate="handleTimeupdate()"
      >
        <source src="" type="">
      </audio>
    </div>
  </div>
</template>

<script>
import ProgressBar from './base/ProgressBar';
import { mapGetters } from 'vuex';
import { getSingers } from '@/api/util.js';
import { getSongUrl } from '@/api/get.js';

export default {
  name: 'player-bar',

  components: {
    ProgressBar,
  },

  props: {},

  data() {
    return {
      isPaused: true,
      duration: 0,
      currentTime: 0,
    }
  },

  computed: {
    ...mapGetters(['nowPlay']),
    songId() {
      return this.nowPlay.id;
    },
    singers() {
      return getSingers(this.nowPlay.singer);
    },
    playClass() {
      return this.isPaused ? 'paused' : 'playing';
    },
  },

  mounted() {
    
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

  },
  watch: {
    songId(newId) {
      // console.log(newId);
      this._changeSong(newId);
    }
  },
}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

.container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 53px;
  // background-color: #ccc;
  .right-bg {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background: url('../../public/img/icons/playbar.png') no-repeat 0 -380px;
    .right-bg-icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      background: url('../../public/img/icons/playbar.png') no-repeat -100px -380px;
      &:hover {
      background: url('../../public/img/icons/playbar.png') no-repeat -100px -400px;
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
      img {
        width: 34px;
        height: 34px;
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
    float: right;
    .ctrl-voice, .ctrl-mode {
      float: left;
      width: 25px;
      height: 25px;
      margin: 11px 2px 0 0;
    }
    .ctrl-voice {
      background: url('../../public/img/icons/playbar.png') no-repeat -2px -248px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -30px -248px;
      }
    }
    .ctrl-mode {
      background: url('../../public/img/icons/playbar.png') no-repeat -66px -248px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -93px -248px;
      }
    }
    .ctrl-shown {
      float: left;
      width: 59px;
      height: 25px;
      margin: 11px 2px 0 0;
      line-height: 25px;
      text-indent: 32px;
      font-size: $fontMin;
      color: $homeLogin;
      background: url('../../public/img/icons/playbar.png') no-repeat -42px -68px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -42px -98px;
      }
    }
  }
}
.audio-wrapper {
  // visibility: hidden;
  position: absolute;
  top: -100px;
}
</style>