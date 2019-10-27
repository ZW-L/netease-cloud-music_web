<template>
  <div class="container">
    <div class="header">
      <span class="category">{{category}}</span>
      <span v-show="isSinger" class="more">查看全部&gt;</span>
    </div>
    <div v-if="isSinger" class="list">
      <router-link tag="div" to="/" class="item" v-for="i of list" :key="i.avatar">
        <div class="img-wrapper">
          <img :src="i.avatar" alt="">
        </div>
        <div class="info">
          <p class="info-name">{{i.name}}</p>
          <p class="info-desc">{{i.desc}}</p>
        </div>
      </router-link>
    </div>
    <div v-else class="list">
      <user-card :user="i" v-for="i of list" :key="i.avatar"></user-card>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/base/UserCard.vue';

export default {
  name: 'aside-card',

  components: {
    UserCard,
  },

  props: {
    category: {
      type: String,
      default: 'title',
    },
    isSinger: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixins.scss';
@import '@/assets/css/variables.scss';

.container {
  position: relative;
  margin: 0 20px;
  .header {
    height: 23px;
    font-size: $fontMin;
    border-bottom: 1px solid $bdcDefault;
    .category {
      font-weight: bold;
      color: $titleMain;
    }
    .more {
      float: right;
      color: $titleMore;
    }
  }
  .list {
    .item {
      overflow: hidden;
      margin-top: 14px;
      .img-wrapper {
        float: left;
        width: 62px;
        height: 62px;
        img {
          width: 100%;
        }
      }
      .info {
        float: left;
        width: 130px;
        height: 60px;
        padding-left: 14px;
        border: 1px solid $bdcDefault;
        border-left: none;
        background-color: $bgUserCard;
        .info-name {
          margin-top: 8px;
          font-weight: bold;
        }
        .info-desc {
          margin-top: 8px;
          font-size: $fontMin;
          @include ellipse();
        }
      }
      &:hover {
        .info {
          background-color: $bgTableLight;
        }
      }
    }
  }
}
</style>