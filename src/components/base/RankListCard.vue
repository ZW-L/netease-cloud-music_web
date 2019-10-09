<template>
  <div class="card" tag="li">
    <div class="img">
      <img :src="detail.coverImgUrl" :alt="detail.name">
    </div>
    <div class="desc">
      <p class="name">{{detail.name}}</p>
      <p class="info">{{detail.updateFrequency}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rank-list-card',

  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },

}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';
@import '~css/mixins.scss';

.card {
  display: flex;
  padding: 10px 0 10px 20px;
  @include hoverBg($bgFooter);
  .img {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
    }
  }
  .desc {
    flex: 1;
    margin-left: 8px;
    .name, .info  {
      height: 20px;
      line-height: 20px;
      font-size: $fontMin;
    }
    .info {
      color: $textLinkDefault;
    }
  }
}
</style>