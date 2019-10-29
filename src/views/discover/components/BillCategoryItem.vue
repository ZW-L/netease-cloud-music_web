<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <img class="left-pic" :src="coverImgUrl" alt="">
        <a href="#" class="left-link" @click="toToplistView()">
        </a>
      </div>
      <div class="header-right">
        <div class="right-title">
          <a href="#" @click="toToplistView()">{{name}}</a>
        </div>
        <div class="right-options">
          <span class="option-play" @click="playAll()"></span>
          <span class="option-addall"></span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, i) of list" :key="i">
        <span class="item-order">{{i+1}}</span>
        <a class="item-name" @click="toSongView(item)">{{item.name}}</a>
        <div class="item-opt">
          <span class="opt opt-play" @click="handleToPlay(item)"></span>
          <span class="opt opt-add" @click="handleAdd(item)"></span>
          <span class="opt opt-collect"></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <a class="show-all" @click="toToplistView()">查看全部&gt;</a>
    </div>
  </div>
</template>

<script>
import { getBillboard } from  '@/api/get.js';
import { toPlay } from '~api/control.js';
import { mapGetters } from 'vuex';

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
    this.initialData();
  },

  methods: {
    initialData() {
      const idx = this.toIdx[`id_${this.id}`];
      getBillboard(idx).then(res => {
        const playlist = res.data.playlist;
        this.name = playlist.name;
        this.coverImgUrl = playlist.coverImgUrl;
        this.list = playlist.tracks.slice(0, 10);
      });
    },
    toSongView(item) {
      this.$router.push({ path: '/song', query: { id: item.id }});
    },
    toToplistView() {
      this.$router.push({ path: '/discover/toplist', query: { id: this.id }});
    },
    handleToPlay(item) {
      this.$store.dispatch('toPlay', item);
    },
    handleAdd(item) {
      this.$store.dispatch('addToPlaylist', item);
    },
    playAll() {
      const idx = this.toIdx[`id_${this.id}`];
      getBillboard(idx).then(res => {
        const playlist = res.data.playlist.tracks;
        this.$store.dispatch('changePlaylist', playlist);
      });
    },
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.container {
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
      .left-link {
        position: absolute;
        width: 80px;
        height: 80px;
        left: 0;
        background: url('../../../../public/img/icons/coverall.png') no-repeat -145px -57px;
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
        .option-play {
          background: url('../../../../public/img/icons/index.png') no-repeat -267px -205px;
          &:hover {
            cursor: pointer;
            background: url('../../../../public/img/icons/index.png') no-repeat -267px -235px;
          }
        }
        .option-addall {
          background: url('../../../../public/img/icons/index.png') no-repeat -300px -205px;
          &:hover {
            cursor: pointer;
            background: url('../../../../public/img/icons/index.png') no-repeat -300px -235px;
          }
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
      .item-opt {
        display: none;
        position: absolute;
        width: 75px;
        right: 0;
        top: 0;
        bottom: 0;
        .opt {
          float: left;
          width: 17px;
          height: 17px;
        }
        .opt-play {
          margin-top: 8px;
          margin-right: 8px;
          background: url('../../../../public/img/icons/index.png') no-repeat -267px -268px;
          &:hover {
            background: url('../../../../public/img/icons/index.png') no-repeat -267px -288px;
          }
        }
        .opt-add {
          margin-top: 10px;
          margin-right: 6px;
          background: url('../../../../public/img/icons/icon.png') no-repeat 0 -700px;
          &:hover {
            background: url('../../../../public/img/icons/icon.png') no-repeat -22px -700px;
          }
        }
        .opt-collect {
          margin-top: 8px;
          margin-right: 10px;
          background: url('../../../../public/img/icons/index.png') no-repeat -297px -268px;
          &:hover {
            background: url('../../../../public/img/icons/index.png') no-repeat -297px -288px;
          }
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
        .item-opt {
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
