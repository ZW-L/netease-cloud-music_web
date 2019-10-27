<template>
  <div class="container">
    <div class="wrapper">
      <div class="header">
        <h2 class="header-title">{{cate}}</h2>
        <div class="header-category" @click="toggleShowCategory()">
          <span class="header-category-name">选择分类</span>
          <i class="down-arrow-icon"></i>
        </div>
        <div class="header-hot">热门</div>
      </div>
      <div class="category" ref="category">
        <div class="category-header">
          <span class="category-header-all"
            @click="toChangeCategory('全部')"
          >全部风格</span>
          <i class="category-up-icon"></i>
        </div>
        <div class="category-content">
          <dl v-for="(cate, ci) of categoryList" :key="ci">
            <dt class="cate-tag">
              <i class="cate-tag-icon"></i>
              <span>{{cate.name}}</span>
            </dt>
            <dd class="cate-list">
              <span v-for="(item, i) of cate.subs" :key="i"
                class="cate-item"
                @click="toChangeCategory(item)"
              >{{item}}</span>
            </dd>
          </dl>
        </div>
        <div class="dd-divide"></div>
      </div>
      <div class="content">
        <playlist-card class="item"
          v-for="(item, i) of playlists" :key="i"
          :info="item"
          :titleEllipsis="titleEllipsis"
        >
          <p class="slot-creator">
            <em class="creator-by">by</em>
            <a href="" class="creator-name">{{item.creator.nickname}}</a>
          </p>
        </playlist-card>
      </div>
      <base-pagination 
        :pages="pages"
        @changePage="handleChangePage"
      ></base-pagination>
    </div>
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue';
import BasePagination from '@/components/base/pagination.vue';
import { addSeparator, pageChanges } from '~api/util.js';
import { getCategoryList, getCategoryBy } from '~api/get.js';
import { boxOffsetLeft, boxOffsetTop } from '~api/dom.js';

export default {
  name: 'playlist-view',

  components: {
    PlaylistCard,
    BasePagination,
  },

  props: {},

  data() {
    return {
      titleEllipsis: true, // 歌单组件参数，单行标题
      categoryList: [], // 歌单分类信息
      playlists: [], // 获取的歌单列表
      display: 'none',
      pages: 38, // 歌单页数
      cate: '全部', // 当前的分类
      sub: '', // 当前的子分类
      length: 35, // 每页的歌单总数/偏移
    };
  },

  computed: {
    // 一个 x 和 y 的区间，超过这个区间外的位置会隐藏歌单分类选项
    outerArea() {
      const cate = this.$refs.category;
      const offsetX = boxOffsetLeft(cate);
      const offsetY = boxOffsetTop(cate);
      const width = cate.clientWidth;
      const height = cate.clientHeight;
      return {
        sectionX: [offsetX, offsetX + width],
        sectionY: [offsetY, offsetY + height],
      };
    },
  },

  mounted() {
    this.handleGetData();
    // 添加全局事件监听，这里是事件捕获，如果是冒泡的话点击 "选择分类" 时由于 click 冒泡会触发这个事件
    window.addEventListener('click', this.hideCategory, true);
  },

  beforeDestroy() {
    // 取消全局事件监听
    window.removeEventListener('click', this.hideCategory, true);
  },

  methods: {
    // 隐藏歌单分类选项
    hideCategory() {
      // 只有当歌单分类选项处于显示的情况下才响应时间
      if (this.display === 'none') {
        return ;
      }
      console.log('click event catch by window!');
      const ex = event.pageX;
      const ey = event.pageY;
      if (ex < this.outerArea.sectionX[0] || ex > this.outerArea.sectionX[1] || 
          ey < this.outerArea.sectionY[0] || ey > this.outerArea.sectionY[1]) {
        this.$refs.category.style.display = 'none';
        this.display = 'none';
      }
    },
    // 显示歌单分类选项
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
    handleGetData() {
      // 获取歌单分类信息
      getCategoryList().then(res => {
        // console.log(res.data);
        // this.categoryList = res.data;
        this.categoryList = this._toClassify(res.data);
      }).catch(err => {
        console.log(err);
      });
      // 获取默认分类(全部风格)
      getCategoryBy(this.cate).then(res => {
        // console.log(res.data.playlists);
        this.playlists = res.data.playlists;
      }).catch(err => {
        console.log(err);
      });
    },
    // 切换页码时
    handleChangePage(page) {
      this.playlists = [];
      const offset = (page - 1) * this.length;
      getCategoryBy(this.cate, offset, this.length).then(res => {
        // console.log(res.data.playlists);
        this.playlists = res.data.playlists;
      }).catch(err => {
        console.log(err);
      });
    },
    // 切换分类
    toChangeCategory(cate) {
      this.playlists = [];
      this.cate = cate;
      // console.log(this.cate, this.playlists);
      this.toggleShowCategory();
      getCategoryBy(this.cate).then(res => {
        // console.log(res.data.playlists);
        this.playlists = res.data.playlists;
      }).catch(err => {
        console.log(err);
      });
    },
    // 将得到的分类信息格式化
    _toClassify(cate) {
      const sub = cate.sub;
      const ret = Object.values(cate.categories).map((v, i) => {
        let subs = sub.filter(sv => sv.category === i).map(smv => smv.name);
        subs = addSeparator(subs);
        return { name: v, subs, };
      });
      return ret;
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
        .slot-creator {
          font-size: $fontMin;
          @include ellipse();
          .creator-by {
            margin-right: 5px;
            color: $titleDivide;
          }
          .creator-name {
            color: $titleMore;            
          }
        }
      }
    }
  }
}
</style>