<template>
  <div class="toplist">
    <sidebar :id="currentId" @updateId="updateId" />
    <rank-list :id="currentId" @updateId="updateId" />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import RankList from './components/RankList.vue'

export default {
  name: 'toplist',
  components: {
    Sidebar,
    RankList,
  },

  data() {
    return {
      currentId: 19723756,
    }
  },

  methods: {
    updateId(id) {
      this.currentId = id
    },
  },
}
</script>

<style lang="scss" scoped>
.toplist {
  display: flex;
}
</style>
