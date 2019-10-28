<template>
  <div class="container">
    <category-header 
      :title="title"
      :morePath="morePath"
    ></category-header>
    <div class="content">
      <div class="wrapper">
        <transition :name="vname">
          <ul v-show="showList==='first'" class="list first-list" ref="first">
            <li class="item" v-for="(item, i) of albums.slice(0, 5)" :key="i">
              <new-disc-card :album="item"></new-disc-card>
            </li>
          </ul>
        </transition>
        <transition :name="vname">
          <ul v-show="showList==='second'" class="list second-list" ref="second">
            <li class="item" v-for="(item, i) of albums.slice(5, 10)" :key="i">
              <new-disc-card :album="item"></new-disc-card>
            </li>
          </ul>
        </transition>
      </div>
      <span class="prev" @click="handleShowList('prev')">&nbsp;</span>
      <span class="next" @click="handleShowList('next')">&nbsp;</span>
    </div>
  </div>
</template>

<script>
import CategoryHeader from '@/components/base/CategoryHeader.vue';
import NewDiscCard from '@/components/base/NewDiscCard.vue';
import { getNewest } from '@/api/get.js';

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
    };
  },

  mounted() {
    this.initialData();
  },

  methods: {
    initialData() {
      getNewest().then(res => {
        this.albums = this.albums.concat(res.data.albums).slice(0, 10);
      });
    },
    handleShowList(choose) {
      // 后续应该添加节流函数
      this.vname = choose === 'prev' ? 'prev' : 'next';
      this.showList = this.showList === 'first' ? 'second' : 'first';
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.container {
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
    .prev, .next {
      position: absolute;
      width: 17px;
      height: 17px;
      top: 71px;
      &:hover {
        cursor: pointer;
      }
    }
    .prev {
      left: 5px;
      background: url('../../../../public/img/icons/index.png') no-repeat -260px -75px;
      &:hover {
        background: url('../../../../public/img/icons/index.png') no-repeat -280px -75px;
      }
    }
    .next {
      right: 5px;
      background: url('../../../../public/img/icons/index.png') no-repeat -300px -75px;
      &:hover {
        background: url('../../../../public/img/icons/index.png') no-repeat -320px -75px;
      }
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
