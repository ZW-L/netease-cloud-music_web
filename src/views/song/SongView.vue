<template>
  <div class="song">
    <div class="content">
      <div class="main">
        <div class="main-album">
          <img class="main-album-img"
            src="http://p2.music.126.net/HeGrAKPiZhKkONiFDxZvmw==/109951164384346866.jpg?param=130y130" 
            alt=""
          >
          <div class="main-album-cover"></div>
        </div>
        <div class="main-info">
          <div class="info-header">
            <div class="header-icon"></div>
            <div class="header-title">
              <h2 class="title-main">
                我和我的祖国
                <span class="title-main-mv"></span>
              </h2>
              <h3 class="title-sub">电影《我和我的祖国》主题曲</h3>
            </div>
          </div>
          <div class="info-desc">
            <p>
              歌手：<a href="">王菲</a>
            </p>
            <p>
              所属专辑：<a href="">我和我的祖国</a>
            </p>
          </div>
          <div class="info-btn">
            <btn-bar></btn-bar>
          </div>
          <div class="info-lyric">
            <div class="lyric-main" ref="lyric">
              <p v-for="(item, i) of lyrics" :key="i">{{item}}</p>
            </div>
            <p class="lyric-control" @click="handleShowLyric()">
              <em v-if="!showAllLyric" class="ctrl-text">展开</em>
              <em v-else class="ctrl-text">收起</em>
              <i :class="['ctrl-icon', showAllLyric ? 'ctrl-up-icon' : 'ctrl-down-icon']"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="comment"></div>
    </div>
    <div class="aside">
      <aside-assembly 
        :relativePlaylist="relativePlaylist"
        :similarSong="similarSong"
        :download="download"
      ></aside-assembly>
    </div>
  </div>
</template>

<script>
import BtnBar from '@/components/base/BtnBar.vue';
import AsideAssembly from '@/components/AsideAssembly';

export default {
  name: 'song-view',

  components: {
    BtnBar,
    AsideAssembly,
  },

  props: {},

  data() {
    return {
      lyric: `作曲 : 秦咏诚
作词 : 张藜
我和我的祖国一刻也不能分割
无论我走到哪里都流出一首赞歌
我歌唱每一座高山我歌唱每一条河
袅袅炊烟小小村落路上一道辙
啦……
你用你那母亲的脉搏和我诉说
我的祖国和我像海和浪花一朵
浪是海的赤子海是那浪的依托
每当大海在微笑我就是笑的旋涡
我分担着海的忧愁分享海的欢乐
啦…..
永远给我碧浪清波心中的歌
啦…….
永远给我碧浪清波心中的歌`,
      showAllLyric: false,
      relativePlaylist: [1],
      similarSong: [1],
      download: true,
    }
  },

  computed: {
    lyrics() {
      return this.lyric.split('\n');
    },
    lyricControlIcon() {
      return showAllLyric ? 'ctrl-down-icon' : 'ctrl-up-icon';
    },
  },

  mounted() {
    console.log(this.lyrics);
  },

  methods: {
    handleShowLyric() {
      const lyric = this.$refs.lyric;
      if (this.showAllLyric) {
        lyric.style.height = '299px';
      } else {
        lyric.style.height = 'auto';
      }
      this.showAllLyric = !this.showAllLyric;
    },
  },

}
</script>

<style lang="scss" scoped>

@import '~css/variables.scss';

.song {
  overflow: hidden;
  box-sizing: border-box;
  width: 982px;
  margin: 0 auto;
  background-color: $bgDefault;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  .content {
    float: left;
    box-sizing: border-box;
    width: 710px;
    // height: 1000px;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .main {
      .main-album {
        position: relative;
        float: left;
        width: 205px;
        height: 205px;
        text-align: center;
        line-height: 205px;
        .main-album-img {
          width: 130px;
        }
        .main-album-cover {
          z-index: 10;
          position: absolute;
          top: 1px;
          left: -1px;
          width: 205px;
          height: 205px;
          background: url('../../../public/img/icons/coverall.png') no-repeat -140px -580px;
        }
      }
      .main-info {
        float: left;
        width: 415px;
        margin-left: 25px;
        font-size: $fontMin;
        .info-header {
          overflow: hidden;
          .header-icon {
            float: left;
            width: 54px;
            height: 24px;
            background: url('../../../public/img/icons/icon.png') no-repeat 0 -463px;
          }
          .header-title {
            float: left;
            margin-left: 10px;
            .title-main {
              height: 32px;
              line-height: 32px;
              font-size: $fontLarge;
              .title-main-mv {
                display: inline-block;
                width: 21px;
                height: 18px;
                background: url('../../../public/img/icons/icon.png') no-repeat 0 -18px;
              }
            }
            .title-sub {
              height: 17px;
              margin-top: 2px;
              line-height: 17px;
              color: $titleDivide;
              font-size: $fontMinL;
            }
          }
        }
        .info-desc {
          margin-top: 10px;
          line-height: 25px;
        }
        .info-btn {
          padding-top: 10px;
        }
        .info-lyric {
          margin-top: 35px;
          line-height: 23px;
          .lyric-main {
            overflow: hidden;
            height: 299px;
          }
          .lyric-control {
            &:hover {
              cursor: pointer;
            }
            .ctrl-text {
              // font-weight: bold;
              color: $textLinkBlueLight;
            }
            .ctrl-icon {
              display: inline-block;
              width: 11px;
              height: 8px;
              margin-left: 5px;
            }
            .ctrl-down-icon {
              background: url('../../../public/img/icons/icon.png') no-repeat -65px -520px;
            }
            .ctrl-up-icon {
              background: url('../../../public/img/icons/icon.png') no-repeat -45px -520px;
            }
          }
        }
      }
    }
    .comment {}
  }
  .aside {
    float: left;
    width: 270px;
  }
}
</style>
