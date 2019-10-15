<template>
  <div class="pagination">
    <a href="#"
      :class="prevClasses" 
      @click="changePage('prev')"
    >
      <i class="iconfont icon-houtui"></i>
      <em>上一页</em>
    </a>
    <a href="#" v-for="(page, i) of pageChanges" :key="i"
      :class="['page-item', { 'page-active': page === currentPage, 'paga-ellipsis': page === '...' }]"
      @click="changePage(page)"
    >{{page}}</a>
    <a href="#"
      :class="nextClasses" 
      @click="changePage('next')"
    >
      <em>下一页</em>
      <i class="iconfont icon-qianjin"></i>
    </a>
  </div>
</template>

<script>
import { pageChanges } from '~api/util.js';

export default {
  name: 'base-pagination',

  props: {},

  data() {
    return {
      pages: 38,
      currentPage: 1,
    }
  },

  computed: {
    prevClasses() {
      return this.currentPage === 1 ? ['pagi-prev', 'pagi-prev-disabled'] : ['pagi-prev'];
    },
    nextClasses() {
      return this.currentPage === this.pages ? ['pagi-next', 'pagi-next-disabled'] : ['pagi-next'];
    },
    pageChanges() {
      return pageChanges(this.currentPage, this.pages);
    },
  },

  methods: {
    changePage(i) {
      if (i === '...') {
        return;
      }
      if (i === 'prev') {
        if (this.currentPage === 1) 
          return;
        this.currentPage = this.currentPage - 1;        
      } else if (i === 'next') {
        if (this.currentPage === this.pages) 
          return;
        this.currentPage = this.currentPage + 1;        
      } else {
        this.currentPage = i;
      }
    },
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.pagination {
  height: 26px;
  margin: 50px 0;
  font-size: $fontMin;
  text-align: center;
  .pagi-prev, .pagi-next {
    display: inline-block;
    height: 24px;
    padding: 0 10px;
    line-height: 24px;
    background-color: $bgTableDark;
    border: 1px solid $bdcDefault;
    border-radius: 3px;
    color: $textDefault;
    .iconfont {
      font-weight: bold;
      font-size: $fontMin;
    }
    &:hover {
      cursor: pointer;
      background-color: $bgTableLight;
      .iconfont {
        color: $homeDefault;
      }
    }
  }
  .pagi-prev-disabled,  .pagi-next-disabled{
    color: $titleDivide;
    &:hover {
      cursor: not-allowed;
      background-color: $bgTableDark;
    }
  }
  .pagi-next {
    margin-left: 10px;
  }
  .page-item {
    display: inline-block;
    height: 22px;
    padding: 0 8px;
    margin-left: 10px;
    border: 1px solid $bdcDefault;
    border-radius: 3px;
    line-height: 22px;
    color: $textDefault;
    &:hover {
      cursor: pointer;
      border: 1px solid $bdcDark;
    }
  }
  .paga-ellipsis {
    padding: 0;
    border: 1px solid $bdcLight;
    &:hover {
      cursor: default;
      border: 1px solid $bdcLight;
    }
  }
  .page-active {
    color: $textLight;
    background-color: $bgPaginationActive;
    &:hover {
      cursor: default;
      border: 1px solid $bdcDefault;
    }
  }
}
</style>