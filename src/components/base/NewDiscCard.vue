<template>
  <div :class="['card', `card-${size}`]">
    <div :class="['wrapper', `wrapper-${size}`]" @click="toAlbumView()">
      <img :class="['card-img', `card-img-${size}`]"
        :src="album.picUrl" 
        alt="">
      <a :class="['card-link', `card-link-${size}`]" href="#"></a>
    </div>
    <p class="card-title" ref="title" @click="toAlbumView()">{{album.name}}</p>
    <p class="card-artists">
      <span v-for="(item, i) of artists" :key="i" class="singer">
        {{item}}
      </span>
    </p>
  </div>
</template>

<script>
import { addSeparator } from '@/api/util.js'

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
        'xm': '12px',
        'm': '14px',
        'l': '16px',
      },
    };
  },

  computed: {
    artists() {
      const artists = this.album.artists.map(v => v.name);
      return addSeparator(artists, '/');
    },
  },

  mounted() {
    this.$refs.title.style.fontSize = this.fontSize[this.ttSize];
  },

  methods: {
    toAlbumView() {
      this.$router.push({ path: '/album', query: { id: this.album.id }});
    },
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

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

.wrapper {
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
