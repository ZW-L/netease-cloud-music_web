<template>
  <div id="app">
    <!-- <div class="about-btn" @click="handleShowAbout()">关于网站</div> -->
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
import AboutSite from '@discover/AboutSite.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    PlayerBar,
    AboutSite,
  },
  computed: {
    ...mapGetters(['isShowAboutSite']),
  },
  methods: {
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
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
