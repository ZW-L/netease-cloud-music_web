<template>
  <div class="poster">
    <div class="wrapper">
      <img :src="info.coverImgUrl" alt="">
    </div>
    <div class="desc">
      <div class="title">{{info.name}}</div>
      <div class="info">
        <i class="info-icon"></i>
        <span class="info-update">最近更新：{{time}}</span>
        <span class="info-frequency">（{{updateFrequency}}）</span>
      </div>
      <div class="btn">
        <btn-bar>
          <span slot="collect">({{info.subscribedCount}})</span>
          <span slot="share">({{info.shareCount}})</span>
          <span slot="comment">({{info.commentCount}})</span>
        </btn-bar>
      </div>
    </div>
  </div>
</template>

<script>
import BtnBar from '@/components/base/BtnBar.vue';
import { getMonthAndDay } from '~api/util.js';

export default {
  name: 'rank-list-poster',

  components: {
    BtnBar,
  },

  props: {
    info: {
      type: Object,
    },
    updateFrequency: {
      type: String,
      default: '每天更新',
    },
  },

  computed: {
    time() {
      return getMonthAndDay(this.info.updateTime);
    }
  },
}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';
@import '~css/mixins.scss';

.poster {
  position: relative;
  padding: 40px;
  .wrapper {
    float: left;
    box-sizing: border-box;
    width: 158px;
    height: 158px;
    padding: 3px 0 0 3px;
    border: 1px solid $textInfoLight;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .desc {
    margin-left: 187px;
    width: 473px;
    height: 113px;
    margin-top: 15px;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: $fontMiddle;
    }
    .info {
      margin-top: 5px;
      height: 13px;
      line-height: 13px;
      font-size: $fontMin;
      .info-icon {
        float: left;
        width: 13px;
        height: 13px;
        background: url('../../../public/img/icons/icon.png') no-repeat -18px -682px;
      }
      .info-update {
        margin-left: 5px;
      }
      .info-frequency {
        margin-left: 5px;
        color: $textLinkDefault;
      }
    }
    .btn {
      margin-top: 30px;
    }
  }
}
</style>