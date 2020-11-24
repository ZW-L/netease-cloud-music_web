<template>
  <div class="container">
    <category-header :title="title" :list="list" :morePath="morePath" />
    <div class="content">
      <ul class="playlist">
        <playlist-card class="item" v-for="(item, i) of playlist" :key="i" :info="item" />
      </ul>
    </div>
  </div>
</template>

<script>
import PlaylistCard from '@/components/base/PlaylistCard.vue'
import CategoryHeader from '@/components/base/CategoryHeader.vue'

export default {
  name: 'hot-category',
  components: {
    PlaylistCard,
    CategoryHeader,
  },
  data() {
    return {
      title: '热门推荐',
      list: ['华语', '流行', '摇滚', '民谣', '电子'],
      morePath: '/discover/playlist',
      playlist: [],
    }
  },
  mounted() {
    this.$api.getPersonalized(8).then(res => {
      this.playlist = this.playlist.concat(res.data.result)
    })
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  .content {
    .playlist {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 140px;
        height: 204px;
        padding-bottom: 30px;
      }
    }
  }
}
</style>
