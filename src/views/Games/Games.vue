<template>
  <div class="games">
    <h1 v-show="!playing">Games</h1>
    <cards :content="games" :clickable="true" @toCard="toCard" twoCards />
    <div class="game-wrapper" :class="{ active: playing }" ref="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Cards from 'components/content/Cards';
export default {
  name: 'Games',
  components: {
    Cards
  },
  data() {
    return {
      playing: false,
      games: [
        {
          imgUrl:
            'https://ca-times.brightspotcdn.com/dims4/default/e7dcb92/2147483647/strip/true/crop/633x356+37+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe0%2F56%2F0ad1f710b54bb056251a500cbe41%2Fla-lh-gehry-hadid-rugs-photos-20130220-005',
          title: 'Jigsaw Puzzle',
          desc:
            'Move pieces around, and get fun facts about the mystery pest animals along the way!'
        },
        {
          imgUrl: require('assets/images/mole/start.jpg'),
          title: 'Whac-A-Pest',
          desc: 'Prove you know the pest animals in the bushland, whack them all!'
        }
        // {
        //   imgUrl:
        //     'https://st.depositphotos.com/1065578/3369/v/950/depositphotos_33696759-stock-illustration-paper-mosaic-triangles-texture-question.jpg',
        //   title: 'Quiz',
        //   desc: 'What do you know about our incredible bushlands?'
        // }
      ]
    };
  },
  methods: {
    toCard(card) {
      this.playing = true;
      if (card.name === 'Jigsaw Puzzle') {
        this.$router.push('/games/jigsaw');
      } else {
        this.$router.push('/games/whac-a-pest');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.games {
  @include font_size($m);
  margin-top: 50px;
  height: 100%;
  .cards {
    max-width: 1024px;
    margin: 0 auto;
  }
  .game-wrapper {
    overflow: hidden;
    position: fixed;
    top: 58px;
    left: 0;
    right: 0;
    background-color: #fff;
    &.active {
      bottom: 0;
      height: 100vh;
    }
  }
}
</style>
