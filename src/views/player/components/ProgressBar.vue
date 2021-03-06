<template>
  <div class="bar">
    <div class="bar-bg" ref="bar"
      @click="handleClickChange"
      @mousemove="handlePullChange"
      @mouseup="btnMouseUp()"
      @mouseleave="btnMouseUp()"
    >
      <div class="bar-bg__ready" ref="ready"></div>
      <div class="bar-bg__current" ref="current">
        <span class="bar-bg__current__ctrl" ref="btn"
          @mousedown="btnMouseDown()"
          @mouseup="btnMouseUp()"
        ></span>
      </div>
    </div>
    <div class="bar-time">
      <span class="bar-time-current">{{currentTimeFormat}}</span>
      <em class="bar-time-devide">/</em>
      <span class="bar-time-all">{{durationFormat}}</span>
    </div>
  </div>
</template>

<script>
import { getDuration } from '@/utils/util'
import { boxOffsetLeft } from '@/utils/dom'

export default {
  name: 'progress-bar',

  props: {
    duration: {
      type: Number,
      default: 0,
    },
    currentTime: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      btnDrag: false, // 标记是否正在拉拽进度条
    }
  },

  computed: {
    barWidth() {
      return this.$refs.bar.clientWidth
    },
    barOffsetLeft() {
      return boxOffsetLeft(this.$refs.bar)
    },
    isBarAuto() {
      return !this.btnDrag
    },
    currentTimeFormat() {
      return getDuration(this.currentTime * 1000)
    },
    durationFormat() {
      return getDuration(this.duration * 1000)
    },
  },

  mounted() {
    // console.log(this.duration);
  },

  methods: {
    btnMouseDown() {
      this.btnDrag = true
      // console.log('move start...');
    },
    btnMouseUp() {
      this.btnDrag = false
      // console.log('move done!');
    },
    // 单击进度条时
    handleClickChange(event) {
      let barCurrentWidth = event.clientX - this.barOffsetLeft
      barCurrentWidth = barCurrentWidth > this.barWidth ? this.barWidth : barCurrentWidth
      const time = barCurrentWidth / this.barWidth * this.duration
      // console.log(time);
      // 向父组件传参，更新 currentTime，这个 currentTime 会再次响应至该组件，触发 watch 更新进度条
      this.$emit('update', time)
    },
    // 拉拽进度条时
    handlePullChange(event) {
      if (!this.btnDrag) {
        return
      }
      // 获取拉拽过程中的变化，溢出处理
      let barCurrentWidth = event.clientX - this.barOffsetLeft
      barCurrentWidth = barCurrentWidth > this.barWidth ? this.barWidth : barCurrentWidth
      // console.log(barCurrentWidth);
      // 更新进度条样式，这里不用设置 currentTime：因为该事件结束时会触发 handleClickChange 事件，更新 currentTime
      this.$refs.current.style.width = `${barCurrentWidth}px`
    },
  },

  watch: {
    currentTime() {
      // 自动播放时才会动, 拉拽时不会动
      if (this.isBarAuto) {
        const barCurrentWidth = this.currentTime / this.duration * this.barWidth
        // console.log(this.currentTime, barCurrentWidth);
        this.$refs.current.style.width = `${barCurrentWidth}px`
      }
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.bar {
  position: relative;
  width: 608px;
  height: 12px;
  .bar-bg {
    position: relative;
    float: left;
    width: 493px;
    height: 9px;
    &__ready {
      position: absolute;
      width: 0;
      height: 9px;
    }
    &__current {
      position: absolute;
      width: 0;
      height: 9px;
      &__ctrl {
        position: absolute;
        top: -7px;
        right: -11px;
        width: 22px;
        height: 24px;
        // margin-left: -11px;
      }
    }
  }
  .bar-time {
    // float: right;
    // margin-left: 15px;
    position: absolute;
    right: 25px;
    line-height: 10px;
    color: $inputInfo;
    font-size: $fontMin;
    .bar-time-current {
      color: $homeDefault;
    }
    .bar-time-devide {
      margin: 0 5px;
    }
  }
}
</style>
