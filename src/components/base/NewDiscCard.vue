<template>
  <div :class="['card', `card-${size}`]">
    <div :class="['wrapper', `wrapper-${size}`]">
      <img :class="['card-img', `card-img-${size}`]"
        :src="album.picUrl" 
        alt="">
      <a :class="['card-link', `card-link-${size}`]" href="#"></a>
    </div>
    <p class="card-name">{{album.name}}</p>
    <p class="card-title">{{album.artist.name}}</p>
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
    size: {
      type: String,
      default: 'md',
    },
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';

/* 
xm: 
md: 100x100
lg: 130x130
*/
.card {
  display: inline-block;
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 118px;
    height: 150px;
  }
  &-#{lg} {
    width: 153px;
    height: 178px;
  }
}

.wrapper {
  position: relative;
  margin-bottom: 7px;
  &-#{sm} {
    background-color: #ccc;
  }
  &-#{md} {
    height: 100px;
  }
  &-#{lg} {
    height: 130px;
  }
}

.card-img {
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 100px;
  }
  &-#{lg} {
    width: 130px;
  }
  box-shadow: $discBoxShadow;
}

.card-link {
  position: absolute;
  top: 0;
  left: 0;
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 118px;
    height: 100px;
    background: url('../../../public/img/icons/coverall.png') no-repeat 0 -570px;
  }
  &-#{lg} {
    width: 153px;
    height: 130px;
    background: url('../../../public/img/icons/coverall.png') no-repeat 0 -845px;
  }
}

.card-name, .card-title {
  height: 18px;
  line-height: 18px;
  font-size: $fontMin;
}

</style>
