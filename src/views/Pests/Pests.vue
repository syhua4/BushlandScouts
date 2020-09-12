<template>
  <div class="pests">
    <h1>Pests</h1>
    <div class="desc" v-show="show">
      <p>
        Did you know what pests are in Bushland? Did you know their characteristics? Did you know
        what to do when you meet them?
      </p>
      <p>
        Everything you want to know is in this section, choose plants or animals to start the
        journey！
      </p>
    </div>
    <cards
      :content="species"
      :clickable="true"
      @toCard="toCard"
      twoCards
      ref="cards"
      :isShow="show"
    />
    <div class="pest-wrapper" ref="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Cards from 'components/content/Cards';

export default {
  name: 'Pests',
  components: {
    Cards
  },
  data() {
    return {
      show: true,
      species: [
        {
          imgUrl: require('assets/images/pest_image/animals.png'),
          title: 'Feral Animals',
          desc:
            'Feral animals are wild animals that lives in the bush. They attack and hurt our native animals. They eats the vegetation in the bushland and impact the biodiversity.'
        },
        {
          imgUrl: require('assets/images/pest_image/plants.png'),
          title: 'Weeds',
          desc:
            'Weeds are plants growing where it is not unwanted. They outgrow native plants and takeover the bushland. Native animals can lose their home and food.'
        }
      ]
    };
  },
  methods: {
    toCard(card) {
      if (card.name === 'Feral Animals') {
        this.$router.push('/pests/animals');
      } else {
        this.$router.push('/pests/plants');
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
.pests {
  position: relative;
  @include font_size($m);
  .desc {
    line-height: 1.5;
    position: relative;
    z-index: 9;
    margin-top: 20px;
    text-align: center;
  }
  .pest-wrapper {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
