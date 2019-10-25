<template>
  <div class="album">
    <div class="header">
      <h2 class="header-title">热门新碟</h2>
    </div>
    <div class="content hot">
      <div class="content-item" v-for="(item, i) of newest" :key="i">
        <new-disc-card :album="item" size="lg" ttSize="m"></new-disc-card>
      </div>
    </div>
    <div class="header">
      <h2 class="header-title">热门新碟</h2>
      <ul class="header-cate">
        <li class="header-cate-item" v-for="(item, i) of allCates" :key="i">{{item}}</li>
      </ul>
    </div>
    <div class="content all">
      <div class="content-item" v-for="(item, i) of newestAll" :key="i">
        <new-disc-card :album="item" size="lg" ttSize="m"></new-disc-card>
      </div>
    </div>
    <base-pagination 
      @changePage="handleChangePage"
      :pages="15"
    ></base-pagination>
  </div>
</template>

<script>
import BasePagination from '@/components/base/pagination.vue';
import NewDiscCard from '@/components/base/NewDiscCard.vue';
import { addSeparator } from '~api/util.js';
import { getNewest, getNewestAll } from '~api/get.js';

export default {
  name: 'album-view',

  components: {
    BasePagination,
    NewDiscCard,
  },

  data() {
    return {
      cates: ['全部', '华语', '欧美', '日本'],
      album: {
        picUrl: 'http://p4.music.126.net/HeGrAKPiZhKkONiFDxZvmw==/109951164384346866.jpg?param=130y130',
        name: '我和我的祖国',
        artist: {
          name: '王菲',
        },
      },
      newest: [],
      newestAll: [],
      limit: 35,
    };
  },

  computed: {
    allCates() {
      return addSeparator(this.cates);
    },
  },

  mounted() {
    this.handleGetData();
  },

  methods: {
    // 提取 albums 的关键数据
    _extractAlbums(albums) {
      return albums.map(v => ({
        name: v.name,
        picUrl: `${v.picUrl}?param=130x130`,
        id: v.id,
        artists: v.artists,
      }));
    },
    handleGetData() {
      // 热门新碟
      getNewest().then(res => {
        // console.log(res.data.albums);
        this.newest = this._extractAlbums(res.data.albums.slice(0, 10));
        // console.log(this.newest);
      }).catch(err => {
        console.log(err);
      });
      // 全部热门新碟
      getNewestAll().then(res => {
        // console.log(res.data.albums);
        this.newestAll = this._extractAlbums(res.data.albums);
        // console.log(this.newestAll);
      }).catch(err => {
        console.log(err);
      });
    },
    handleChangePage(page) {
      // 将视图清空(会导致子组件全部销毁，应该显示其他信息，这样不用销毁组件？)
      this.newestAll = [];
      const offset = (page-1) * this.limit;
      getNewestAll(offset).then(res => {
        console.log(res.data.albums);
        this.newestAll = this._extractAlbums(res.data.albums);
        // console.log(this.newestAll);
      }).catch(err => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';

.album {
  box-sizing: border-box;
  width: 982px;
  margin: 0 auto;
  padding: 40px;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  background-color: $bgDefault;
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