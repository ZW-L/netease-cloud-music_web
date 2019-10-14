<template>
  <div class="container">
    <div class="wrapper">
      <div class="header">
        <h2 class="header-title">全部</h2>
        <div class="header-category" @click="toggleShowCategory()">
          <span class="header-category-name">选择分类</span>
          <i class="down-arrow-icon"></i>
        </div>
        <div class="header-hot">热门</div>
      </div>
      <div class="category" ref="category">
        <div class="category-header">
          <span class="category-header-all">全部风格</span>
          <i class="category-up-icon"></i>
        </div>
        <div class="category-content">
          <dl v-for="(cate, ci) of categories" :key="ci">
            <dt class="cate-tag">
              <i class="cate-tag-icon"></i>
              <span>{{cate.tag}}</span>
            </dt>
            <dd class="cate-list">
              <span class="cate-item" v-for="(item, i) of cate.list" :key="i">{{item}}</span>
            </dd>
          </dl>
        </div>
        <div class="dd-divide"></div>
      </div>
      <div class="content">
        <playlist-card class="item" 
          v-for="i of 35" :key="i"
        >
          <p>by 
            <a href="">空气很颓废</a>
          </p>
        </playlist-card>
      </div>
      <div class="pagination">
        <span :class="['pagi-prev', { 'pagi-prev-disabled': currentPage === 1 }]" @click="changePage('prev')">
          <i class="iconfont icon-houtui"></i>
          上一页
        </span>
        <span v-for="(page, i) of pageChanges" :key="i"
           :class="['page-item', { 'page-active': page === currentPage, 'paga-ellipsis': page === '...' }]"
           @click="changePage(page)"
        >{{page}}</span>
        <span :class="['pagi-next', { 'pagi-next-disabled': currentPage === pages }]" @click="changePage('next')">
          下一页
          <i class="iconfont icon-qianjin"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue';
import { addSeparator, pageChanges } from '~api/util.js';

