<template>
  <div class="footer">
    <div class="wrapper">
      <div class="info">
        <p class="info-link">
          <span class="link-item" v-for="(item, i) of devideLinks" :key="i">
            <a href="#">{{item}}</a>
          </span>
        </p>
        <p class="info-copyright">
          <span>网易公司版权所有©1997-2019</span>
          <span>杭州乐读科技有限公司运营：</span>
          <span>
            <a href="#">浙网文[2018]3506-263号</a>
          </span>
        </p>
        <p class="info-contact">
          <span>违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <span>
            <a href="#">ncm5990@163.com</a>
          </span>
        </p>
      </div>
      <div class="icon">
        <ul class="icon-list">
          <li class="icon-item" v-for="(item, i) of logos" :key="i">
            <a class="item-logo" href="#" :style="getBg(i).logoStyle"></a>
            <span class="item-title" :style="getBg(i).ttStyle"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-footer',

  data() {
    return {
      links: ['服务条款', '隐私政策', '儿童隐私政策', '版权投诉指引', '意见反馈'],
      logos: [
        {
          tt: '用户认证',
          tt_url: '/img/icons/foot_enter_tt.png',
          tt_pos: [-1, -91],
          tt_size: [180, 100],
          logo_url: '/img/icons/foot_enter_new.png',
          logo_pos: [-63, -101],
          logo_size: [110, 450],
        },
        {
          tt: '独立音乐人',
          tt_url: '/img/icons/foot_enter_tt.png',
          tt_pos: [0, 0],
          tt_size: [180, 100],
          logo_url: '/img/icons/foot_enter_new.png',
          logo_pos: [0, 0],
          logo_size: [110, 450],
        },
        {
          tt: '赞赏',
          tt_url: '/img/icons/foot_enter_tt.png',
          tt_pos: [0, -54],
          tt_size: [180, 100],
          logo_url: '/img/icons/foot_enter_new.png',
          logo_pos: [-60, -50],
          logo_size: [110, 450],
        },
        {
          tt: '视频奖励',
          tt_url: '/img/icons/foot_enter_tt.png',
          tt_pos: [-1, -72],
          tt_size: [180, 100],
          logo_url: '/img/icons/foot_enter_new.png',
          logo_pos: [0, -101],
          logo_size: [110, 450],
        },
      ],
    }
  },

  computed: {
    devideLinks() {
      return this.links.join('_').split(/\b/).map(v => (v === '_' ? '|' : v))
    },
    bg() {
      const res = []
      const { logos } = this
      let logoBg = ''
      let logoSize = ''
      let titleBg = ''
      let titleSize = ''
      for (let i = 0; i < logos.length; i += 1) {
        const obj = {}
        logoBg = `url(${logos[i].logo_url}) no-repeat ${logos[i].logo_pos[0]}px ${logos[i].logo_pos[1]}px`
        logoSize = `${logos[i].logo_size[0]}px ${logos[i].logo_size[1]}px`
        titleBg = `url(${logos[i].tt_url}) no-repeat ${logos[i].tt_pos[0]}px ${logos[i].tt_pos[1]}px`
        titleSize = `${logos[i].tt_size[0]}px ${logos[i].tt_size[1]}px`
        obj.logoStyle = { background: logoBg, 'background-size': logoSize }
        obj.ttStyle = { background: titleBg, 'background-size': titleSize }
        res.push(obj)
      }
      return res
    },
  },

  methods: {
    getBg(i) {
      return this.bg[i]
    },
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.footer {
  width: 100%;
  height: $footerHeight;
  background-color: $bgFooter;
  border-top: 1px solid $bdcDefault;
  .wrapper {
    position: relative;
    width: 980px;
    margin: 0 auto;
    font-size: $fontMin;
    .info {
      float: left;
      width: 520px;
      padding-top: 15px;
      line-height: 24px;
      .info-link {
        color: $textLinkDefault;
        .link-item {
          a {
            color: $textLinkDefault;
          }
          &:nth-child(odd) {
            @include hoverText();
          }
          &:nth-child(even) {
            margin: 0 8px;
            @include hoverText(default, none);
          }
        }
      }
      .info-copyright, .info-contact {
        span {
          &:nth-child(2) {
            margin-left: 15px;
          }
          a {
            color: $textDesc;
            @include hoverText();
          }
        }
      }
    }
    .icon {
      float: right;
      width: 330px;
      margin-top: 21px;
      color: $textLinkDefault;
      .icon-list {
        position: relative;
        height: 70px;
        .icon-item {
          float: left;
          width: 60px;
          &:not(:first-child) {
            margin-left: 30px;
          }
          .item-logo {
            box-sizing: border-box;
            display: inline-block;
            width: 50px;
            height: 45px;
            margin: 0 5px;
          }
          .item-title {
            display: inline-block;
            width: 52px;
            height: 14px;
            margin: 5px 5px 0;
          }
        }
      }
    }
  }
}
</style>
