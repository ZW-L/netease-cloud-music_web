<template>
  <div class="top">
    <sidebar />
    <rank-list />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import RankList from './RankList.vue'

export default {
  components: {
    Sidebar,
    RankList,
  },
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  width: 983px;
  margin: 0 auto;
}
</style>
