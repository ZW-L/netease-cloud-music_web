<template>
  <div class="album">
    <div class="header">
      <h2 class="header-title">热门新碟</h2>
    </div>
    <div class="content hot">
      <div class="content-item" v-for="i of 10" :key="i">
        <new-disc-card :album="album" size="lg"></new-disc-card>
      </div>
    </div>
    <div class="header">
      <h2 class="header-title">热门新碟</h2>
      <ul class="header-cate">
        <li class="header-cate-item" v-for="(item, i) of allCates" :key="i">{{item}}</li>
      </ul>
    </div>
    <div class="content all">
      <div class="content-item" v-for="i of 35" :key="i">
        <new-disc-card :album="album" size="lg"></new-disc-card>
      </div>
    </div>
    <base-pagination></base-pagination>
  </div>
</template>

<script>
import BasePagination from '@/components/base/pagination.vue';
import NewDiscCard from '@/components/base/NewDiscCard.vue';
import { addSeparator } from '~api/util.js';

export default {
  name: 'album-view',

  components: {
    BasePagination,
    NewDiscCard,
  },

  data() {
    return {
      cates: ['全部', '华语', '欧美', '日本'],
      album: {
        picUrl: 'http://p4.music.126.net/HeGrAKPiZhKkONiFDxZvmw==/109951164384346866.jpg?param=130y130',
        name: '我和我的祖国',
        artist: {
          name: '王菲',
        },
      },
    };
  },

  computed: {
    allCates() {
      return addSeparator(this.cates);
    },
  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';

.album {
  box-sizing: border-box;
  width: 982px;
  margin: 0 auto;
  padding: 40px;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  background-color: $bgDefault;
  .header {
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid $bdcTitle;
    .header-title {
      float: left;
      font-size: $fontLarge;
    }
    .header-cate {
      float: left;
      margin-left: 20px;
      margin-top: 5px;
      font-size: $fontMin;
      color: $inputInfo;
      .header-cate-item {
        float: left;
        &:nth-child(even) {
          margin: 0 10px;
        }
      }
    }
  }
  .content {
    overflow: hidden;
    margin-top: 20px;
    .content-item {
      float: left;
      margin: 0 26px 20px 0;
    }
  }
}
</style>