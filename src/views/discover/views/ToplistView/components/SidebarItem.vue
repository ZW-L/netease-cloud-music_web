<template>
  <div class="wrapper">
    <h1 class="cate-title">{{title}}</h1>
    <div class="cate-list">
      <div v-for="(item, i) of rank" :key="i"
        :class="['card', { 'cate-item-active': item.id === id }]"
        @click="handleChangeRank(item.id)"
      >
        <div class="img">
          <img :src="item.coverImgUrl" :alt="item.name">
        </div>
        <div class="desc">
          <p class="name">{{item.name}}</p>
          <p class="info">{{item.updateFrequency}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    rank: {
      type: Array,
      default: () => [],
    },
    id: {
      type: Number,
    },
  },
  methods: {
    handleChangeRank(id) {
      this.$emit('changeRank', id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.wrapper {
  .cate-title {
    margin-top: 20px;
    padding: 0 10px 12px;
    font-size: $fontMinL;
    font-weight: bold;
  }
  .cate-list {
    .card {
      display: flex;
      padding: 10px 0 10px 20px;
      @include hoverBg($bgFooter);
      .img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .desc {
        flex: 1;
        margin-left: 8px;
        .name, .info  {
          height: 20px;
          line-height: 20px;
          font-size: $fontMin;
        }
        .info {
          color: $textLinkDefault;
        }
      }
    }
  }
  .cate-item-active {
    background-color: $bgTableDark;
  }
}
</style>
