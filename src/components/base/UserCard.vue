<template>
  <div class="card">
    <div class="img-wrapper">
      <img :src="user.avatar" alt="">
    </div>
    <div class="info">
      <p class="info-name">
        {{user.name}}
        <sup class="info-icon"></sup>
      </p>
      <p class="info-desc">{{user.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'use-card',

  components: {},

  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
    };
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixins.scss';
@import '@/assets/css/variables.scss';

.card {
  width: 210px;
  height: 50px;
  font-size: $fontMin;
  &:first-child {
    margin-top: 20px;
  }
  .img-wrapper {
    float: left;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
    }
  }
  .info {
    margin-left: 10px;
    float: left;
    width: 160px;
    line-height: 21px;
    .info-name {
      height: 21px;
      .info-icon {
        display: inline-block;
        width: 11px;
        height: 13px;
        vertical-align: middle;
        background: url('../../../public/img/icons/icon.png') no-repeat 0 1px;
      }
    }
    .info-desc {
      height: 21px;
      color: $textDesc;
      @include ellipse();
    }
  }
}
</style>