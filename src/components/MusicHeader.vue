<template>
  <div class="header">
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
        <span class="arrow-down">⬇</span>
      </div>
    </div>
    <div class="sub-header">
      <ul class="sub-nav">
        <li class="sub-nav-item" v-for="item of subNav" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-header',

  components: {},

  props: {
    
  },

  data() {
    return {
      nav: ['发现音乐', '我的音乐', '朋友', '商城', '音乐人', '下载客户端', ],
      subNav: ['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架', ],
    }
  },

}
</script>

<style lang="scss" scoped>

.header {
  width: 100%;
  height: 104px;
}
.main-header {
  display: flex;
  height: 69px;
  color: rgb(172, 172, 172);
  background-color: rgb(36, 36, 36);
  border-bottom: 1px solid #000;
  .title {
    width: 176px;
    height: 69px;
    background: url('../../public/img/icons/topbar.png') no-repeat;
    &:hover {
      cursor: pointer;
    }
  }
  .nav {
    display: flex;
    height: 69px;
    line-height: 69px;
    .nav-item {
      display: inline-block;
      padding: 0 19px;
      height: 69px;
      font-size: 14px;
      &:first-child {
        color: #fff;
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
    background-color: #fff;
    .search-input {
      width: 100%;
      height: 16px;
      margin-top: 8px;
      margin-left: 30px;
      line-height: 16px;
      font-size: 12px;
      color: #333;
      &::placeholder {
        color: rgb(169, 169, 169);
      }
      &:focus {
        &::placeholder {
          color: #fff;
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
    font-size: 12px;
    border: 1px solid #4F4F4F;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      color: #fff;
      border: 1px solid #fff;
    }
  }
  .sign {
    margin: 19px 0 0 20px;
    height: 32px;
    line-height: 32px;
    .sign-status {
      color: rgb(120, 120, 120);
      &:hover {
        cursor: pointer;
        color: rgb(69, 69, 69);
        text-decoration: underline rgb(69, 69, 69);
      }
    }
    .arrow-down {
      margin-left: 10px;
      color: rgb(69, 69, 69);
    }
  }
}
.sub-header {
  height: 35px;
  background-color: rgb(194, 12, 12);
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
      font-size: 12px;
      color: #fff;
      text-align: center;
      border-radius: 20px;
      &:first-child {
        cursor: pointer;
        background-color: rgb(155, 9, 9);
      }
      &:hover {
        cursor: pointer;
        background-color: rgb(155, 9, 9);
      }
    }
  }
}
</style>
