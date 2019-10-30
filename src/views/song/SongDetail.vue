<template>
  <div class="song">
    <div class="content">
      <div class="main">
        <div class="main-album">
          <img class="main-album-img"
            v-show="detail.al"
            :src="detail.al.picUrl+'?param=130y130'" 
          >
          <div class="main-album-cover"></div>
        </div>
        <div class="main-info">
          <div class="info-header">
            <div class="header-icon"></div>
            <div class="header-title">
              <h2 class="title-main">
                {{detail.name}}
                <span class="title-main-mv"></span>
              </h2>
              <h3 v-if="detail.alia.length" class="title-sub">{{detail.alia[0]}}</h3>
            </div>
          </div>
          <div class="info-desc">
            <p>
              歌手：<a href="">{{singers}}</a>
            </p>
            <p>
              所属专辑：<a href="#" @click="toAlbumView(detail.al.id)">{{detail.al.name}}</a>
            </p>
          </div>
          <div class="info-btn">
            <btn-bar :detail="detail">
              <span slot="comment">(123)</span>
            </btn-bar>
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
      <aside-group 
        :relativePlaylist="relativePlaylist"
        :similarSong="similarSong"
        :download="download"
      ></aside-group>
    </div>
  </div>
</template>

<script>
import BtnBar from '@/components/base/BtnBar.vue';
import AsideGroup from '@/components/group/AsideGroup';
import { getSongUrl, getSongDetail, getLyric, getSimPlaylist, getSimSong } from '~api/get.js';
import { getSingers } from '~api/util.js';

export default {
  name: 'song-detail',

  components: {
    BtnBar,
    AsideGroup,
  },

  data() {
    return {
      detail: { // 歌曲详情
        al: '',
        alia: '',
        ar: [],
        name: '',
      }, 
      lyric: '', // 歌词
      showAllLyric: false, // 控制显示全部歌词
      relativePlaylist: [], // 边栏参数，相似歌单
      similarSong: [], // 边栏参数，相似歌曲
      download: true, // 边栏参数
    };
  },

  computed: {
    lyrics() {
      return this.lyric.split('\n').map(v => v.replace(/[\[\]\d\:\.]+/, ''));
    },
    lyricControlIcon() {
      return showAllLyric ? 'ctrl-down-icon' : 'ctrl-up-icon';
    },
    singers() {
      return getSingers(this.detail.ar);
    },
  },

  mounted() {
    this.initialDetail();
  },

  methods: {
    // 初始化页面信息
    initialDetail() {
      // 获取歌曲信息
      const songId = this.$route.query.id;
      getSongDetail(songId).then(res => {
        // console.log(res.data.songs[0]);
        const data = res.data.songs[0];
        this.detail.al = data.al;
        this.detail.alia = data.alia;
        this.detail.ar = this.detail.ar.concat(data.ar);
        this.detail.name = data.name;
        this.detail.id = data.id;
        this.detail.picUrl = data.al.picUrl;
      });
      // 获取歌词
      getLyric(songId).then(res => {
        // console.log(res.data.lrc.lyric);
        this.lyric = res.data.lrc.lyric;
      });
      // 获取相似歌单
      getSimPlaylist(songId).then(res => {
        // console.log(res.data.playlists);
        this.relativePlaylist = res.data.playlists;
      });
      // 获取相似音乐
      getSimSong(songId).then(res => {
        // console.log(res.data.songs);
        this.similarSong = res.data.songs;
      });
    },
    // 显示/隐藏歌词
    handleShowLyric() {
      const lyric = this.$refs.lyric;
      if (this.showAllLyric) {
        lyric.style.height = '299px';
      } else {
        lyric.style.height = 'auto';
      }
      this.showAllLyric = !this.showAllLyric;
    },
    toAlbumView(albumId) {
      this.$router.push({ path: '/album', query: { id: albumId }});
    },
  },

  watch: {
    '$route' (to, from) {
      this.initialDetail();
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
    box-sizing: border-box;
    float: left;
    width: 710px;
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
            height: 295px;
          }
          .lyric-control {
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
