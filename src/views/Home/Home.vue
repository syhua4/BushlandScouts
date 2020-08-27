<template>
  <div class="home">
    <banner :banners="banners" />
  </div>
</template>

<script>
import Banner from 'components/content/Banner';
export default {
  name: 'Home',
  components: { Banner },
  data() {
    return {
      banners: [
        { id: 'pic1', picUrl: require('assets/images/banners/1.png') },
        { id: 'pic2', picUrl: require('assets/images/banners/2.jpg') },
        { id: 'pic3', picUrl: require('assets/images/banners/3.jpg') },
        { id: 'pic4', picUrl: require('assets/images/banners/4.jpg') },
        { id: 'pic5', picUrl: require('assets/images/banners/5.jpg') }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  @include font_size($m);
}
</style>
