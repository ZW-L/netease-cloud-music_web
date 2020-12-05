<template>
  <div class="poster">
    <div class="poster-img">
      <div class="img-wrapper">
        <img v-show="detail.coverImgUrl" :src="detail.coverImgUrl+'?param=200y200'">
      </div>
    </div>
    <div class="poster-info">
      <div class="info-header">
        <div class="poster-info__header-icon"></div>
        <h2 class="header-title">{{detail.name}}</h2>
      </div>
      <p class="info-create">
        <span class="create-item ctor-pic">
          <img :src="creatorPic">
        </span>
        <a href="#" class="create-item ctor-name">{{creatorName}}</a>
        <span class="create-item create-time">
          <em>{{createTime}}</em> 创建
        </span>
      </p>
      <div class="info-btn">
        <btn-bar v-on="$listeners">
          <span slot="collect">({{detail.subscribedCount}})</span>
          <span slot="share">({{detail.shareCount}})</span>
          <span slot="comment">({{detail.commentCount}})</span>
        </btn-bar>
      </div>
      <div class="info-tag">
        <span class="tag-name">标签：</span>
        <span class="tag-item" v-for="(tag, i) of detail.tags" :key="i">{{tag}}</span>
      </div>
      <div class="info-desc">
        介绍：
        <p class="desc-item" v-for="(item, i) of desc" :key="i">{{item}}</p>
      </div>
      <p v-show="shortDesc.length !== fullDesc.length"
        class="desc-ctrl"
        @click="handleShowAll">
          <em v-if="!showAll" class="ctrl-text">展开</em>
          <em v-else class="ctrl-text">收起</em>
          <i :class="['ctrl-icon', showAll ? 'ctrl-icon--down' : 'ctrl-icon--up']"></i>
      </p>
    </div>
  </div>
</template>

<script>
import BtnBar from '@/components/base/BtnBar.vue'
import { dateFormat } from '@/utils/util'

export default {
  components: {
    BtnBar,
  },
  props: {
    detail: Object,
  },
  data() {
    return {
      showAll: false, // 是否显示全部歌单介绍
    }
  },
  computed: {
    // todo: 优化数据处理方式
    creatorPic() {
      return this.detail.creator ? `${this.detail.creator.avatarUrl}?param=40y40` : ''
    },
    creatorName() {
      return this.detail.creator ? this.detail.creator.nickname : ''
    },
    createTime() {
      return this.detail.createTime ? dateFormat(this.detail.createTime) : '1970-01-01'
    },
    shortDesc() {
      if (!this.detail.desc) return ''
      if (this.detail.desc.length <= 100) {
        return this.fullDesc
      }
      return this.detail.desc.slice(0, 97).concat('...').split('\n')
    },
    fullDesc() {
      if (!this.detail.desc) return ''
      return this.detail.desc.split('\n').concat('')
    },
    desc() {
      return this.showAll ? this.fullDesc : this.shortDesc
    },
  },
  methods: {
    handleShowAll() {
      this.showAll = !this.showAll
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.poster {
  overflow: hidden;
  width: 640px;
  margin-bottom: 30px;
  .poster-img {
    float: left;
    .img-wrapper {
      padding: 3px;
      img {
        width: 100%;
      }
      border: 1px solid #ccc;
    }
  }
  .poster-info {
    float: left;
    width: 400px;
    margin-left: 25px;
    font-size: $fontMin;
    .info-header {
      overflow: hidden;
      line-height: 32px;
      .poster-info__header-icon {
        float: left;
        width: 72px;
        height: 24px;
        margin-top: 4px;
      }
      .header-title {
        float: left;
        width: 320px;
        margin-left: 5px;
        font-size: $fontMiddle;
      }
    }
    .info-create {
      height: 35px;
      line-height: 35px;
      margin: 5px 0;
      .create-item {
        float: left;
      }
      .ctor-pic {
        width: 35px;
        height: 35px;
        img {
          width: 35px;
        }
      }
      .ctor-name {
        margin-left: 10px;
      }
      .create-time {
        margin-left: 15px;
      }
    }
    .info-btn {
      padding-top: 10px;
    }
    .info-tag {
      margin: 10px 0 5px 0;
      .tag-item {
        display: inline-block;
        margin-right: 10px;
        height: 22px;
        line-height: 22px;
        padding: 2px 6px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
    }
    .info-desc {
      margin-top: 4px;
      line-height: 18px;
      color: $info;
      .desc-item {
        margin-bottom: 15px;
      }
    }
    .desc-ctrl {
      float: right;
      &:hover {
        cursor: pointer;
      }
      .ctrl-text {
        color: $textLinkBlueLight;
      }
      .ctrl-icon {
        display: inline-block;
        width: 11px;
        height: 8px;
        margin-left: 5px;
      }
    }
  }
}
</style>
