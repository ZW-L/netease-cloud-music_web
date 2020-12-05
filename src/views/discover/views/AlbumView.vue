<template>
  <div class="album">
    <div class="header">
      <h2 class="header-title">热门新碟</h2>
    </div>
    <div class="content hot">
      <div class="content-item" v-for="(item, i) of newest" :key="i">
        <new-disc-card :album="item" size="lg" ttSize="m" />
      </div>
    </div>
    <div class="header">
      <h2 class="header-title">全部新碟</h2>
      <ul class="header-cate">
        <li class="header-cate-item" v-for="(item, i) of allCates" :key="i">{{item}}</li>
      </ul>
    </div>
    <div class="content all">
      <div class="content-item" v-for="(item, i) of newestAll" :key="i">
        <new-disc-card :album="item" size="lg" ttSize="m" />
      </div>
    </div>
    <base-pagination @changePage="handleChangePage" :pages="15" />
  </div>
</template>

<script>
import BasePagination from '@/components/base/pagination.vue'
import NewDiscCard from '@/components/base/NewDiscCard.vue'
import { addSeparator } from '@/utils/util'

export default {
  name: 'album-view',
  components: { BasePagination, NewDiscCard, },
  data() {
    return {
      cates: ['全部', '华语', '欧美', '日本'],
      newest: [],
      newestAll: [],
      limit: 35,
    }
  },
  computed: {
    allCates() {
      return addSeparator(this.cates)
    },
  },
  mounted() {
    this.handleGetData()
  },
  methods: {
    // 提取 albums 的关键数据
    extractAlbums(albums) {
      return albums.map(v => ({
        name: v.name,
        picUrl: `${v.picUrl}?param=130x130`,
        id: v.id,
        artists: v.artists,
      }))
    },
    handleGetData() {
      // 热门新碟
      this.$api.getNewest().then(res => {
        const { albums } = res.data
        this.newest = this.extractAlbums(albums.slice(0, 10))
      }).catch(console.log)
      // 全部热门新碟
      this.$api.getTopAlbum().then(res => {
        const { albums } = res.data
        console.log(res)
        this.newestAll = this.extractAlbums(albums)
      }).catch(console.log)
    },
    handleChangePage(page) {
      // 将视图清空(会导致子组件全部销毁，应该显示其他信息，这样不用销毁组件？)
      this.newestAll = []
      const offset = (page - 1) * this.limit
      this.$api.getTopAlbum(offset).then(res => {
        const { albums } = res.data
        this.newestAll = this.extractAlbums(albums)
      }).catch(console.log)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.album {
  box-sizing: border-box;
  padding: 40px;
  .header {
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid $bdcTitle;
    .header-title {
      float: left;
      font-size: $fontLarge;
    }
    .header-cate {
      float: left;
      margin-left: 20px;
      margin-top: 5px;
      font-size: $fontMin;
      color: $inputInfo;
      .header-cate-item {
        float: left;
        &:nth-child(even) {
          margin: 0 10px;
        }
      }
    }
  }
  .content {
    overflow: hidden;
    margin-top: 20px;
    .content-item {
      float: left;
      margin: 0 27px 20px 0;
    }
  }
}
</style>
