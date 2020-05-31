<template>
  <div class="poster">
    <div class="poster-header">
      <div class="poster-header__icon"></div>
      <div class="header-title">
        <h2 class="title-main">
          {{detail.name}}
          <span class="poster-header__mv"></span>
        </h2>
        <h3 v-if="detail.alia.length" class="title-sub">{{detail.alia[0]}}</h3>
      </div>
    </div>
    <div class="poster-desc">
      <p>
        歌手：<a href="">{{singers}}</a>
      </p>
      <p>
        所属专辑：<a href="#" @click="toAlbumView(detail.al.id)">{{detail.al.name}}</a>
      </p>
    </div>
    <div class="poster-btn">
      <btn-bar :detail="detail">
        <span slot="comment">(123)</span>
      </btn-bar>
    </div>
  </div>
</template>

<script>
import BtnBar from '@/components/base/BtnBar.vue'
import { getSingers } from '@/utils/util'

export default {
  props: {
    detail: Object,
  },

  components: {
    BtnBar,
  },

  computed: {
    singers() {
      return getSingers(this.detail.ar)
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.poster {
  .poster-header {
    overflow: hidden;
    &__icon {
      float: left;
      width: 54px;
      height: 24px;
    }
    .header-title {
      float: left;
      margin-left: 10px;
      .title-main {
        height: 32px;
        line-height: 32px;
        font-size: $fontLarge;
        .poster-header__mv {
          display: inline-block;
          width: 21px;
          height: 18px;
        }
      }
      .title-sub {
        height: 17px;
        margin-top: 2px;
        line-height: 17px;
        color: $titleDivide;
        font-size: $fontMinL;
      }
    }
  }
  .poster-desc {
    margin-top: 10px;
    line-height: 25px;
  }
  .poster-btn {
    padding-top: 10px;
  }
}
</style>
