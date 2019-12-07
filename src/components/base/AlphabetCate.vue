<template>
  <div id="base-alphabet-cate">
    <span v-for="(item, i) of list" :key="item" 
      :class="['item', { 'item-active': i === activeIndex }]"
      @click="handleClick(i, item)"
    >
      <a href="#">{{item}}</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'base-alphabet-cate',

  props: {
    reset: Boolean,
  },

  data() {
    return {
      activeIndex: 0,
    }
  },

  computed: {
    list() {
      let a = 65
      const a2z = new Array(26).fill(null).map(v => String.fromCharCode(a++))
      a2z.unshift('热门')
      a2z.push('其他')
      return a2z
    },
  },

  methods: {
    handleClick(i, item) {
      this.activeIndex = i
      if (i === 0 || i === 27) {
        this.$emit('getArtistList')
      } else {
        this.$emit('getArtistList', item)
      }
    },
  },

  watch: {
    reset() {
      this.activeIndex = 0
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

#base-alphabet-cate {
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
  .item {
    padding: 5px;
    font-size: $fontMinL;
    border-radius: 3px;
    &:hover {
      background-color: $bgSubHeader;
      a {
        color: $textLight;
      }
    }
  }
  .item-active {
    background-color: $bgSubHeader;
    a {
      color: $textLight;
    }
  }
}

</style>
