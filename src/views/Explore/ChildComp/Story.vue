<template>
  <div class="story">
    <img src="~assets/images/bg1.jpeg" class="bg" />
    <h2>{{ showStory ? 'Weeds Buster' : 'Story' }}</h2>
    <cards
      :content="stories"
      :clickable="true"
      @toCard="openStory"
      ref="cards"
      v-show="!showStory"
    />
    <transition>
      <flipbook v-show="showStory" />
    </transition>
  </div>
</template>

<script>
import Cards from 'components/content/Cards';
import Flipbook from 'components/content/Flipbook';

export default {
  name: 'Story',
  created() {},
  destroyed() {
    this.$parent.$refs.wrapper.style.position = '';
  },
  data() {
    return {
      showStory: false,
      stories: [
        {
          imgUrl: require('assets/images/placeholder.png'),
          title: 'Weeds busters',
          desc: 'WIP'
        },
        {
          imgUrl: require('assets/images/placeholder.png'),
          title: 'Feral Invasion',
          desc: 'WIP'
        },
        {
          imgUrl: require('assets/images/placeholder.png'),
          title: 'Bushfire',
          desc: 'WIP'
        }
      ]
    };
  },
  components: { Cards, Flipbook },
  methods: {
    openStory(name) {
      console.log(name);
      if (name == 'Weeds busters') {
        this.showStory = !this.showStory;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.story {
  background-color: #fff;
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  @include font_size($m);
  padding-top: 100px;
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
  h2 {
    position: relative;
    z-index: 9;
    text-align: center;
    font-weight: 800;
    @include font_size($l);
    // margin-top: 1px;
  }
}
</style>
