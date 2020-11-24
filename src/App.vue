<template>
  <div id="app">
    <div class="about-btn" @click="handleShowAbout()">关于网站</div>
    <transition name="show">
      <about-site
        v-show="isShowAboutSite"
        class="about-site"
        @show="handleShowAbout()" />
    </transition>
    <router-view />
    <player-bar />
  </div>
</template>

<script>
import PlayerBar from '@/views/player/index.vue'
import AboutSite from '@/views/discover/AboutSite.vue'
import { mapGetters } from 'vuex'
import { getToplistDetail } from '@/api/get'

export default {
  name: 'app',
  components: {
    PlayerBar,
    AboutSite,
  },
  computed: {
    ...mapGetters(['isShowAboutSite']),
  },
  mounted() {
    this.initialData()
  },
  methods: {
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
    initialData() {
      let featureRank = this.$storage.getLocalStorage('featureRank')
      let globalRank = this.$storage.getLocalStorage('globalRank')
      if (featureRank && globalRank) {
        // get data from storage, and save to store
        this.$store.dispatch('updateToplistDetail', { featureRank, globalRank })
      } else {
        // fetch new data and save to store, update storage
        this.$api.getToplistDetail().then(res => {
          console.log('------app-----', res)
          const data = res.data.list
          featureRank = data.slice(0, 4)
          globalRank = data.slice(4)
          this.$store.dispatch('updateToplistDetail', { featureRank, globalRank })
          this.$storage.setLocalStorage('featureRank', featureRank, 300)
          this.$storage.setLocalStorage('globalRank', globalRank, 300)
        }).catch(console.log)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  background-color: rgb(245, 245, 245);
  .about-btn {
    z-index: 99;
    position: fixed;
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
</style>
