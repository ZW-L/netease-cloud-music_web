<template>
  <div class="bar">
    <div class="bar-bg" ref="bar" 
      @click="handleClickChange()"
      @mousemove="handlePullChange()"
      @mouseup="btnMouseUp()"
    >
      <div class="bar-bg-ready" ref="ready"></div>
      <div class="bar-bg-current" ref="current">
        <span class="bar-ctrl" ref="btn" 
          @mousedown="btnMouseDown()"
          @mouseup="btnMouseUp()"
        ></span>
      </div>
    </div>
    <div class="bar-time">
      <span class="bar-time-current">00:00</span>
      <em class="bar-time-devide">/</em>
      <span class="bar-time-all">04:08</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'song-duration',

  props: {},

  data() {
    return {
      durationTime: 248,
      currentTime: 124,
      btnDrag: false,
    }
  },

  computed: {
    barWidth() {
      return this.$refs.bar.clientWidth;
    },
    barOffsetLeft() {
      const bar = this.$refs.bar;
      let actualLeft = bar.offsetLeft; 
      let current = bar.offsetParent; 
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent; 
      }
      return actualLeft; 
    },
    barCurrentWidth() {
      return this.currentTime / this.durationTime * this.barWidth;
    },
  },

  mounted() {
    console.log(this.barWidth, this.barCurrentWidth);
    setTimeout(() => {
      this.currentTime = 200;
    }, 1000);
  },

  methods: {
    handleAutoChange() {

    },
    handleClickChange() {
      const { bar, current } = this.$refs;
      console.log(this.barOffsetLeft, event.clientX);
      current.style.width = `${event.clientX - this.barOffsetLeft}px`;
    },
    handlePullChange() {
      if (!this.btnDrag) {
        return ;
      }
      let clientX = event.clientX;
      clientX = clientX > 918 ? 918 : (clientX < 425 ? 425 : clientX);
      this.$refs.current.style.width = `${clientX - 425}px`;
      console.log(this.btnDrag, clientX);
    },
    btnMouseDown() {
      this.btnDrag = true;
      console.log('move start...');
    },
    btnMouseUp() {
      this.btnDrag = false;
      console.log('move done!');
    },
  },

  watch: {
    barCurrentWidth(newVal) {
      this.$refs.current.style.width = `${newVal}px`;
    }
  },

}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

.bar {
  width: 608px;
  height: 12px;
  .bar-bg {
    position: relative;
    float: left;
    width: 493px;
    height: 9px;
    background: url('../../../public/img/icons/statbar.png') no-repeat right 0px;
    .bar-bg-ready {
      position: absolute;
      width: 0;
      height: 9px;
      background: url('../../../public/img/icons/statbar.png') no-repeat right -30px;
    }
    .bar-bg-current {
      position: absolute;
      width: 0;
      height: 9px;
      background: url('../../../public/img/icons/statbar.png') no-repeat left -66px;
      .bar-ctrl {
        position: absolute;
        top: -7px;
        right: -11px;
        width: 22px;
        height: 24px;
        // margin-left: -11px;
        background: url('../../../public/img/icons/iconall.png') no-repeat 0 -250px;
      }
    }
  }
  .bar-time {
    float: left;
    margin-left: 10px;
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