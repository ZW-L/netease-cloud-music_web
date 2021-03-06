<template>
  <div :class="['card', `card-${size}`]">
    <router-link :to="`/album?id=${album.id}`" tag="div"
      :class="['card-wrapper', `card-wrapper-${size}`]"
    >
      <img :class="['card-img', `card-img-${size}`]"
        :src="`${album.picUrl}?param=300y300`"
        alt="">
      <a :class="['card-link', `card-link-${size}`]" href="#"></a>
      <span :class="['play-icon', `play-icon-${size}`]" @click.stop="playAll()"></span>
    </router-link>
    <p class="card-title" ref="title">
      <router-link :to="`/album?id=${album.id}`">{{album.name}}</router-link>
    </p>
    <p class="card-artists">
      <span v-for="(item, i) of artists" :key="i" class="singer" @click="handleShowAbout()">
        {{item}}
      </span>
    </p>
  </div>
</template>

<script>
import { addSeparator } from '@/utils/util'
import { getAlbumDetail } from '@/api/get'

export default {
  name: 'new-disc-card',

  props: {
    album: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: 'md',
    },
    ttSize: {
      type: String,
      default: 'xm',
    },
  },

  data() {
    return {
      fontSize: {
        xm: '12px',
        m: '14px',
        l: '16px',
      },
    }
  },

  computed: {
    artists() {
      const artists = this.album.artists.map(v => v.name)
      return addSeparator(artists, '/')
    },
  },

  mounted() {
    this.$refs.title.style.fontSize = this.fontSize[this.ttSize]
  },

  methods: {
    playAll() {
      this.$api.getAlbumDetail(this.album.id).then(res => {
        const playlist = res.data.songs
        this.$store.dispatch('changePlaylist', playlist)
      })
    },
    handleShowAbout() {
      this.$store.commit('SHOW_ABOUT_SITE')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

/*
xm:
md: 100x100
lg: 130x130
*/
.card {
  display: inline-block;
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 118px;
    height: 150px;
  }
  &-#{lg} {
    width: 153px;
    height: 178px;
  }
}

.card-wrapper {
  position: relative;
  margin-bottom: 7px;
  &-#{sm} {
    background-color: #ccc;
  }
  &-#{md} {
    height: 100px;
  }
  &-#{lg} {
    height: 130px;
  }
  &:hover {
    .play-icon {
      display: block;
    }
  }
}

.card-img {
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 100px;
  }
  &-#{lg} {
    width: 130px;
  }
  box-shadow: $discBoxShadow;
}

.card-link {
  position: absolute;
  top: 0;
  left: 0;
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 118px;
    height: 100px;
    background: url('../../../public/img/icons/coverall.png') no-repeat 0 -570px;
  }
  &-#{lg} {
    width: 153px;
    height: 130px;
    background: url('../../../public/img/icons/coverall.png') no-repeat 0 -845px;
  }
}

.play-icon {
  z-index: 10;
  display: none;
  position: absolute;
  background-color: #ccc;
  &-#{md} {
    right: 22px;
    bottom: 3px;
    width: 22px;
    height: 22px;
    background: url('../../../public/img/icons/iconall.png') no-repeat 0 -85px;
    &:hover {
      cursor: pointer;
      background: url('../../../public/img/icons/iconall.png') no-repeat 0 -110px;
    }
  }
  &-#{lg} {
    right: 27px;
    bottom: 5px;
    width: 28px;
    height: 28px;
    background: url('../../../public/img/icons/iconall.png') no-repeat 0 -140px;
    &:hover {
      cursor: pointer;
      background: url('../../../public/img/icons/iconall.png') no-repeat 0 -170px;
    }
  }
}

.card-title, .card-artists {
  height: 18px;
  line-height: 18px;
  font-size: $fontMin;
  @include ellipse();
}

.card-title {
  @include hoverText();
}

.card-artists {
  color: $textInfo;
  .singer {
    &:nth-child(odd) {
      @include hoverText();
    }
  }
}

</style>
