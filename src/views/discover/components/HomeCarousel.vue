<template>
  <div class="wrapper">
    <div class="content">
      <div class="content-img">
        <div class="img-wrapper">
          page-{{index}}
        </div>
      </div>
      <div class="content-download"></div>
      <!-- controler -->
      <div class="content-prev">&lt;</div>
      <div class="content-next">&gt;</div>
      <div class="content-paganation"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-carousel',

  components: {},

  props: {},

  data() {
    return {
      index: 1,
    }
  },

};
</script>

<style lang="scss" scoped>

.wrapper {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  .content {
    position: relative;
    width: 982px;
    height: 100%;
    margin-left: 50%;
    left: -491px;
    background-color: rgb(212, 49, 54);
    text-align: center;
    // test
    // line-height: 300px;
    // font-size: 50px;
    color: #fff;
    &-prev, &-next {
      position: absolute;
      width: 37px;
      height: 63px;
      line-height: 63px;
      text-align: center;
      font-size: 50px;
      color: #fff;
      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, .1);
      }
    }
    &-prev {
      left: -40px;
      top: 140px;
    }
    &-next {
      left: 985px;
      top: 140px;
    }
  }
}
</style>