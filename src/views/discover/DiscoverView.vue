<template>
  <div class="container">
    <home-carousel class="carousel"></home-carousel>
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
          :category="asideList[0].category"
          :list="asideList[0].list"
          :isSinger="true"
        ></aside-card>
        <aside-card class="hoster" 
          :category="asideList[1].category"
          :list="asideList[1].list"
        ></aside-card>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from './components/HomeCarousel.vue';
import HotCategory from './components/HotCategory.vue';
import NewCategory from './components/NewCategory.vue';
import BillCategory from './components/BillCategory.vue';
import AsideCard from './components/AsideCard.vue';

export default {
  name: 'discover-view',

  components: {
    HomeCarousel,
    HotCategory,
    NewCategory,
    BillCategory,
    AsideCard,
  },

  props: {},

  data() {
    return {
      asideList: [
        {
          category: '入驻歌手',
          list: [
            {
              avatar: 'http://p1.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg?param=62y62',
              name: 'Fine乐团',
              desc: '独立音乐人',
            },
          ],
        },
        {
          category: '热门主播',
          list: [
            {
              avatar: 'http://p1.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg?param=40y40',
              name: 'DJ艳秋',
              desc: '著名节目音乐主持人',
            },
          ],
        },
      ],
    };
  },

}
</script>

<style lang="scss" scoped>

.container {
  .carousel {
    width: 100%;
    height: 336px;
  }
  .content {
    position: relative;
    width: 982px;
    margin-left: 50%;
    left: -491px;
    .content-left, .content-right {
      float: left;
      box-sizing: border-box;
    }
    .content-left {
      width: 732px;
      padding: 20px 20px 40px 20px;
      border: 1px solid rgb(211, 211, 211);
    }
    .content-right {
      width: 250px;
      border: 1px solid rgb(211, 211, 211);
      border-left: none;
      .sign {
        width: 100%;
        height: 126px;
        background: url('../../../public/img/icons/index.png') no-repeat 0 0;
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
          text-shadow: 0 1px 0 #8a060b;
          color: #fff;
          background: url('../../../public/img/icons/index.png') no-repeat 0 -195px;
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