<template>
  <div class="explore">
    <h1>Explore</h1>
    <div class="desc" v-show="show">
      <p>
        There are so many amazing sections just waiting to be discovered by young explorers like
        you!
      </p>
      <p>Ready to explore?</p>
      <p>Start your voyage of exploration by clicking around below.</p>
    </div>
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
          desc: 'Check out stories about the bushland and learn along the way...'
        },
        {
          imgUrl: require('assets/images/explore_image/facts.jpg'),
          title: 'FACT TIME!',
          desc: 'Find out more about the invasive animals and plants in the bushland...'
        }
      ]
    };
  },
  methods: {
    toCard(card) {
      console.log(card);
      if (card.name === 'FACT TIME!') {
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
  .desc {
    line-height: 1.5;
    position: relative;
    z-index: 9;
    margin-top: 20px;
    text-align: center;
  }
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
