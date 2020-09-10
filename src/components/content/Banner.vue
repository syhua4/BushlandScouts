<template>
  <div class="banner">
    <swiper v-if="banners && banners.length > 0" :options="options" ref="banner">
      <swiper-item v-for="(banner, index) in banners" :key="banner.id + index">
        <a>
          <img :src="banner.picUrl" class="banner-img" />
          <div class="text-wrapper">
            <h2>{{ banner.title }}</h2>
            <p v-show="!isMobile">{{ banner.desc }}</p>
            <div class="btn-wrapper">
              <span @click="goLink(banner.btnLink)">{{ banner.btnText }}</span>
            </div>
          </div>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';
import { mapGetters } from 'vuex';
export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  data() {
    return {
      options: {
        loop: true
      }
    };
  },
  methods: {
    goLink(link) {
      if (link !== '/') {
        this.$router.push(link);
      } else {
        this.$emit('scroll');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  top: 60px;
  max-width: 1024px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 2px 10px #ddd;
  @media (max-width: 767px) {
    margin-bottom: 30px;
    box-shadow: none;
  }
  @media (min-width: 900px) {
    margin: 50px auto;
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .text-wrapper {
      width: 50%;
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      text-transform: uppercase;
      @media (max-width: 767px) {
        right: 5%;
        width: 70%;
        text-align: right;
        h2 {
          @include font_size($m);
        }
        p {
          @include font_size($ms);
        }
      }
      h2 {
        @include font_size($l);
        color: $sub-color2;
        margin: 20px 0;
        font-family: 'Delius Unicase', cursive;
      }
      p {
        color: #bc6c25;
      }
      .btn-wrapper {
        text-align: center;
        margin-top: 30px;
        span {
          background: $background-color;
          border-radius: 20px;
          padding: 8px 15px;
          cursor: pointer;
        }
        @media (max-width: 767px) {
          text-align: right;
          @include font_size($s);
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
