<template>
  <div class="flipbook-test">
    <div class="flipbook-viewport">
      <div class="container">
        <div class="flipbook">
          <div
            v-for="item in story.pages"
            :key="item.page"
            :style="{ backgroundImage: `url(${item.image})` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'assets/js/turn.js';
export default {
  name: 'Flipbook',
  props: {
    story: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    $('.flipbook').turn({
      // Width

      width: 922,

      // Height

      height: 600,

      // Elevation

      elevation: 50,

      // Enable gradients

      gradients: true,

      // Auto center this flipbook

      autoCenter: true
    });
  }
};
</script>

<style lang="scss" scoped>
.flipbook-test {
  @include font_size($m);
  /* Basic sample */

  body {
    overflow: hidden;
    background-color: #fcfcfc;
    margin: 0;
    padding: 0;
  }

  .flipbook-viewport {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .flipbook-viewport .container {
    position: absolute;
    top: 60%;
    left: 50%;
    margin: auto;
  }

  .flipbook-viewport .flipbook {
    width: 922px;
    height: 600px;
    left: -461px;
    top: -300px;
  }

  .flipbook-viewport .page {
    width: 461px;
    height: 600px;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .flipbook .page {
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -o-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  .flipbook-viewport .page img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0;
  }

  .flipbook-viewport .shadow {
    -webkit-transition: -webkit-box-shadow 0.5s;
    -moz-transition: -moz-box-shadow 0.5s;
    -o-transition: -webkit-box-shadow 0.5s;
    -ms-transition: -ms-box-shadow 0.5s;

    -webkit-box-shadow: 0 0 20px #ccc;
    -moz-box-shadow: 0 0 20px #ccc;
    -o-box-shadow: 0 0 20px #ccc;
    -ms-box-shadow: 0 0 20px #ccc;
    box-shadow: 0 0 20px #ccc;
  }
}
</style>
