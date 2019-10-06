<template>
  <div class="container">
    <category-header :title="hot.title" :list="hot.list"></category-header>
    <div class="content">
      <ul class="playlist">
        <playlist-card class="item" v-for="i of 8" :key="i"></playlist-card>
      </ul>
    </div>
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue';
import CategoryHeader from '@/components/base/CategoryHeader.vue';

export default {
  name: 'hot-category',

  components: {
    PlaylistCard,
    CategoryHeader,
  },

  props: {},

  data() {
    return {
      hot: {
        title: '热门推荐',
        list: ['华语', '流行', '摇滚', '民谣', '电子'],
      },
    };
  },

}
</script>

<style lang="scss" scoped>

.container {
  position: relative;
  width: 100%;
  .content {
    .playlist {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 140px;
        height: 204px;
        padding-bottom: 30px;
      }
    }
  }
}
</style>
      
