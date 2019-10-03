<template>
  <div id="app">
    <div id="header">
      <music-header></music-header>
    </div>
    <router-view/>
  </div>
</template>

<script>
import MusicHeader from '@/components/MusicHeader.vue';

export default {

  name: 'app',
  
  components: {
    MusicHeader,
  },
  
};
</script>

<style lang="scss" scoped>

#app {
  #header {
    width: 100%;
    height: 104px;
  }
}
</style>
