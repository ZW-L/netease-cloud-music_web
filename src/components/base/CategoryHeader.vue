<template>
  <div class="header">
    <div class="title">{{title}}</div>
    <ul class="list" v-show="list.length">
      <li class="item" v-for="(item, i) of devideList" :key="i">{{item}}</li>
    </ul>
    <div class="more">
      <span class="more-text">更多</span>
      <span class="more-arrow"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category-header',

  components: {},

  props: {
    title: {
      type: String,
      default: '标题',
    },
    list: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
    }
  },

  computed: {
    devideList() {
      return this.list.join('_').split(/\b/).map(v => v === '_' ? '|' : v);
    },
  },

};
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.header {
  display: flex;
  height: 33px;
  padding: 0 10px 0 34px;
  line-height: 33px;
  font-size: $fontMiddle;
  background: url('../../../public/img/icons/index.png') no-repeat -225px -156px;
  border-bottom: 2px solid $bdcTitle;
  .title {
    @include hoverText(pointer, none);
  }
  .list {
    display: flex;
    margin-left: 20px;
    font-size: $fontMin;
    .item:nth-child(even) {
      margin: 0 10px;
      font-weight: bold;
      color: $titleDivide;
    }
    .item:nth-child(odd) {
      color: $titleSub;
      @include hoverText();
    }
  }
  .more {
    position: absolute;
    font-size: $fontMin;
    vertical-align: middle;
    color: $titleMore;
    right: 10px;
    .more-text {
      display: inline-block;
      @include hoverText();
    }
    .more-arrow {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background: url('../../../public/img/icons/index.png') no-repeat 0 -238px;
    }
  }
}
</style>
