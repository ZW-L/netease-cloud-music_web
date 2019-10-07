<template>
  <div class="footer">
    <div class="wrapper">
      <div class="info">
        <p class="info-link">
          <span class="link-item" v-for="(item, i) of devideLinks" :key="i">
            <a href="">{{item}}</a>
          </span>
        </p>
        <p class="info-copyright">
          <span>网易公司版权所有©1997-2019</span>
          <span>杭州乐读科技有限公司运营：</span>
          <span>
            <a href="">浙网文[2018]3506-263号</a>
          </span>
        </p>
        <p class="info-contact">
          <span>违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <span>
            <a href="">ncm5990@163.com</a>
          </span>
        </p>
      </div>
      <div class="icon">
        <ul class="icon-list">
          <li class="icon-item" v-for="(item, i) of logos" :key="i">
            <a class="item-logo" href="" :style="getBg(i).logoStyle"></a>
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

  components: {},

  props: {},

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
    };
  },

  computed: {
    devideLinks() {
      return this.links.join('_').split(/\b/).map(v => v === '_' ? '|' : v);
    },
    bg() {
      const res = [],
            logos = this.logos;
      let logo_bg = '',
          logo_bgSize = '',
          tt_bg = '',
          tt_bgSize = '';
      for (let i = 0; i < logos.length; i+= 1) {
        const obj = {};
        logo_bg = `url(${logos[i].logo_url}) no-repeat ${logos[i].logo_pos[0]}px ${logos[i].logo_pos[1]}px`;
        logo_bgSize = `${logos[i].logo_size[0]}px ${logos[i].logo_size[1]}px`;
        tt_bg = `url(${logos[i].tt_url}) no-repeat ${logos[i].tt_pos[0]}px ${logos[i].tt_pos[1]}px`;
        tt_bgSize = `${logos[i].tt_size[0]}px ${logos[i].tt_size[1]}px`;
        obj.logoStyle = { 'background': logo_bg, 'background-size': logo_bgSize },
        obj.ttStyle = { 'background': tt_bg, 'background-size': tt_bgSize },
        res.push(obj);
      }
      return res;
    },
  },

  mounted() {
  },

  methods: {
    getBg(i) {
      return this.bg[i];
    }
  },

}
</script>

<style lang="scss" scoped>

.footer {
  width: 100%;
  height: 148px;
  background-color: rgb(242, 242, 242);
  border-top: 1px solid rgb(211, 211, 211);
  .wrapper {
    position: relative;
    width: 980px;
    margin: 0 auto;
    font-size: 12px;
    .info {
      float: left;
      width: 520px;
      padding-top: 15px;
      line-height: 24px;
      .info-link {
        color: rgb(139, 139, 139);
        .link-item {
          a {
            color: rgb(139, 139, 139);
          }
          &:nth-child(odd) {
            a:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          &:nth-child(even) {
            margin: 0 8px;
            a:hover {
              cursor: default;
              text-decoration: none;
            }
          }
        }
      }
      .info-copyright, .info-contact {
        span {
          &:nth-child(2) {
            margin-left: 15px;
          }
          a {
            color: rgb(102, 102, 102);
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .icon {
      float: right;
      width: 330px;
      margin-top: 21px;
      color: rgb(139, 139, 139);
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