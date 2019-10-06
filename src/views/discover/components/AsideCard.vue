<template>
  <div class="container">
    <div class="header">
      <span class="category">{{category}}</span>
      <span v-show="isSinger" class="more">查看全部&gt;</span>
    </div>
    <div v-if="isSinger" class="list">
      <router-link tag="div" to="/" class="item" v-for="i of 5" :key="i">
        <div class="img-wrapper">
          <img :src="list[0].avatar" alt="">
        </div>
        <div class="info">
          <p class="info-name">{{list[0].name}}</p>
          <p class="info-desc">{{list[0].desc}}</p>
        </div>
      </router-link>
    </div>
    <div v-else class="list">
      <user-card :user="list[0]" v-for="i of 5" :key="i"></user-card>
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

  data() {
    return {
    }
  },

}
</script>

<style lang="scss" scoped>

.container {
  position: relative;
  margin: 0 20px;
  .header {
    height: 23px;
    font-size: 12px;
    border-bottom: 1px solid rgb(204, 204, 204);
    .category {
      font-weight: bold;
      color: #333;
    }
    .more {
      float: right;
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
        border: 1px solid rgb(204, 204, 204);
        border-left: none;
        background-color: rgb(250, 250, 250);
        .info-name {
          margin-top: 8px;
          font-weight: bold;
        }
        .info-desc {
          margin-top: 8px;
          font-size: 12px;
        }
      }
      &:hover {
        cursor: pointer;
        .info {
          background-color: rgb(244, 244, 244);
        }
      }
    }
  }
}
</style>