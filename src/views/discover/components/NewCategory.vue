<template>
  <div class="container">
    <category-header :title="hot.title" :list="hot.list"></category-header>
    <div class="content">
      <div class="wrapper">
        <ul class="list">
          <new-disc-card class="item" 
            v-for="(item, i) of albums" :key="i"
            :album="item"
          ></new-disc-card>
        </ul>
      </div>
      <span class="prev">&nbsp;</span>
      <span class="next">&nbsp;</span>
    </div>
  </div>
</template>

<script>
import CategoryHeader from '@/components/base/CategoryHeader.vue';
import NewDiscCard from '@/components/base/NewDiscCard.vue';
import { getTopAlbum } from '@/api/get.js';

export default {
  name: 'new-category',

  components: {
    CategoryHeader,
    NewDiscCard,
  },

  props: {},

  data() {
    return {
      hot: {
        title: '新碟上架',
      },
      albums: [],
    };
  },

  mounted() {
    getTopAlbum(5).then(res => {
      // console.log(res.data.albums);
      this.albums = this.albums.concat(res.data.albums);
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
    position: relative;
    .wrapper {
      box-sizing: border-box;
      height: 186px;
      margin: 20px 0 37px 0;
      border: 1px solid rgb(211, 211, 211);
      background-color: rgb(245, 245, 245);
      .list {
        margin: 25px 20px;
        .item {
          margin-left: 11px;
        }
      }
    }
    .prev, .next {
      position: absolute;
      width: 17px;
      height: 17px;
      top: 71px;
      &:hover {
        cursor: pointer;
      }
    }
    .prev {
      left: 5px;
      background: url('../../../../public/img/icons/index.png') no-repeat -260px -75px;
      &:hover {
        background: url('../../../../public/img/icons/index.png') no-repeat -280px -75px;
      }
    }
    .next {
      right: 5px;
      background: url('../../../../public/img/icons/index.png') no-repeat -300px -75px;
      &:hover {
        background: url('../../../../public/img/icons/index.png') no-repeat -320px -75px;
      }
    }
  }
}
</style>
      
