<template>
  <div :class="$style.djradio">
    <h3 :class="$style.title">页面开发中...</h3>
  </div>
</template>

<script>
export default {
  name: 'djradio-view',
  components: {},
  props: {},
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" module>
.djradio {
  box-sizing: border-box;
  overflow: hidden;
  .title {
    height: 100vh;
    padding-top: 100px;
    line-height: 50px;
    font-size: 25px;
    text-align: center
  }
}
</style>
