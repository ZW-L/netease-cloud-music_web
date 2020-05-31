<template>
  <div class="recommend">
    <home-carousel class="carousel" />
    <div class="content">
      <div class="content-left">
        <hot-category />
        <new-category />
        <bill-category />
      </div>
      <div class="content-right">
        <aside-group
          :loginInfo="loginInfo"
          :inSingers="homeSinger"
          :hotPlayers="homeHoster"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AsideGroup from '@/components/group/AsideGroup.vue'
import HomeCarousel from './components/HomeCarousel.vue'
import HotCategory from './components/HotCategory.vue'
import NewCategory from './components/NewCategory.vue'
import BillCategory from './components/BillCategory.vue'
import { getToplistDetail } from '~api/get'

export default {
  name: 'recommend-view',
  components: {
    HomeCarousel,
    HotCategory,
    NewCategory,
    BillCategory,
    AsideGroup,
  },
  data() {
    return {
      category: ['入驻歌手', '热门主播'],
      loginInfo: true,
    }
  },
  computed: {
    ...mapGetters(['homeSinger', 'homeHoster']),
  },
  mounted() {
    this.initialData()
  },
  methods: {
    initialData() {
      // 获取排行榜的信息，保存至 store
      getToplistDetail().then(res => {
        const data = res.data.list
        const featureRank = data.slice(0, 4)
        const globalRank = data.slice(4)
        this.$store.commit('UPDATE_FEATURE_RANK', featureRank)
        this.$store.commit('UPDATE_GLOBAL_RANK', globalRank)
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.recommend {
  position: relative;
  .carousel {
    width: 100%;
    height: 285px;
  }
  .content {
    box-sizing: border-box;
    overflow: hidden;
    .content-left {
      box-sizing: border-box;
      float: left;
      width: 730px;
      padding: 20px 20px 40px 20px;
      border-right: 1px solid $bdcDefault;
    }
    .content-right {
      float: left;
      width: 250px;
    }
  }
}
</style>
