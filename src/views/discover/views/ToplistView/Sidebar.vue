<template>
  <div class="cate">
    <sidebar-item
      title="云音乐特色榜"
      :rank="featureRank"
      :id="id"
      @changeRank="changeRank"
    />
    <sidebar-item
      title="全球媒体榜"
      :rank="globalRank"
      :id="id"
      @changeRank="changeRank"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'

export default {
  components: {
    SidebarItem,
  },
  data() {
    return {
      id: 19723756,
    }
  },
  computed: {
    ...mapGetters(['featureRank', 'globalRank']),
  },
  methods: {
    // 切换排行榜
    changeRank(id) {
      // 响应为当前路由，传递 id 参数
      this.id = id
      this.$router.push({ path: '/discover/toplist', query: { id } })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~css/variables.scss';

.cate {
  width: 240px;
  padding-top: 40px;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  background-color: $bgContentLight;
}
</style>
