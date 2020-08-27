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
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          observeSlideChildren: true
        },
        this.options
      )
    };
  }
};
</script>
<style lang="scss">
@import 'assets/css/variable.scss';

.swiper-pagination-bullet {
  width: 16px;
  height: 16px;
  background-color: #fff;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: $background_color;
}
</style>
