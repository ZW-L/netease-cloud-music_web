<template>
  <div class="content">
    <div class="wrapper">
      <div class="img"></div>
      <a href="" class="img-link"></a>
      <div class="info">
        <span class="info-headset"></span>
        <span class="info-count">208万</span>
        <span class="info-play"></span>
      </div>
    </div>
    <div class="title">
      <p>秋日限定阳光：一起散步吧，在它溜走之前</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'play-list-card',

  components: {},

  props: {},

  data() {
    return {
    }
  },

}
</script>

<style lang="scss" scoped>

.content {
  .wrapper {
    position: relative;
    width: 140px;
    height: 140px;
    .img {
      height: 140px;
      background-color: #ccc;
    }
    .img-link {
      position: absolute;
      left: 0;
      top: 0;
      width: 140px;
      height: 140px;
      background: url('../../../public/img/icons/coverall.png') no-repeat 0 0;
    }
    .info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 27px;
      font-size: 12px;
      color: rgb(173, 174, 173);
      background: url('../../../public/img/icons/coverall.png') no-repeat 0 -537px;
      .info-headset {
        float: left;
        width: 14px;
        height: 11px;
        margin: 9px 5px 9px 10px;
        background: url('../../../public/img/icons/iconall.png') no-repeat 0 -24px;
      }
      .info-count {
        float: left;
        margin-top: 9px;
      }
      .info-play {
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 16px;
        height: 17px;
        background: url('../../../public/img/icons/iconall.png') no-repeat 0 0;
      }
    }
  }
  .title {
    margin: 8px 0 3px;
    font-size: 14px;
    line-height: 1.4;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>