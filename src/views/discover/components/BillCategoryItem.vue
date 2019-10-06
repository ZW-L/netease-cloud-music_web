<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <img class="left-pic" :src="pic" alt="">
        <a href="" class="left-link">
        </a>
      </div>
      <div class="header-right">
        <div class="right-title">{{title}}</div>
        <div class="right-options">
          <span class="option-play"></span>
          <span class="option-addall"></span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="i of 10" :key="i">
        <span class="item-order">{{i}}</span>
        <span class="item-name">我和我的祖国</span>
      </div>
    </div>
    <div class="footer">
      <span class="show-all">查看全部&gt;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bill-category-item',

  components: {},

  props: {
    pic: {
      type: String,
    },
    title: {
      type: String,
    },
  },

  data() {
    return {
      
    }
  },

}
</script>

<style lang="scss" scoped>

.container {
  .header {
    position: relative;
    height: 100px;
    padding-top: 20px;
    padding-left: 20px;
    background-color: rgb(244, 244, 244);
    .header-left {
      position: relative;
      float: left;
      width: 80px;
      height: 80px;
      .left-pic {
        width: 100%;
      }
      .left-link {
        position: absolute;
        width: 80px;
        height: 80px;
        left: 0;
        background: url('../../../../public/img/icons/coverall.png') no-repeat -145px -57px;
      }
    }
    .header-right {
      float: left;
      margin-top: 6px;
      margin-left: 10px;
      width: 116px;
      .right-title {
        color: #333;
        font-size: 14px;
        font-weight: bold;
      }
      .right-options {
        margin-top: 10px;
        & span {
          float: left;
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        .option-play {
          background: url('../../../../public/img/icons/index.png') no-repeat -267px -205px;
        }
        .option-addall {
          background: url('../../../../public/img/icons/index.png') no-repeat -300px -205px;
        }
      }
    }
  }
  .list {
    color: #000;
    .item {
      height: 32px;
      padding-left: 20px;
      line-height: 32px;
      .item-order, .item-name {
        display: inline-block;
        height: 32px;
      }
      .item-order {
        width: 35px;
        font-size: 16px;
        text-align: center;
      }
      .item-name {
        width: 170px;
        font-size: 12px;
      }
      &:nth-child(odd) {
        background-color: rgb(232, 232, 232);
      }
      &:nth-child(even) {
        background-color: rgb(244, 244, 244);
      }
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          .item-order {
            color: rgb(193, 13, 12);
          }
        }
      }
      &:hover {
        .item-name {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  .footer {
    position: relative;
    height: 32px;
    padding-right: 32px;
    line-height: 32px;
    font-size: 12px;
    background-color: rgb(232, 232, 232);
    .show-all {
      float: right;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>