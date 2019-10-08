<template>
  <div class="container">
    <category-header :title="hot.title" :list="hot.list"></category-header>
    <div class="content">
      <ul class="playlist">
        <playlist-card class="item" 
          v-for="(item, i) of playlist" :key="i"
          :info="item"
        ></playlist-card>
      </ul>
    </div>
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue';
import CategoryHeader from '@/components/base/CategoryHeader.vue';
import { getPersonalized } from '@/api/get.js';

export default {
  name: 'hot-category',

  components: {
    PlaylistCard,
    CategoryHeader,
  },

  data() {
    return {
      hot: {
        title: '热门推荐',
        list: ['华语', '流行', '摇滚', '民谣', '电子'],
      },
      playlist: [],
    };
  },

  mounted() {
    getPersonalized(8).then(res => {
      // console.log(res.data.result);
      this.playlist = this.playlist.concat(res.data.result);
    }).catch(err => {
      console.log(err);
    });
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
      
