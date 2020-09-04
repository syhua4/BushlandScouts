<template>
  <swiper
    ref="mySwiper"
    :options="swiperOptions"
    @mouseenter.native="stopSwiper"
    @mouseleave.native="startSwiper"
  >
    <slot />
    <div :class="{ 'swiper-button-prev': !isMobile }" slot="button-prev"></div>
    <div :class="{ 'swiper-button-next': !isMobile }" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapGetters } from 'vuex';

export default {
  name: 'Slider',
  components: {
    Swiper
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      swiperOptions: Object.assign(
        {},
        {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          parallax: true,
          effect: 'fade',
          spaceBetween: 30,
          observer: true,
          observeParents: true,
          observeSlideChildren: true
        },
        this.options
      )
    };
  },
  methods: {
    stopSwiper() {
      this.$refs.mySwiper.$swiper.autoplay.stop();
    },
    startSwiper() {
      this.$refs.mySwiper.$swiper.autoplay.start();
    }
  },
  computed: {
    ...mapGetters(['isMobile']),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  }
};
</script>
<style lang="scss">
.swiper-container {
  height: 100%;
  width: 100%;
  .swiper-button-prev,
  .swiper-button-next {
    color: $sub-color;
    opacity: 0;
    transition: opacity 0.2s linear;
  }
  &:hover .swiper-button-prev,
  &:hover .swiper-button-next {
    opacity: 1;
  }
}
</style>
