<template>
  <div class="container">
    <category-header :title="title" :morePath="morePath" />
    <div class="content">
      <bill-category-item v-for="i of bill" :key="i" :id="i" class="column" />
    </div>
  </div>
</template>

<script>
import CategoryHeader from '@/components/base/CategoryHeader.vue'
import BillCategoryItem from './BillCategoryItem.vue'

export default {
  name: 'bill-category',
  components: {
    CategoryHeader,
    BillCategoryItem,
  },
  data() {
    return {
      title: '榜单',
      morePath: '/discover/toplist',
      bill: [19723756, 3779629, 2884035],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container {
  position: relative;
  width: 100%;
  .content {
    margin-top: 20px;
    .column {
      box-sizing: border-box;
      display: inline-block;
      width: 229px;
      border: 1px solid $bdcDefault;
    }
  }
}
</style>
