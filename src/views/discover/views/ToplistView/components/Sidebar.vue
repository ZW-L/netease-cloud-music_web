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

  props: {
    id: Number,
  },

  computed: {
    ...mapGetters(['featureRank', 'globalRank']),
  },

  methods: {
    changeRank(id) {
      this.$emit('updateId', id)
      // 切换排行榜，响应为当前路由，传递 id 参数
      this.$router.push({ path: '/discover/toplist', query: { id } })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.cate {
  width: 240px;
  padding-top: 40px;
  border-right: 1px solid $bdcDefault;
  background-color: $bgContentLight;
}
</style>
