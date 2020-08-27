<template>
  <swiper-slide>
    <slot />
  </swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'SliderItem',
  components: {
    SwiperSlide
  }
};
</script>

<style lang="scss" scoped></style>
