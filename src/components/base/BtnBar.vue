<template>
  <div class="bar">
    <div class="btn-play" @click="handleToPlay()">
      <i class="btn-play-icon"></i>
      <em>播放</em>
    </div>
    <div class="btn-add" @click="handleShowAbout()"></div>
    <div class="btn-collect" @click="handleShowAbout()">
      <i class="btn-collect-icon iconfont icon-shoucangjia"></i>
      <em class="em-text">
        <slot name="collect">收藏</slot>
      </em>
    </div>
    <div class="btn-share" @click="handleShowAbout()">
      <i class="btn-comment-icon iconfont icon-fenxiang"></i>
      <em class="em-text">
        <slot name="share">分享</slot>
      </em>
    </div>
    <div class="btn-download" @click="handleShowAbout()">
      <i class="btn-comment-icon iconfont icon-xiazai"></i>
      <em class="em-text">
        <slot name="download">下载</slot>
      </em>
    </div>
    <div class="btn-comment">
      <i class="btn-comment-icon iconfont icon-pinglun"></i>
      <em class="em-text">
        <slot name="comment">评论</slot>
      </em>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'btn-bar',

  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    // 播放
    handleToPlay() {
      if (this.$route.name === 'song') {
        this.$store.dispatch('toPlay', this.detail)
        // toPlay(this.$store, this.detail);
      } else {
        // 触发事件，通知父组件更新播放列表
        this.$emit('playAll')
      }
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

.bar {
  display: flex;
  font-size: $fontMin;
  .btn-play {
    overflow: hidden;
    width: 61px;
    height: 31px;
    padding: 6px 0 0 5px;
    background: url('../../../public/img/icons/button2.png') no-repeat 0 -387px;
    line-height: 18px;
    color: $textLight;
    &:hover {
      cursor: pointer;
    }
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
</style>
