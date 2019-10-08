<template>
  <div class="wrapper" ref="wrapper"
    @mouseenter="stop()"
    @mouseleave="start()"
  >
    <div class="content">
      <div class="img-wrapper">
        <div class="img-item" v-for="(item, i) of banner" :key="i">
          <img :class="[ i === active ? 'active' : 'none' ]" :src="item.imageUrl" alt="">
        </div>
        <div class="content-prev" @click="handleControl('prev')">&nbsp;</div>
        <div class="content-next" @click="handleControl('next')">&nbsp;</div>
        <div class="content-paganation">
          <span
            v-for="i of banner.length" :key="i"
            :class="[ 'pag-dot', i - 1 === active ? 'pag-dot-active' : 'none' ]" 
            @click="handleControl(i-1)"
          ></span>
        </div>
      </div>
      <div class="content-download">
        
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from '@/api/get.js';

export default {
  name: 'home-carousel',

  data() {
    return {
      banner: [],
      active: 0,
      timer: '',
    }
  },

  mounted() {
    getBanner().then(res => {
      this.banner = this.banner.concat(res.data.banners);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.start();
    });
  },

  beforeDestroy() {
    this.stop();
  },

  methods: {
    handleControl(tag) {
      if (typeof tag === 'number') {
        console.log(`jump to ${tag}.`);
        this.active = tag;
      }else if (tag === 'prev') {
        console.log('prev');
        this.active = this.active === 0 ? this.banner.length - 1 : this.active - 1;
      } else if (tag === 'next'){
        console.log('next');
        this.active = this.active === this.banner.length - 1 ? 0 : this.active + 1;
      }
    },
    start() {
      this.timer = setInterval(() => {
        this.handleControl('next');
      }, 4000);
      console.log(`start: ${this.timer}`);
    },
    stop() {
      clearInterval(this.timer);
      console.log(`clear interval: ${this.timer}`);
    }
  },

};
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.wrapper {
  width: 100%;
  height: 100%;
  // 需要自适应
  background-color: rgb(40, 38, 39);
  .content {
    position: relative;
    width: 982px;
    height: 100%;
    margin-left: 50%;
    left: -491px;
    text-align: center;
    color: $textLight;
    .img-wrapper {
      position: relative;
      float: left;
      width: 732px;
      height: 336px;
      .img-item {
        position: absolute;
        width: 732px;
        height: 336px;
        img {
          opacity: 0;
          width: 100%;
          height: 336px;
          transition: all 1s;
        }
        .active {
          opacity: 1;
        }
      }
      .content-prev, .content-next {
        position: absolute;
        width: 37px;
        height: 63px;
        line-height: 63px;
        text-align: center;
        color: $textLight;
        @include hoverBg(rgba(0, 0, 0, .1));
      }
      .content-prev {
        left: -40px;
        top: 130px;
        background: url('../../../../public/img/icons/banner.png') no-repeat 0 -360px;
      }
      .content-next {
        left: 985px;
        top: 130px;
        background: url('../../../../public/img/icons/banner.png') no-repeat 0 -508px;
      }
      .content-paganation {
        position: absolute;
        left: 300px;
        bottom: 10px;
        .pag-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 5px 8px;
          border-radius: 50%;
          background-color: $bgPagination;
          @include hoverBg($bgPaginationActive);
        }
        .pag-dot-active {
          background-color: $bgPaginationActive;
        }
      }
    }
    .content-download {
      margin-left: 732px;
      width: 250px;
      height: 336px;
      background: url('../../../../public/img/icons/download.png') no-repeat 0 0;
    }
  }
}
</style>