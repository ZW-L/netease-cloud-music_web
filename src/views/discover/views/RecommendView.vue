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
        <div class="sign">
          <p class="sign-desc">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <a class="sign-btn">用户登录</a>
        </div>
        <aside-card class="singer" 
          :category="category[0]"
          :list="homeSinger"
          :isSinger="true"
        ></aside-card>
        <aside-card class="hoster" 
          :category="category[1]"
          :list="homeHoster"
        ></aside-card>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from '@discover/components/HomeCarousel.vue';
import HotCategory from '@discover/components/HotCategory.vue';
import NewCategory from '@discover/components/NewCategory.vue';
import BillCategory from '@discover/components/BillCategory.vue';
import AsideCard from '@discover/components/AsideCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'recommend-view',

  components: {
    HomeCarousel,
    HotCategory,
    NewCategory,
    BillCategory,
    AsideCard,
  },

  data() {
    return {
      category: ['入驻歌手', '热门主播'],
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
      .sign {
        width: 100%;
        height: 126px;
        background: url('../../../../public/img/icons/index.png') no-repeat 0 0;
        .sign-desc {
          margin: 0 auto;
          padding: 16px;
          line-height: 22px;
          font-size: 12px;
        }
        .sign-btn {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 31px;
          line-height: 31px;
          text-align: center;
          text-shadow: 0 1px 0 $loginBtnShadow;
          color: $textLight;
          background: url('../../../../public/img/icons/index.png') no-repeat 0 -195px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .singer {
        margin-top: 15px;
      }
      .hoster {
        margin-top: 30px;
      }
    }
  }
}
</style>