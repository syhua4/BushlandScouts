<template>
  <div class="explore">
    <h1>Explore</h1>

    <cards
      :content="species"
      :clickable="true"
      @toCard="toCard"
      twoCards
      ref="cards"
      :isShow="show"
    />
    <div class="content-wrapper" ref="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Cards from 'components/content/Cards';
export default {
  name: 'Explore',
  components: { Cards },
  data() {
    return {
      show: true,
      species: [
        {
          imgUrl: require('assets/images/explore_image/comic.jpeg'),
          title: 'Story Time!',
          desc: 'Work in progress'
        },
        {
          imgUrl: require('assets/images/placeholder.png'),
          title: 'FACT TIME!',
          desc: 'Work in progress'
        }
      ]
    };
  },
  methods: {
    toCard(name) {
      // this.playing = true;
      if (name === 'Facts') {
        this.$router.push('/explore/facts');
      } else {
        this.$router.push('/explore/story');
      }
      this.$refs.wrapper.style.position = 'absolute';
    }
  },
  watch: {
    $route(to, from) {
      if (to.matched.length > 1) {
        this.$refs.wrapper.style.position = 'absolute';
        this.show = false;
      } else if (from.matched.length > 1) {
        this.show = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.explore {
  @include font_size($m);
  .content-wrapper {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
  }
}
</style>
