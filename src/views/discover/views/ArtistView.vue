<template>
  <div class="ar">
    <aside class="ar-sidebar">
      <div class="cate" v-for="cate of singerCate" :key="cate.title">
        <h4 class="cate-title">{{cate.title}}</h4>
        <ul class="cate-list">
          <li class="cate-item"
            v-for="item of cate.list" :key="item.name"
            @click="handleChangeCate(item.name, item.id)"
          >{{item.name}}</li>
        </ul>
      </div>
    </aside>
    <section class="ar-content">
      <div class="ar-content-header">
        <h4 class="header-title">{{activeCate}}</h4>
        <span class="header-more" v-show="isHeaderMore">更多 &gt;</span>
      </div>
      <alphabet-cate :reset="reset" @getArtistList="getArtistList(catId, $event)" />
      <div class="ar-content-main">
        <div class="main-top10">
          <div class="main-top10-item" v-for="(ar, index) of artists.slice(0, 10)" :key="index">
            <a href="#" :title="`${ar.name}的音乐`">
              <img :src="`${ar.picUrl}?param=130y130`" :alt="`${ar.name}的音乐`" class="item-pic">
            </a>
            <p class="item-info">
              <span class="item-info-name">{{ar.name}}</span>
              <span class="item-info-home" v-show="ar.accountId"></span>
            </p>
          </div>
        </div>
        <div class="main-list">
          <div class="main-list-item" v-for="(ar, index) of artists.slice(10)" :key="index">
            <span class="main-list-item-name">{{ar.name}}</span>
            <a href="#">
              <span class="main-list-item-home" v-show="ar.accountId"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AlphabetCate from '@/components/base/AlphabetCate.vue'
// import CategoryHeader from '@/components/base/CategoryHeader.vue'
import { getArtistCate } from '~api/get'

export default {
  name: 'artist-view',
  components: {
    // CategoryHeader,
    AlphabetCate,
  },
  props: {},
  data() {
    return {
      singerCate: [
        {
          title: '推荐',
          list: [
            { name: '推荐歌手', id: 1001 },
            { name: '入驻歌手', id: 5001 },
          ],
        },
        {
          title: '华语',
          list: [
            { name: '华语男歌手', id: 1001 },
            { name: '华语女歌手', id: 1002 },
            { name: '华语组合/乐队', id: 1003 },
          ],
        },
        {
          title: '欧美',
          list: [
            { name: '欧美男歌手', id: 2001 },
            { name: '欧美女歌手', id: 2002 },
            { name: '欧美组合/乐队', id: 2003 },
          ],
        },
        {
          title: '日本',
          list: [
            { name: '日本男歌手', id: 6001 },
            { name: '日本女歌手', id: 6002 },
            { name: '日本组合/乐队', id: 6003 },
          ],
        },
        {
          title: '韩国',
          list: [
            { name: '韩国男歌手', id: 7001 },
            { name: '韩国女歌手', id: 7002 },
            { name: '韩国组合/乐队', id: 7003 },
          ],
        },
        {
          title: '其他',
          list: [
            { name: '其他男歌手', id: 4001 },
            { name: '其他女歌手', id: 4002 },
            { name: '其他组合/乐队', id: 4003 },
          ],
        },
      ],
      activeCate: '', // 当前选中的分类
      artists: [],
      catId: '',
      reset: false, // 通知子组件更新
    }
  },
  computed: {
    isHeaderMore() {
      return this.activeCate === '推荐歌手'
    },
  },
  methods: {
    handleChangeCate(cate, catId) {
      this.activeCate = cate
      this.reset = !this.reset
      if (catId === 5001) {
        this.getArtistList(catId, '', 50)
      } else {
        this.getArtistList(catId)
      }
    },
    getArtistList(catId, initial = '', limit = 100) {
      getArtistCate(catId, initial, limit).then(res => {
        console.log(res.data)
        this.catId = catId
        this.artists = res.data.artists
      }).catch(err => {
        console.log(err)
      })
    },
  },

}
</script>

<style lang="scss" scoped>
.ar {
  overflow: hidden;
  box-sizing: border-box;
  width: 982px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .ar-sidebar {
    box-sizing: border-box;
    float: left;
    width: 180px;
    padding-top: 50px;
    .cate {
      padding-left: 20px;
      .cate-title {
        margin: 10px 0;
        font-size: 16px;
        font-weight: bold;
      }
      .cate-list {
        margin-left: 20px;
        list-style: square;
        .cate-item {
          padding: 6px 0;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .ar-content {
    box-sizing: border-box;
    position: relative;
    float: left;
    width: 800px;
    min-height: 1000px;
    padding: 40px;
    border-left: 1px solid #ccc;
    .ar-content-header {
      height: 40px;
      margin-bottom: 20px;
      line-height: 40px;
      border-bottom: 2px solid rgb(194, 12, 12);
      .header-title {
        float: left;
        font-size: 24px;
      }
      .header-more {
        float: right;
        font-size: 12px;
      }
    }
    .ar-content-main {
      margin-top: 20px;
      .main-top10 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .main-top10-item {
          width: 130px;
          height: 154px;
          margin-bottom: 20px;
          .item-pic {
            width: 100%;
          }
          .item-info {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            &-name {}
            &-home {
              float: right;
              width: 17px;
              height: 18px;
              margin-top: 6px;
              background-image: url('../../../../public/img/icons/icon.png');
              background-position: 0 -740px;
            }
          }
        }
      }
      .main-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        &-item {
          overflow: hidden;
          width: 130px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          &-name {
            float: left;
          }
          &-home {
            float: left;
            width: 17px;
            height: 18px;
            margin-top: 6px;
            margin-left: 3px;
            background-image: url('../../../../public/img/icons/icon.png');
            background-position: 0 -740px;
          }
        }
      }
    }
  }
}
</style>
