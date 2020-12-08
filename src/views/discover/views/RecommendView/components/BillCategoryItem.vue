<template>
  <div class="bill-cate-item">
    <div class="header">
      <div class="header-left">
        <img class="left-pic" :src="`${coverImgUrl}?param=200y200`" alt="">
        <router-link :to="`/discover/toplist?id=${id}`" class="header-left__link"></router-link>
      </div>
      <div class="header-right">
        <div class="right-title">
          <router-link :to="`/discover/toplist?id=${id}`">{{name}}</router-link>
        </div>
        <div class="right-options">
          <span class="right-options__play" @click="playAll()"></span>
          <span href="#" class="right-options__addall" @click="handleShowAbout()"></span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, i) of list" :key="i">
        <span class="item-order">{{i+1}}</span>
        <router-link :to="`/song?id=${item.id}`" class="item-name">{{item.name}}</router-link>
        <div class="item-options">
          <span class="icon item-options__icon-play" @click="handleToPlay(item)"></span>
          <span class="icon item-options__icon-add" @click="handleAdd(item)"></span>
          <span href="#" class="icon item-options__icon-collect" @click="handleShowAbout()"></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link :to="`/discover/toplist?id=${id}`"
        class="show-all"
      >查看全部&gt;</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'bill-category-item',
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      list: [],
      name: '',
      coverImgUrl: '',
    }
  },
  computed: {
    ...mapGetters(['toIdx']),
  },
  mounted() {
    this.initialData()
  },
  methods: {
    initialData() {
      this.$api.getRankList(this.id).then(res => {
        // console.log(res)
        const { playlist } = res.data
        this.name = playlist.name
        this.coverImgUrl = playlist.coverImgUrl
        this.list = playlist.tracks.slice(0, 10)
      })
    },
    handleToPlay(item) {
      this.$store.dispatch('toPlay', item)
    },
    handleAdd(item) {
      this.$store.dispatch('addToPlaylist', item)
    },
    playAll() {
      this.$api.getRankList(this.id).then(res => {
        const playlist = res.data.playlist.tracks
        this.$store.dispatch('changePlaylist', playlist)
      })
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.bill-cate-item {
  .header {
    position: relative;
    height: 100px;
    padding-top: 20px;
    padding-left: 20px;
    background-color: $bgTableLight;
    .header-left {
      position: relative;
      float: left;
      width: 80px;
      height: 80px;
      .left-pic {
        width: 100%;
      }
      .header-left__link {
        position: absolute;
        width: 80px;
        height: 80px;
        left: 0;
      }
    }
    .header-right {
      float: left;
      margin-top: 6px;
      margin-left: 10px;
      width: 116px;
      .right-title {
        color: #333;
        font-size: $fontMinL;
        font-weight: bold;
        @include hoverText();
      }
      .right-options {
        margin-top: 10px;
        & span {
          float: left;
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
      }
    }
  }
  .list {
    color: $textDefault;
    .item {
      position: relative;
      height: 32px;
      padding-left: 20px;
      line-height: 32px;
      .item-order, .item-name {
        float: left;
        height: 32px;
      }
      .item-order {
        width: 35px;
        font-size: $fontDefault;
        text-align: center;
      }
      .item-name {
        width: 170px;
        font-size: $fontMin;
      }
      .item-options {
        display: none;
        position: absolute;
        width: 75px;
        right: 0;
        top: 0;
        bottom: 0;
        .icon {
          float: left;
          width: 17px;
          height: 17px;
          &:hover {
            cursor: pointer;
          }
        }
        .item-options__icon-play {
          margin-top: 8px;
          margin-right: 8px;
        }
        .item-options__icon-add {
          margin-top: 10px;
          margin-right: 6px;
        }
        .item-options__icon-collect {
          margin-top: 8px;
          margin-right: 10px;
        }
      }
      &:nth-child(odd) {
        background-color: $bgTableDark;
      }
      &:nth-child(even) {
        background-color: $bgTableLight;
      }
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          .item-order {
            color: $bdcTitle;
          }
        }
      }
      &:hover {
        .item-name {
          width: 96px;
          cursor: pointer;
          text-decoration: underline;
          @include ellipse();
        }
        .item-options {
          display: block;
        }
      }
    }
  }
  .footer {
    position: relative;
    height: 32px;
    padding-right: 32px;
    line-height: 32px;
    font-size: $fontMin;
    background-color: $bgTableDark;
    .show-all {
      float: right;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
