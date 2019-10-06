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

}
</script>

<style lang="scss" scoped>

.header {
  display: flex;
  height: 33px;
  padding: 0 10px 0 34px;
  line-height: 33px;
  font-size: 20px;
  background: url('../../../public/img/icons/index.png') no-repeat -225px -156px;
  border-bottom: 2px solid rgb(193, 13, 12);
  .title {
    &:hover {
      cursor: pointer;
    }
  }
  .list {
    display: flex;
    margin-left: 20px;
    font-size: 12px;
    .item:nth-child(even) {
      margin: 0 10px;
      font-weight: bold;
      color: rgb(210, 210, 210);
    }
    .item:nth-child(odd) {
      color: rgb(137, 137, 137);
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .more {
    position: absolute;
    font-size: 12px;
    vertical-align: middle;
    color: rgb(102, 102, 102);
    right: 10px;
    .more-text {
      display: inline-block;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
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