<template>
<div class="desc">
  <h3 class="desc-title">专辑介绍：</h3>
  <div class="desc-content">
    <p class="content-line" v-for="(item, i) of realDesc" :key="i">{{item}}</p>
  </div>
  <p v-show="shortDesc.length !== fullDesc.length"
    class="desc-ctrl"
    @click="handleShowAll"
  >
    <em v-if="!showAll" class="ctrl-text">展开</em>
    <em v-else class="ctrl-text">收起</em>
    <i :class="['ctrl-icon', showAll ? 'desc-ctrl__up-icon' : 'desc-ctrl__down-icon']"></i>
  </p>
</div>
</template>

<script>
export default {
  props: {
    desc: String,
  },

  data() {
    return {
      showAll: false, // 是否显示全部专辑介绍
    }
  },

  computed: {
    fullDesc() {
      return this.desc.split('\n').concat('')
    },
    shortDesc() {
      if (this.desc.length <= 100) {
        return this.fullDesc
      }
      return this.desc.slice(0, 97).concat('...').split('\n')
    },
    realDesc() {
      return this.showAll ? this.fullDesc : this.shortDesc
    },
  },

  methods: {
    handleShowAll() {
      this.showAll = !this.showAll
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.desc {
  margin-bottom: 30px;
  font-size: $fontMin;
  .desc-title {
    height: 24px;
    line-height: 24px;
    font-weight: bold;
  }
  .desc-content {
    text-indent: 2em;
    line-height: 30px;
  }
  .desc-ctrl {
    float: right;
    &:hover {
      cursor: pointer;
    }
    .ctrl-text {
      color: $textLinkBlueLight;
    }
    .ctrl-icon {
      display: inline-block;
      width: 11px;
      height: 8px;
      margin-left: 5px;
    }
  }
}
</style>
