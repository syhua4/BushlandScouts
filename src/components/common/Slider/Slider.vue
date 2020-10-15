<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <slot />
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

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
          direction: 'vertical',
          slidesPerView: 1,
          mousewheel: true,
          height: window.innerHeight,
          keyboard: {
            enabled: true
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
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
    transition: opacity 0.2s linear;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
