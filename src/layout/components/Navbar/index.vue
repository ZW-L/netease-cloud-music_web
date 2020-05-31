<template>
  <div class="header">
    <div class="wrapper-main">
      <div class="main-header">
        <router-link to="/discover/recommend" tag="h1" class="main-header__title"></router-link>
        <ul class="nav">
          <li class="nav-item" v-for="item of nav" :key="item">{{item}}</li>
          <li class="nav-item">
            <span class="main-header__badge"></span>
          </li>
        </ul>
        <div class="main-header__search">
          <input class="search-input" type="text" placeholder="音乐/视频/用户/电台"
            v-model="searchText"
            @focus="handleFocus(1)"
            @blur="handleFocus(0)"
          >
          <music-search
            v-show="searchText && isFoucus"
            class="search-content"
            :searchResult="searchResult"
          ></music-search>
        </div>
        <div class="creator-center" @click="handleShowAbout()">创作者中心</div>
        <div class="main-header__sign">
          <span class="main-header__sign__status" @click="handleShowAbout()">登录</span>
        </div>
      </div>
    </div>
    <div class="wrapper-sub">
      <div class="sub-header">
        <ul class="sub-nav">
          <li v-for="(item, i) of subNav" :key="i"
            :class="['sub-nav-item', { 'sub-nav-item-active': navActive(i) }]"
            @click="handleSubNavClick(i)"
          >{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MusicSearch from './components/MusicSearch.vue'
import { getSearchSuggest } from '~api/get'

export default {
  name: 'music-header',
  components: {
    MusicSearch,
  },
  data() {
    return {
      nav: ['发现音乐', '我的音乐', '朋友', '商城', '音乐人', '下载客户端'],
      subNav: [
        { title: '推荐', path: '/discover/recommend' },
        { title: '排行榜', path: '/discover/toplist' },
        { title: '歌单', path: '/discover/playlist' },
        { title: '主播电台', path: '/discover/djradio' },
        { title: '歌手', path: '/discover/artist' },
        { title: '新碟上架', path: '/discover/album' },
      ],
      isFoucus: false, // 标记搜索输入框是否获取焦点
      searchText: '', // 绑定搜索输入框内容
      searchResult: {
        order: '',
        albums: '',
        songs: '',
        artists: '',
        playlists: '',
        mvs: '',
      },
    }
  },
  methods: {
    handleSubNavClick(i) {
      this.$router.push(this.subNav[i].path)
    },
    handleFocus(flag) {
      // 因为 blur 事件优先于 click 事件，会导致 click 后不能跳转，因此先将 blur 延迟
      setTimeout(() => {
        this.isFoucus = !!flag
      }, 100)
    },
    navActive(i) {
      return this.$route.path === this.subNav[i].path
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
  },
  watch: {
    searchText(text) {
      const search = text.replace(/\s/g, '')
      if (search !== '') {
        getSearchSuggest(search).then(res => {
          const data = res.data.result
          this.searchResult.albums = data.albums || ''
          this.searchResult.songs = data.songs || ''
          this.searchResult.artists = data.artists || ''
          this.searchResult.playlists = data.albums || ''
          this.searchResult.mvs = data.mvs || ''
          this.searchResult.order = data.order || ''
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.header {
  width: 100%;
  height: $headerHeight;
  margin-bottom: 1px; // 先保留，未发现哪里样式出错了 1px
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
  &__title {
    width: 176px;
    height: 69px;
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
      .main-header__badge {
        position: absolute;
        display: block;
        top: 18px;
        left: -12px;
        width: 28px;
        height: 19px;
      }
    }
  }
  &__search {
    position: relative;
    margin-left: 30px;
    margin-top: 19px;
    width: 158px;
    height: 32px;
    border-radius: 32px;
    background-color: $bgDefault;
    .search-input {
      width: 100px;
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
    .search-content {
      z-index: 99;
      position: absolute;
      top: 40px;
      color: #000;
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
  &__sign {
    height: 32px;
    margin: 19px 0 0 20px;
    line-height: 32px;
    &__status {
      padding-right: 20px;
      color: $homeLogin;
      @include hoverLighter($infoDark, none);
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
      margin: 4px 17px 0px;
      padding: 3px 12px;
      line-height: 20px;
      font-size: $fontMin;
      color: $textLight;
      text-align: center;
      border-radius: 20px;
      @include hoverBg($bgSubHeaderItem);
    }
    .sub-nav-item-active {
      background-color: $bgSubHeaderItem;
    }
  }
}
</style>
