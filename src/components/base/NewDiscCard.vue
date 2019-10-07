<template>
  <div class="card">
    <div class="wrapper">
      <img class="img"
        :src="album.picUrl" 
        alt="">
      <a class="link" href=""></a>
    </div>
    <p class="name">{{album.name}}</p>
    <p class="title">{{album.artist.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'new-disc-card',

  props: {
    album: {
      type: Object,
      default: () => {},
    },
  },

}
</script>

<style lang="scss" scoped>

.card {
  display: inline-block;
  width: 118px;
  height: 150px;
  .wrapper {
    position: relative;
    height: 100px;
    margin-bottom: 7px;
    .img {
      width: 100px;
      box-shadow: 0px 5px 3px rgb(202, 202, 202);
    }
    .link {
      position: absolute;
      top: 0;
      left: 0;
      width: 118px;
      height: 100px;
      background: url('../../../public/img/icons/coverall.png') no-repeat 0 -570px;
    }
  }
  .name, .title {
    height: 18px;
    line-height: 18px;
    font-size: 12px;
  }
}
</style>