<template>
  <div class="carousel"
    @mouseenter="stop()"
    @mouseleave="start()"
  >
    <div class="content">
      <div class="img-wrapper">
        <transition-group name="fade">
          <div v-for="(item, i) of banner" :key="item.url"
            v-show="i === active"
            class="img-item"
            @click="toView(item)"
          >
            <img :src="item.imageUrl" key="img">
          </div>
        </transition-group>
        <div class="content__prev" @click="handleControl('prev')">&nbsp;</div>
        <div class="content__next" @click="handleControl('next')">&nbsp;</div>
        <div class="content-paganation">
          <span
            v-for="i of banner.length" :key="i"
            :class="[ 'pag-dot', i - 1 === active ? 'pag-dot-active' : 'none' ]"
            @click="handleControl(i-1)"
          ></span>
        </div>
      </div>
      <div class="content__download" @click="handleDownload()">
        <p class="download-desc">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from '@/api/get'

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
    this.initialData()
  },

  beforeDestroy() {
    this.stop()
  },

  methods: {
    initialData() {
      getBanner().then(res => {
        this.banner = this.banner.concat(res.data.banners)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.start()
      })
    },
    handleControl(tag) {
      if (typeof tag === 'number') {
        console.log(`jump to ${tag}.`)
        this.active = tag
      } else if (tag === 'prev') {
        console.log('prev')
        this.active = this.active === 0 ? this.banner.length - 1 : this.active - 1
      } else if (tag === 'next') {
        console.log('next')
        this.active = this.active === this.banner.length - 1 ? 0 : this.active + 1
      }
    },
    handleDownload() {
      window.open('https://music.163.com/#/download')
    },
    toView(item) {
      const { targetType, targetId, url } = item
      if (targetType === 3000) {
        window.open(url)
      } else if (targetType === 1) {
        this.$router.push({ path: '/song', query: { id: targetId } })
      } else if (targetType === 10) {
        this.$router.push({ path: '/album', query: { id: targetId } })
      }
    },
    start() {
      this.timer = setInterval(() => {
        this.handleControl('next')
      }, 4000)
      console.log(`start: ${this.timer}`)
    },
    stop() {
      clearInterval(this.timer)
      console.log(`clear interval: ${this.timer}`)
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
@import '@/styles/animation.scss';

@include fade(.8s);

.carousel {
  width: 100%;
  background-color: $bdcCarousel;
  .content {
    position: relative;
    width: 982px;
    margin: 0 auto;
    color: $textLight;
    .img-wrapper {
      position: relative;
      float: left;
      width: 730px;
      height: 285px;
      .img-item {
        position: absolute;
        img {
          width: 100%;
          height: 285px;
        }
      }
      .content__prev, .content__next {
        position: absolute;
        width: 37px;
        height: 63px;
        line-height: 63px;
        text-align: center;
        color: $textLight;
        @include hoverBg(rgba(0, 0, 0, .1));
      }
      .content__prev {
        left: -60px;
        top: 100px;
      }
      .content__next {
        left: 1005px;
        top: 100px;
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
    .content__download {
      position: relative;
      margin-left: 730px;
      width: 252px;
      height: 285px;
      &:hover {
        cursor: pointer;
      }
      .download-desc {
        position: absolute;
        bottom: 8px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: $fontMin;
        color: $inputInfo;
      }
    }
  }
}
</style>
