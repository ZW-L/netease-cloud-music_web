<template>
  <div class="recommend">
    <home-carousel class="carousel"></home-carousel>
    <div class="content">
      <div class="content-left">
        <hot-category></hot-category>
        <new-category></new-category>
        <bill-category></bill-category>
      </div>
      <div class="content-right">
        <aside-group
          :loginInfo="loginInfo"
          :inSingers="homeSinger"
          :hotPlayers="homeHoster"
        ></aside-group>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from '@discover/components/HomeCarousel.vue';
import HotCategory from '@discover/components/HotCategory.vue';
import NewCategory from '@discover/components/NewCategory.vue';
import BillCategory from '@discover/components/BillCategory.vue';
import AsideGroup from '@/components/group/AsideGroup.vue'; 
import { mapGetters } from 'vuex';
import { getToplistDetail } from '~api/get.js';

export default {
  name: 'recommend-view',

  components: {
    HomeCarousel,
    HotCategory,
    NewCategory,
    BillCategory,
    AsideGroup,
  },

  data() {
    return {
      category: ['入驻歌手', '热门主播'],
      loginInfo: true,
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
    height: 285px;
  }
  .content {
    box-sizing: border-box;
    overflow: hidden;
    width: 982px;
    margin: 0 auto;
    background-color: $bgDefault;
    border-left: 1px solid $bdcDefault;
    border-right: 1px solid $bdcDefault;
    .content-left {
      box-sizing: border-box;
      float: left;
      width: 730px;
      padding: 20px 20px 40px 20px;
      border-right: 1px solid $bdcDefault;
    }
    .content-right {
      float: left;
      width: 250px;
    }
  }
}
</style>