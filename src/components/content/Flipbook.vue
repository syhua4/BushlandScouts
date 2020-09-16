<template>
  <div class="flipbook-test">
    <div
      class="flipbook-viewport"
      v-if="!isMobile"
      :style="{
        '--top': top ? top + 'px' : '0px'
      }"
    >
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
    <div class="verticle-book" v-if="isMobile">
      <img :src="item.image" alt="" v-for="item in story.pages" :key="item.page" />
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'assets/js/turn.js';
import { mapGetters } from 'vuex';
export default {
  name: 'Flipbook',
  props: {
    story: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      top: ''
    };
  },
  created() {
    this.top = this.$parent.$el.getBoundingClientRect().height / 2;
  },
  mounted() {
    if (!this.isMobile) {
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
  },
  computed: {
    ...mapGetters(['isMobile'])
  }
};
</script>

<style lang="scss" scoped>
.flipbook-test {
  @include font_size($m);
  // margin-top: 185px;

  /* Basic sample */
  .verticle-book {
    position: relative;
    z-index: 9;
    text-align: center;
    margin-top: 20px;
  }
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
    top: 50%;
    left: 50%;
    margin: auto;
    margin-top: 100px;
  }

  .flipbook-viewport .flipbook {
    width: 922px;
    height: 600px;
    left: -461px;
    top: calc(-300px + var(--top));
    margin-top: 20px;
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
