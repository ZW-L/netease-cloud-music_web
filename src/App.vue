<template>
  <div id="app">
    <music-header></music-header>
    <router-view/>
    <music-footer></music-footer>
  </div>
</template>

<script>
import MusicHeader from '@/components/MusicHeader.vue';
import MusicFooter from '@/components/MusicFooter.vue';

export default {

  name: 'app',
  
  components: {
    MusicHeader,
    MusicFooter,
  },
  
};
</script>

<style lang="scss" scoped>

#app {
  background-color: rgb(245, 245, 245);
}
</style>
