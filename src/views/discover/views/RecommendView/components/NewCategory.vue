<template>
  <div class="new-cate">
    <category-header :title="title" :morePath="morePath" />
    <div class="content">
      <div class="wrapper">
        <transition :name="vname">
          <ul v-show="showList==='first'" class="list first-list" ref="first">
            <li class="item" v-for="(item, i) of albums.slice(0, 5)" :key="i">
              <new-disc-card :album="item" />
            </li>
          </ul>
        </transition>
        <transition :name="vname">
          <ul v-show="showList==='second'" class="list second-list" ref="second">
            <li class="item" v-for="(item, i) of albums.slice(5, 10)" :key="i">
              <new-disc-card :album="item" />
            </li>
          </ul>
        </transition>
      </div>
      <span class="new-cate__prev" @click="handleShowList('prev')">&nbsp;</span>
      <span class="new-cate__next" @click="handleShowList('next')">&nbsp;</span>
    </div>
  </div>
</template>

<script>
import CategoryHeader from '@/components/base/CategoryHeader.vue'
import NewDiscCard from '@/components/base/NewDiscCard.vue'

export default {
  name: 'new-category',
  components: {
    CategoryHeader,
    NewDiscCard,
  },
  data() {
    return {
      title: '新碟上架',
      morePath: '/discover/album',
      albums: [],
      showList: 'first',
      vname: '',
    }
  },
  mounted() {
    this.initialData()
  },
  methods: {
    initialData() {
      this.$api.getNewest().then(res => {
        this.albums = this.albums.concat(res.data.albums).slice(0, 10)
      })
    },
    handleShowList(choose) {
      // todo: 添加节流函数
      this.vname = choose === 'prev' ? 'next' : 'prev'
      this.showList = this.showList === 'first' ? 'second' : 'first'
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.new-cate {
  position: relative;
  width: 100%;
  .content {
    position: relative;
    margin: 20px 0 37px 0;
    border: 1px solid $bdcDefault;
    background-color: $bgContent;
    .wrapper {
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      height: 186px;
      margin: 0 20px 0 20px;
      .list {
        position: absolute;
        top: 20px;
        bottom: 20px;
        .item {
          display: inline-block;
          margin-left: 11px;
        }
      }
    }
    .new-cate__prev,
    .new-cate__next {
      position: absolute;
      width: 17px;
      height: 17px;
      top: 71px;
      &:hover {
        cursor: pointer;
      }
    }
    .new-cate__prev {
      left: 5px;
    }
    .new-cate__next {
      right: 5px;
    }
  }
}

// transition
.next-enter {
  transform: translateX(-670px);
}
.next-leave-to {
  transform: translateX(670px);
}
.next-enter-active, .next-leave-active {
  transition: all .8s ease;
}
.prev-enter {
  transform: translateX(670px);
}
.prev-leave-to {
  transform: translateX(-670px);
}
.prev-enter-active, .prev-leave-active {
  transition: all .8s ease;
}
</style>
