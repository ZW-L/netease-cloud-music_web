<template>
  <div class="ms">
    <div class="ms-header">搜索结果：</div>
    <ul class="ms-list">
      <!-- 单曲 -->
      <li v-show="searchResult.songs" class="list-item">
        <h3 class="title-left">
          <i class="icon-song"></i>
          <em>单曲</em>
        </h3>
        <ul class="sub-list">
          <li class="sub-item" v-for="(item, i) of searchResult.songs" :key="i">
            <router-link :to="`/song?id=${item.id}`">{{item.name}} - {{getArtists(item.artists)}}</router-link>
          </li>
        </ul>
      </li>
      <!-- 歌手 -->
      <li v-show="searchResult.singers" class="list-item">
        <h3 class="title-left">
          <i class="icon-singer"></i>
          <em>歌手</em>
        </h3>
        <ul class="sub-list">
          <li class="sub-item" v-for="(item, i) of searchResult.singers" :key="i">{{item.name}}</li>
        </ul>
      </li>
      <!-- 专辑 -->
      <li v-show="searchResult.albums" class="list-item">
        <h3 class="title-left">
          <i class="icon-album"></i>
          <em>专辑</em>
        </h3>
        <ul class="sub-list">
          <li class="sub-item" v-for="(item, i) of searchResult.albums" :key="i">
            <router-link :to="`/album?id=${item.id}`">{{item.name}} - {{item.artist.name}}</router-link>
          </li>
        </ul>
      </li>
      <!-- 视频 -->
      <li v-show="searchResult.mvs" class="list-item">
        <h3 class="title-left">
          <i class="icon-video"></i>
          <em>视频</em>
        </h3>
        <ul class="sub-list">
          <li class="sub-item" v-for="(item, i) of searchResult.mvs" :key="i">
            {{item.name}} - {{getArtists(item.artists)}}
          </li>
        </ul>
      </li>
      <!-- 歌单 -->
      <li v-show="searchResult.playlists" class="list-item">
        <h3 class="title-left">
          <a class="icon-playlist"></a>
          <em>歌单</em>
        </h3>
        <ul class="sub-list">
          <li class="sub-item" v-for="(item, i) of searchResult.playlists" :key="i">
            <router-link :to="`/playlist?id=${item.id}`">{{item.name}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSingers } from '~api/get.js';

export default {
  name: 'music-search',

  props: {
    searchResult: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    getArtists(ar) {
      return Array.isArray(ar) ? ar.map(v => v.name).join('/') : '';
    },
  },

  watch: {
    'searchResult.tag' (newVal) {
      console.log(this.searchResult);
    },
  },

}
</script>

<style lang="scss" scoped>
@import '~css/variables.scss';
@import '~css/mixins.scss';

.ms {
  overflow: hidden;
  width: 240px;
  font-size: $fontMin;
  background-color: $bgDefault;
  border: 2px solid $bdcDefault;
  border-radius: 5px;
  .ms-header {
    height: 17px;
    padding: 11px 10px;
    line-height: 17px;
    border-bottom: 1px solid $bdcDefault;
  }
  .ms-list {
    .list-item {
      float: left;
      &:last-child {
        .sub-list {
          border-bottom: none;
        }
      }
      &:nth-child(even) {
        .sub-list {
          background-color: $bgTableLight;
        }
      }
      .title-left {
        box-sizing: border-box;
        padding: 8px;
        float: left;
        width: 65px;
        @each $i, $x, $y in ((song, -35, -300), (singer, -50, -300), 
                             (album, -35, -320), (video, -60, -862), 
                             (playlist, -50, -320)) {
          .icon-#{$i} {
            float: left;
            width: 14px;
            height: 15px;
            margin-right: 5px;
            background: url('../../public/img/icons/icon.png') no-repeat #{$x}px #{$y}px;
          }
        }
      }
      .sub-list {
        box-sizing: border-box;
        float: left;
        padding: 5px 0 5px 8px;
        width: 175px;
        line-height: 25px;
        border-left: 1px solid $bdcDefault;
        border-bottom: 1px solid $bdcDefault;
        .sub-item {
          padding-right: 5px;
          @include ellipse();
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
