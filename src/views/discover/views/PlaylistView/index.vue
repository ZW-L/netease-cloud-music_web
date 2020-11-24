<template>
  <div class="playlist">
    <div class="header">
      <h2 class="header-title">{{cate}}</h2>
      <div class="header-category" ref="select"
        @click="toggleShowCategory" >
        <span class="header-category-name">选择分类</span>
        <i class="playlist__down-arrow-icon"></i>
      </div>
      <div class="playlist__header-hot">热门</div>
    </div>
    <!-- 歌单分类组件 -->
    <playlist-category v-show="showCategory" ref="category"
      :categories="categories"
      :cate="cate"
      @hideCategory="hideCategory" />
    <!-- 内容区域 -->
    <div class="content">
      <playlist-card class="item"
        v-for="(item, i) of playlists" :key="i"
        :info="item"
        :titleEllipsis="titleEllipsis" >
        <p class="slot-creator">
          <em class="creator-by">by</em>
          <a class="creator-name" @click="handleShowAbout()">{{item.creator.nickname}}</a>
        </p>
      </playlist-card>
    </div>

    <base-pagination
      :pages="pages"
      @changePage="handleChangePage" />
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue'
import BasePagination from '@/components/base/pagination.vue'
import PlaylistCategory from './components/PlaylistCategory.vue'
import { boxOffsetLeft, boxOffsetTop, isChild } from '@/utils/dom'
import { addSeparator } from '@/utils/util'

export default {
  name: 'playlist-view',
  components: {
    PlaylistCard,
    PlaylistCategory,
    BasePagination,
  },
  data() {
    return {
      showCategory: false, // 显示分类
      titleEllipsis: true, // 歌单组件参数，单行标题
      categories: [], // 歌单分类信息
      playlists: [], // 获取的歌单列表
      pages: 38, // 歌单页数
      sub: '', // 当前的子分类
      length: 35, // 每页的歌单总数/偏移
      isOuterArea: false, // 确保只对 outerArea 求值一次
      outerArea: { // 分类组件的坐标区间
        rangeX: [0, 0],
        rangeY: [0, 0],
      },
    }
  },
  computed: {
    cate () {
      return this.$route.query.cate || '全部'
    },
  },
  mounted() {
    this.initialData()
    // 添加全局事件监听(事件捕获)，这样不会阻止歌单的点击
    window.addEventListener('click', this.handleClickOuter, true)
  },
  beforeDestroy() {
    // 删除全局事件监听
    window.removeEventListener('click', this.handleClickOuter, true)
  },
  methods: {
    initialData () {
      // 获取歌单分类信息
      this.$api.getPlaylistCatlist().then(res => {
        const { data } = res
        this.categories = this.toClassify(data)
      })
      // 获取默认分类(全部风格)
      this.getPlaylists()
    },
    getPlaylists () {
      this.$api.getTopPlaylist({ cat: this.cate }).then(res => {
        this.playlists = [].concat(res.data.playlists)
      })
    },
    getOuterArea() {
      const cate = this.$refs.category.$el
      // bug：修改了 showCategory 为 true后，组件的 display 属性依然为 none
      // 解决方法为手动设置其 display 属性为 block
      cate.style.display = 'block'
      const offsetX = boxOffsetLeft(cate)
      const offsetY = boxOffsetTop(cate)
      const width = cate.clientWidth
      const height = cate.clientHeight
      this.$set(this.outerArea, 'rangeX', [offsetX, offsetX + width])
      this.$set(this.outerArea, 'rangeY', [offsetY, offsetY + height])
      this.isOuterArea = true
    },
    toggleShowCategory() {
      this.showCategory = !this.showCategory
      // 确保 outerArea 只会求值一次
      if (!this.isOuterArea && this.showCategory) {
        console.log('calculating outerArea.')
        this.getOuterArea()
      }
    },
    // 隐藏歌单分类选项
    hideCategory() {
      this.showCategory = false
    },
    handleClickOuter(event) {
      // 歌单分类未打开时
      if (!this.showCategory) {
        return
      }
      // 点击了选择分类按钮时
      if (isChild(this.$refs.select, event.target)) {
        return
      }
      // 点击区域在 outerArea 外时
      const ex = event.pageX
      const ey = event.pageY
      if (ex < this.outerArea.rangeX[0] || ex > this.outerArea.rangeX[1]
        || ey < this.outerArea.rangeY[0] || ey > this.outerArea.rangeY[1]) {
        console.log('hide category...')
        this.hideCategory()
      }
    },
    // 切换页码时
    handleChangePage(page) {
      const offset = (page - 1) * this.length
      this.$api.getTopPlaylist({ cat: this.cate, offset, limit: this.length}).then(res => {
        this.playlists = [].concat(res.data.playlists)
      })
    },
    // 将得到的分类信息格式化
    toClassify(cate) {
      const { sub } = cate
      const ret = Object.values(cate.categories).map((v, i) => {
        let subs = sub.filter(sv => sv.category === i).map(smv => smv.name)
        subs = addSeparator(subs)
        return { name: v, subs }
      })
      return ret
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route' (to, from) {
      this.getPlaylists()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.playlist {
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
      .playlist__down-arrow-icon {
        float: right;
        width: 8px;
        height: 5px;
        margin-left: 5px;
        margin-top: 10px;
      }
    }
    .playlist__header-hot {
      float: right;
      margin-top: 2px;
      width: 46px;
      height: 29px;
      border-radius: 3px;
      line-height: 29px;
      text-align: center;
      font-size: $fontMin;
      color: $textLight;
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
</style>
