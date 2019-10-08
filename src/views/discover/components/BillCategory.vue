<template>
  <div class="container">
    <category-header :title="hot.title"></category-header>
    <div class="content">
      <bill-category-item class="column" v-for="i of bill" :key="i" :idx="i"></bill-category-item>
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

  data() {
    return {
      hot: {
        title: '榜单',
      },
      bill: [3, 0, 2],
    };
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';

.container {
  position: relative;
  width: 100%;
  .content {
    margin-top: 20px;
    .column {
      box-sizing: border-box;
      display: inline-block;
      width: 230px;
      border: 1px solid $bdcDefault;
    }
  }
}
</style>
      
