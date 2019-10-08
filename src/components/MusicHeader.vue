<template>
  <div class="header">
    <div class="wrapper-main">
      <div class="main-header">
        <h1 class="title"></h1>
        <ul class="nav">
          <li class="nav-item" v-for="item of nav" :key="item">{{item}}</li>
          <li class="nav-item">
            <span class="nav-hot"></span>
          </li>
        </ul>
        <div class="search">
          <input class="search-input" type="text" placeholder="音乐/视频/用户/电台">
        </div>
        <div class="creator-center">创作者中心</div>
        <div class="sign">
          <span class="sign-status">登录</span>
        </div>
      </div>
    </div>
    <div class="wrapper-sub">
      <div class="sub-header">
        <ul class="sub-nav">
          <li v-for="(item, i) of subNav" :key="i"
            :class="['sub-nav-item', { 'sub-nav-item-active': subNavActive === i }]" 
            @click="handleSubNavClick(i)"
          >{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-header',

  data() {
    return {
      subNavActive: 0,
      nav: ['发现音乐', '我的音乐', '朋友', '商城', '音乐人', '下载客户端', ],
      subNav: [
        { title: '推荐', path: '/discover/recommend' },
        { title: '排行榜', path: '/discover/toplist' },
        { title: '歌单', path: '/discover/playlist' },
        { title: '主播电台', path: '/discover/djradio' },
        { title: '歌手', path: '/discover/artist' },
        { title: '新碟上架', path: '/discover/album' },
      ],
    }
  },

  methods: {
    handleSubNavClick(i) {
      this.subNavActive = i;
      this.$router.push(this.subNav[i].path);
    },
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.header {
  width: 100%;
  height: 104px;
  .wrapper-main {
    background-color: $bgHeader;
    border-bottom: 1px solid $bdcDark;
  }
  .wrapper-sub {
    background-color: $bgSubHeader;
  }
}
.main-header {
  display: flex;
  width: 1100px;
  height: 69px;
  margin: 0 auto;
  color: $homeDefault;
  .title {
    width: 176px;
    height: 69px;
    background: url('../../public/img/icons/topbar.png') no-repeat;
    @include hoverText();
  }
  .nav {
    display: flex;
    height: 69px;
    line-height: 69px;
    .nav-item {
      display: inline-block;
      padding: 0 19px;
      height: 69px;
      font-size: $fontMinL;
      &:first-child {
        color: $textLight;
        background-color: #000;
      }
      &:not(:last-child):hover {
        cursor: pointer;
        color: #fff;
        background-color: #000;
      }
      &:last-child {
        position: relative;
      }
      .nav-hot {
        position: absolute;
        display: block;
        top: 18px;
        left: -12px;
        width: 28px;
        height: 19px;
        background: url('../../public/img/icons/topbar.png') no-repeat -190px 0;
      }
    }
  }
  .search {
    margin-left: 30px;
    margin-top: 19px;
    width: 158px;
    height: 32px;
    border-radius: 32px;
    overflow: hidden;
    background: url('../../public/img/icons/topbar.png') no-repeat 0 -99px;
    background-color: $bgDefault;
    .search-input {
      width: 100%;
      height: 16px;
      margin-top: 8px;
      margin-left: 30px;
      line-height: 16px;
      font-size: $fontMin;
      color: #333;
      &::placeholder {
        color: $inputInfo;
      }
      &:focus {
        &::placeholder {
          color: $textLight;
        }
      }
    }
  }
  .creator-center {
    box-sizing: border-box;
    margin: 19px 0 0 12px;
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: $fontMin;
    border: 1px solid $homeLogin;
    border-radius: 20px;
    @include hoverLighter($textLight, $bdcLight);
  }
  .sign {
    height: 32px;
    margin: 19px 0 0 20px;
    line-height: 32px;
    .sign-status {
      padding-right: 20px;
      color: $homeLogin;
      @include hoverLighter($infoDark, none);
      background: url('../../public/img/icons/topbar.png') no-repeat right -55px;
    }
  }
}
.sub-header {
  width: 1100px;
  height: 35px;
  margin: 0 auto;
  .sub-nav {
    display: flex;
    padding-left: 176px;
    .sub-nav-item {
      box-sizing: border-box;
      display: block;
      height: 25px;
      margin: 5px 17px 0px;
      padding: 3px 12px;
      line-height: 20px;
      font-size: $fontMin;
      color: $textLight;
      text-align: center;
      border-radius: 20px;
      @include hoverBg($bgSubHeaderItem);
      /* &:first-child {
        background-color: $bgSubHeaderItem;
      } */
    }
    .sub-nav-item-active {
      background-color: $bgSubHeaderItem;
    }
  }
}
</style>
