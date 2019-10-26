<template>
  <div class="recommend">
    <home-carousel class="carousel" :banner="banner"></home-carousel>
    <div class="content">
      <div class="content-left">
        <hot-category></hot-category>
        <new-category></new-category>
        <bill-category></bill-category>
      </div>
      <div class="content-right">
        <aside-assembly
          :loginInfo="loginInfo"
          :inSingers="inSingers"
          :hotPlayers="hotPlayers"
        ></aside-assembly>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from '@discover/components/HomeCarousel.vue';
import HotCategory from '@discover/components/HotCategory.vue';
import NewCategory from '@discover/components/NewCategory.vue';
import BillCategory from '@discover/components/BillCategory.vue';
// import AsideCard from '@discover/components/AsideCard.vue';
import AsideAssembly from '@/components/AsideAssembly.vue'; 
import { mapGetters } from 'vuex';

export default {
  name: 'recommend-view',

  components: {
    HomeCarousel,
    HotCategory,
    NewCategory,
    BillCategory,
    // AsideCard,
    AsideAssembly,
  },

  data() {
    return {
      category: ['入驻歌手', '热门主播'],
      loginInfo: true,
      inSingers: [1],
      hotPlayers: [1],
    };
  },

  computed: {
    ...mapGetters(['homeSinger', 'homeHoster']),
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';

.recommend {
  position: relative;
  .carousel {
    width: 100%;
    height: 336px;
  }
  .content {
    overflow: hidden;
    width: 982px;
    margin: 0 auto;
    .content-left, .content-right {
      float: left;
      box-sizing: border-box;
      background-color: $bgDefault;
    }
    .content-left {
      width: 732px;
      padding: 20px 20px 40px 20px;
      border: 1px solid $bdcDefault;
      border-bottom: none;
    }
    .content-right {
      width: 250px;
      padding-bottom: 40px;
      border: 1px solid $bdcDefault;
      border-left: none;
    }
  }
}
</style>