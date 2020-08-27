<template>
  <div class="games">
    <cards :content="games" :clickable="true" @toCard="toCard" />
    <div class="game-wrapper">
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
      games: [
        {
          imgUrl:
            'https://ca-times.brightspotcdn.com/dims4/default/e7dcb92/2147483647/strip/true/crop/633x356+37+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe0%2F56%2F0ad1f710b54bb056251a500cbe41%2Fla-lh-gehry-hadid-rugs-photos-20130220-005',
          title: 'Jigsaw Puzzle',
          desc: ''
        },
        { imgUrl: require('assets/images/mole/start.jpg'), title: 'Whac-A-Pest', desc: '' }
      ]
    };
  },
  methods: {
    toCard(name) {
      if (name === 'Jigsaw Puzzle') {
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
  .game-wrapper {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: $background-color;
  }
}
</style>
