<template>
  <div class="content">
    <home-carousel class="carousel"></home-carousel>
  </div>
</template>

<script>
import HomeCarousel from './components/HomeCarousel.vue';

export default {
  name: 'discover-view',

  components: {
    HomeCarousel,
  },

  props: {},

  data() {
    return {
    }
  },

}
</script>

<style lang="scss" scoped>

.carousel {
  width: 100%;
  height: 336px;
}
</style>