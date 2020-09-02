<template>
  <div class="banner">
    <swiper v-if="banners && banners.length > 0" :options="options" ref="banner">
      <swiper-item v-for="(banner, index) in banners" :key="banner.id + index">
        <a>
          <img
            :src="banner.picUrl"
            class="banner-img"
            :style="{ height: isMobile ? 'calc(100vh / 2)' : 'calc(80vh - 60px)' }"
          />
          <!-- <div class="text-wrapper">
            <h2>Protect our bushland</h2>
            <p>EXPLORE WHY AND HOW WE CAN PRESERVE OUR BUSHLAND</p>
          </div> -->
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';
import { mapGetters } from 'vuex';
// import { getUrlMixin } from 'common/mixin';
export default {
  name: 'Banner',
  // mixins: [getUrlMixin],
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
  activated() {
    if (this.$refs.banner) {
      this.$refs.banner.$refs.mySwiper.$swiper.autoplay.start();
    }
  },
  deactivated() {
    this.$refs.banner.$refs.mySwiper.$swiper.autoplay.stop();
  }
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
  }
  .text-wrapper {
    width: 400px;
    height: 300px;
    background-color: #f00;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
