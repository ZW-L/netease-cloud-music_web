<template>
  <div class="discover">
    <div class="about-btn" @click="handleShow()">关于网站</div>
    <transition name="show">
      <about-site v-show="isShow" class="about-site" @show="handleShow"></about-site>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import AboutSite from './AboutSite.vue';
import { getToplistDetail } from '~api/get.js';

export default {
  name: 'discover-view',

  components: {
    AboutSite,
  },

  props: {},

  data() {
    return {
      isShow: false,
    }
  },

  mounted() {
    this.initialData();
  },

  methods: {
    // 初始化数据
    initialData() {
      // 获取排行榜的信息，保存至 store
      getToplistDetail().then(res => {
        // console.log(res.data.list);
        const data = res.data.list;
        const featureRank = data.slice(0, 4);
        const globalRank = data.slice(4);
        this.$store.commit('UPDATE_FEATURE_RANK', featureRank);
        this.$store.commit('UPDATE_GLOBAL_RANK', globalRank);
      }).catch(err => {
        console.log(err);
      });
    },
    handleShow() {
      this.isShow = !this.isShow;
    },
  },

}
</script>

<style lang="scss" scoped>

.discover {
  position: relative;
  .about-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(80, 195, 126);
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: rgb(14, 117, 55);
    }
  }
}

.show-enter, .show-leave {
  
}
.show-enter-active, .show-enter-leave {
  
}
</style>
