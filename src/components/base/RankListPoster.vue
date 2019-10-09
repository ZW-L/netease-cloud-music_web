<template>
  <div class="poster">
    <div class="wrapper">
      <img src="http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150" alt="">
    </div>
    <div class="desc">
      <div class="title">云音乐飙升榜</div>
      <div class="info">
        <i class="info-icon"></i>
        <span class="info-update">最近更新：10月09日</span>
        <span class="info-frequency">（每天更新）</span>
      </div>
      <div class="btn">
        <div class="btn-play">
          <i class="btn-play-icon"></i>
          <em>播放</em>
        </div>
        <div class="btn-add"></div>
        <div class="btn-collect">
          <i class="btn-collect-icon iconfont icon-shoucangjia"></i>
          <em class="em-text">(2376163)</em>
        </div>
        <div class="btn-share">
          <i class="btn-comment-icon iconfont icon-fenxiang"></i>
          <em class="em-text">(6912)</em>
        </div>
        <div class="btn-download">
          <i class="btn-comment-icon iconfont icon-xiazai"></i>
          <em class="em-text">下载</em>
        </div>
        <div class="btn-comment">
          <i class="btn-comment-icon iconfont icon-pinglun"></i>
          <em class="em-text">(156005)</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rank-list-poster',
  props: {},
}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';
@import '~css/mixins.scss';

.poster {
  position: relative;
  padding: 40px;
  .wrapper {
    float: left;
    box-sizing: border-box;
    width: 158px;
    height: 158px;
    padding: 3px 0 0 3px;
    border: 1px solid $textInfoLight;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .desc {
    margin-left: 187px;
    width: 473px;
    height: 113px;
    margin-top: 15px;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: $fontMiddle;
    }
    .info {
      margin-top: 5px;
      height: 13px;
      line-height: 13px;
      font-size: $fontMin;
      .info-icon {
        float: left;
        width: 13px;
        height: 13px;
        background: url('../../../public/img/icons/icon.png') no-repeat -18px -682px;
      }
      .info-update {
        margin-left: 5px;
      }
      .info-frequency {
        margin-left: 5px;
        color: $textLinkDefault;
      }
    }
    .btn {
      margin-top: 30px;
      display: flex;
      font-size: $fontMin;
      .btn-play {
        width: 61px;
        height: 31px;
        padding: 6px 0 0 5px;
        background: url('../../../public/img/icons/button2.png') no-repeat 0 -387px;
        line-height: 18px;
        color: $textLight;
        .btn-play-icon {
          float: left;
          width: 20px;
          height: 18px;
          margin-right: 5px;
          background: url('../../../public/img/icons/button2.png') no-repeat 0 -1622px;
        }
      }
      .btn-add {
        width: 31px;
        height: 31px;
        background: url('../../../public/img/icons/button2.png') no-repeat 0 -1588px;
      }
      .btn-collect, .btn-share, .btn-download, .btn-comment {
        box-sizing: border-box;
        height: 31px;
        margin-left: 6px;
        line-height: 30px;
        background-color: $bgTableLight;
        border: 1px solid $bdcDefault;
        border-radius: 5px;
        @include hoverBg($bgTableDark);
        .iconfont {
          margin-left: 5px;
          font-weight: bold;
          font-size: $fontMinL;
        }
        .em-text {
          padding: 0 5px;
        }
      }
    }
  }
}
</style>