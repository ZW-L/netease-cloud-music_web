<template>
  <div id="app">
    <music-header></music-header>
    <router-view></router-view>
    <music-footer></music-footer>
    <player-bar></player-bar>
  </div>
</template>

<script>
import MusicHeader from '@/components/MusicHeader.vue';
import MusicFooter from '@/components/MusicFooter.vue';
import PlayerBar from '@/components/PlayerBar.vue';

export default {

  name: 'app',
  
  components: {
    MusicHeader,
    MusicFooter,
    PlayerBar,
  },
  
};
</script>

<style lang="scss" scoped>
#app {
  background-color: rgb(245, 245, 245);
}
</style>
