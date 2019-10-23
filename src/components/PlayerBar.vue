<template>
  <div class="container">
    <div class="right-bg">
      <a href="" class="right-bg-icon"></a>
    </div>
    <div class="right-scroll"></div>
    <div class="left-bg"></div>
    <div class="content">
      <div class="main-ctrl">
        <a href="" class="ctrl-prev"></a>
        <a href="" class="ctrl-play"></a>
        <a href="" class="ctrl-next"></a>
      </div>
      <div class="song-info">
        <div class="info-pic">
          <img src="http://p2.music.126.net/xLSpSuXb1wJPC2CC0V_O_g==/38482906984297.jpg?param=34y34" alt="">
          <a href="" class="info-href"></a>
        </div>
        <div class="info-gp">
          <div class="info-title">
            <a class="info-title-name">蜉蝣</a>
            <a class="info-title-singer">陈绮贞</a>
            <a class="info-title-icon">&nbsp;</a>
          </div>
          <song-duration></song-duration>
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
  </div>
</template>

<script>
import SongDuration from './base/SongDuration';

export default {
  name: 'player-bar',

  components: {
    SongDuration,
  },

  props: {},

  data() {
    return {
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
      background: url('../../public/img/icons/playbar.png') no-repeat 0 -204px;
      &:hover {
        background: url('../../public/img/icons/playbar.png') no-repeat -40px -204px;
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
</style>