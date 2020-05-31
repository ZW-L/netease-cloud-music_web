<template>
  <div class="lyric">
    <div class="lyric-main" ref="lyric">
      <p v-for="(item, i) of lyrics" :key="i">{{item}}</p>
    </div>
    <p class="lyric-ctrl" @click="handleShowLyric">
      <em v-if="!showAllLyric" class="ctrl-text">展开</em>
      <em v-else class="ctrl-text">收起</em>
      <i :class="['ctrl-icon', showAllLyric ? 'ctrl-icon--down' : 'ctrl-icon--up']"></i>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    lyric: String,
  },

  data() {
    return {
      showAllLyric: false, // 控制显示全部歌词
    }
  },

  computed: {
    lyrics() {
      // eslint-disable-next-line
      return this.lyric.split('\n').map(v => v.replace(/[\[\]\d\:\.]+/, ''))
    },
    lyricControlIcon() {
      return this.showAllLyric ? 'ctrl-down-icon' : 'ctrl-up-icon'
    },
  },

  methods: {
    // 显示/隐藏歌词
    handleShowLyric() {
      const { lyric } = this.$refs
      if (this.showAllLyric) {
        lyric.style.height = '299px'
      } else {
        lyric.style.height = 'auto'
      }
      this.showAllLyric = !this.showAllLyric
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lyric {
  margin-top: 35px;
  line-height: 23px;
  .lyric-main {
    overflow: hidden;
    height: 295px;
  }
  .lyric-ctrl {
    &:hover {
      cursor: pointer;
    }
    .ctrl-text {
      color: $textLinkBlueLight;
    }
    .ctrl-icon {
      display: inline-block;
      width: 11px;
      height: 8px;
      margin-left: 5px;
    }
  }
}
</style>
