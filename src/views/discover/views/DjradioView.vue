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
  width: 982px;
  height: 1000px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .title {
    height: 100vh;
    padding-top: 100px;
    line-height: 50px;
    font-size: 25px;
    text-align: center
  }
}
</style>
