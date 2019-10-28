<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getToplistDetail } from '~api/get.js';

export default {
  name: 'discover-view',

  components: {},

  props: {},

  data() {
    return {
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
    }
  },

}
</script>

<style lang="scss" scoped>

</style>