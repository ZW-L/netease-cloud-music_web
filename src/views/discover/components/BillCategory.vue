<template>
  <div class="container">
    <category-header :title="hot.title"></category-header>
    <div class="content">
      <div class="column" v-for="i of 3" :key="i">
        <bill-category-item :pic="bill[i-1].pic" :title="bill[i-1].title"></bill-category-item>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue';
import CategoryHeader from '@/components/base/CategoryHeader.vue';
import BillCategoryItem from './BillCategoryItem.vue';

export default {
  name: 'bill-category',

  components: {
    PlaylistCard,
    CategoryHeader,
    BillCategoryItem,
  },

  props: {},

  data() {
    return {
      hot: {
        title: '榜单',
      },
      bill: [
        {
          pic: 'http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100',
          title: '云音乐飙升榜',
        },
        {
          pic: 'http://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100',
          title: '云音乐新歌榜',
        },
        {
          pic: 'http://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100',
          title: '网易原创歌曲榜',
        },
      ],
    };
  },

}
</script>

<style lang="scss" scoped>

.container {
  position: relative;
  width: 100%;
  .content {
    margin-top: 20px;
    .column {
      box-sizing: border-box;
      display: inline-block;
      width: calc(100%/3);
      border: 1px solid rgb(211, 211, 211);
    }
  }
}
</style>
      