export default {
  name: 'playlist-view',

  components: {
    PlaylistCard,
  },

  props: {},

  data() {
    return {
      styles: [
        {
          tag: '语种',
          tagEl: 'lang',
          list: ['华语', '欧美', '日语', '韩语', '粤语',],
        },
        {
          tag: '风格',
          tagEl: 'style',
          list: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul',
                 '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', 'New Age',
                 '古风', '后摇', 'Bossa Nova',],
        },
        {
          tag: '场景',
          tagEl: 'scene',
          list: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧',],
        },
        {
          tag: '情感',
          tagEl: 'emotion',
          list: ['怀旧', '清新', '浪漫', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念',],
        },
        {
          tag: '主题',
          tagEl: 'theme',
          list: ['影视原声', 'ACG', '儿童', '校园', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典',
                 '翻唱', '吉他', '钢琴', '器乐', '榜单', '00后',],
        },
      ],
      display: 'none',
      pages: 38,
      currentPage: 334,
    };
  },

  computed: {
    pageChanges() {
      return pageChanges(this.currentPage, this.pages);
    },
    categories() {
      return this.styles.map(v => {
        const list = addSeparator(v.list);
        return { tag: v.tag, list: list };
      });
    },
  },

  mounted() {
    console.log(this.pageChanges);
  },

  methods: {
    toggleShowCategory() {
      const category = this.$refs.category;
      if (this.display === 'none') {
        category.style.display = 'block';
        this.display = 'block';
      } else {
        category.style.display = 'none';
        this.display = 'none';
      }
    },
    changePage(i) {
      if (i === '...') {
        return;
      }
      if (i === 'prev') {
        if (this.currentPage === 1) 
          return;
        this.currentPage = this.currentPage - 1;        
      } else if (i === 'next') {
        if (this.currentPage === this.pages) 
          return;
        this.currentPage = this.currentPage + 1;        
      } else {
        this.currentPage = i;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.container {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  background-color: $bgDefault;
  .wrapper {
    position: relative;
    padding: 40px;
    .header {
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid $bdcTitle;
      .header-title {
        float: left;
        height: 40px;
        font-size: $fontLarge;
      }
      .header-category {
        float: left;
        height: 26px;
        margin-top: 4px;
        margin-left: 10px;
        padding: 0 10px;
        line-height: 26px;
        border: 2px solid $bdcDefault;
        border-radius: 5px;
        font-size: $fontMin;
        @include hoverText();
        .header-category-name {
          color: $textLinkBlue;
        }
        .down-arrow-icon {
          float: right;
          width: 8px;
          height: 5px;
          margin-left: 5px;
          margin-top: 10px;
          background: url('../../../../public/img/icons/icon.png') no-repeat -70px -543px;
        }
      }
      .header-hot {
        float: right;
        margin-top: 2px;
        width: 46px;
        height: 29px;
        background: url('../../../../public/img/icons/button.png') no-repeat 0 0;
        border-radius: 3px;
        line-height: 29px;
        text-align: center;
        font-size: $fontMin;
        color: $textLight;
      }
    }
    .category {
      display: none;
      z-index: 99;
      position: absolute;
      left: 10px;
      top: 90px;
      width: 700px;
      background-color: #fff;
      border: 1px solid $bdcDefault;
      border-radius: 5px;
      box-shadow: 0px -1px 10px $bdcDefault, 1px 0px 10px $bdcDefault,
                  0px 1px 10px $bdcDefault, -1px 0px 10px $bdcDefault;
      .category-header {
        position: relative;
        height: 40px;
        margin: 0 30px;
        .category-header-all {
          line-height: 50px;
          padding: 3px 10px;
          background-color: $bgContent;
          border: 1px solid $bdcDefault;
          border-radius: 3px;
          font-size: $fontMin;
          @include hoverText();
        }
        .category-up-icon {
          display: inline-block;
          position: absolute;
          top: -11px;
          left: 85px;
          width: 24px;
          height: 11px;
          background: url('../../../../public/img/icons/iconall.png') no-repeat -48px 0;
        }
      }
      .category-content {
        margin-top: 10px;
        padding: 0 30px 20px;
        background-color: $bgContent;
        border-top: 1px solid $bdcDefault;
        dl {
          overflow: hidden;
          font-size: $fontMin;
          .cate-tag {
            float: left;
            width: 70px;
            height: 28px;
            margin: 0 -100px 0 0;
            padding-top: 15px;
            font-weight: bold;
            // background-color: #ccc;
            .cate-tag-icon {
              float: left;
              width: 23px;
              height: 23px;
              margin-top: -6px;
              margin-right: 10px;
            }
          }
          .cate-list {
            float: left;
            margin-left: 80px;
            padding: 8px 15px 0;
            line-height: 24px;
            .cate-item {
              float: left;
              margin-right: 10px;
              white-space: nowrap;
              color: $titleMain;
              @include hoverText();
              &:nth-child(even) {
                color: $homeDefault;
              }
            }
          }
          &:nth-child(1) {
            .cate-tag-icon {
              background: url('../../../../public/img/icons/icon.png') no-repeat -20px -735px;
            }
          }
          &:nth-child(2) {
            .cate-tag-icon {
              background: url('../../../../public/img/icons/icon.png') no-repeat 0 -60px;
            }
          }
          &:nth-child(3) {
            .cate-tag-icon {
              background: url('../../../../public/img/icons/icon.png') no-repeat 0px -88px;
            }
          }
          &:nth-child(4) {
            .cate-tag-icon {
              background: url('../../../../public/img/icons/icon.png') no-repeat 0px -117px;
            }
          }
          &:nth-child(5) {
            .cate-tag-icon {
              background: url('../../../../public/img/icons/icon.png') no-repeat 0px -141px;
            }
          }
        }
      }
      .dd-divide {
        position: absolute;
        top: 50px;
        left: 110px;
        bottom: 0;
        width: 1px;
        background-color: $bdcDefault;
      }
    }
    .content {
      overflow: hidden;
      .item {
        float: left;
        margin-left: 50px;
        margin-top: 30px;
        &:nth-child(5n + 1) {
          margin-left: 0;
        }
      }
    }
    .pagination {
      height: 26px;
      margin: 50px 0;
      font-size: $fontMin;
      text-align: center;
      .pagi-prev, .pagi-next {
        display: inline-block;
        height: 24px;
        padding: 0 10px;
        line-height: 24px;
        background-color: $bgTableDark;
        border: 1px solid $bdcDefault;
        border-radius: 3px;
        .iconfont {
          font-weight: bold;
          font-size: $fontMin;
        }
        &:hover {
          cursor: pointer;
          background-color: $bgTableLight;
          .iconfont {
            color: $homeDefault;
          }
        }
      }
      .pagi-prev-disabled,  .pagi-next-disabled{
        color: $titleDivide;
        &:hover {
          cursor: not-allowed;
          background-color: $bgTableDark;
        }
      }
      .pagi-next {
        margin-left: 10px;
      }
      .page-item {
        display: inline-block;
        height: 22px;
        padding: 0 8px;
        margin-left: 10px;
        border: 1px solid $bdcDefault;
        border-radius: 3px;
        line-height: 22px;
        &:hover {
          cursor: pointer;
          border: 1px solid $bdcDark;
        }
      }
      .paga-ellipsis {
        padding: 0;
        border: 1px solid $bdcLight;
        &:hover {
          cursor: default;
          border: 1px solid $bdcLight;
        }
      }
      .page-active {
        color: $textLight;
        background-color: $bgPaginationActive;
        &:hover {
          cursor: default;
          border: 1px solid $bdcDefault;
        }
      }
    }
  }
}
</style>