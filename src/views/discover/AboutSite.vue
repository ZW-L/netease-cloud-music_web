<template>
  <div class="as">
    <div class="filter" ref="filter"></div>
    <div class="wrapper">
      <h3 class="title">关于网站</h3>
      <h4>声明：</h4>
      <p>
        本网站为
        <a href="https://cn.vuejs.org/" target="_blank">Vue</a>
        练习项目，非
        <a href="https://music.163.com" target="_blank">网易云音乐</a>
        官方网站。
      </p>
      <h4>已实现页面以及功能：</h4>
      <ul>
        <li>能正常访问<em>发现音乐页面</em>下的<em>推荐页</em>，<em>排行榜页</em>，<em>歌单页</em>，<em>新碟上架页</em>等页面。</li>
        <li>能正常访问<em>歌曲详情页</em>，<em>歌单详情页</em>，<em>专辑详情页。</em></li>
        <li>能使用简单的搜索功能。</li>
        <li>能使用播放条控制播放音乐。</li>
        <li>能在正常访问的页面内控制音乐的播放。</li>
      </ul>
      <h4>更多</h4>
      <ul>
        <li>本网站不会实现登录相关的用户交互功能，体验过程中切勿输入敏感信息。</li>
        <li>感谢
          <a href="https://github.com/Binaryify" target="_blank">Binaryify</a>
          提供的网易云音乐 API：
          <a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank">NeteaseCloudMusicApi</a>。
        </li>
        <li>网站源码地址：<a href="" target="_blank">GitHub</a>，欢迎技术交流。</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about-site',

  mounted() {
    const filter = this.$refs.filter;
    filter.addEventListener('click', this.handleShow, false);
  },

  beforeDestroy() {
    const filter = this.$refs.filter;
    filter.removeEventListener('click', this.handleShow, false);
  },

  methods: {
    handleShow() {
      console.log('click');
      this.$emit('show');
    },
  },

}
</script>

<style lang="scss" scoped>
@import '~css/variables.scss';

.as {
  .wrapper {
    z-index: 999;
    position: absolute;
    box-sizing: border-box;
    position: absolute;
    width: 600px;
    height: 500px;
    top: 100px;
    left: 50%;
    margin-left: -300px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    .title {
      height: 30px;
      padding: 5px 0;
      line-height: 30px;
      font-size: $fontLarge;
      text-align: center;
      font-weight: bold;
      line-height: 30px;
    }
    a {
      color: blue;
    }
    em {
      margin: 0 3px;
      padding: 2px 4px;
      // background-color: rgb(69, 190, 133);
      background-color: pink;
      border-radius: 5px;
      // color: #fff;
      font-size: $fontMin;
      font-weight: bold;
    }
    h4, p, ul {
      padding: 0 10px;
    }
    h4 {
      height: 30px;
      margin-top: 15px;
      line-height: 30px;
      font-weight: bold;
    }
    p {
      line-height: 20px;
      text-indent: 2em;
    }
    ul {
      list-style-type: disc;
      li {
        line-height: 25px;
        text-indent: 2em;
      }
    }
  }
}
.filter {
  z-index: 998;
  position: absolute;
  top: -200px;
  left: 0;
  bottom: -200px;
  right: 0;
  background-color: rgba(0, 0, 0, .6);
}
</style>
