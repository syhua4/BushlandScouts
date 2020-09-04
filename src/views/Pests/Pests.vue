<template>
  <div class="pests">
    <h1>Pests</h1>
    <cards :content="species" :clickable="true" @toCard="toCard" twoCards />
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
      species: [
        {
          imgUrl:
            'https://img.pixers.pics/pho(s3:400/FO/21/60/57/25/1/400_FO216057251_9c45bbfa939cd00a27aff05fcd39ac4c,400,400,jpg)/cortinas-opacas-monocromo-blanco-y-negro-perro-gato-mascota-animal-pata-pie-mano-dibujado-tinta-bosquejo-de-patrones-sin-fisuras-textura-vector-de-fondo.jpg.jpg',
          title: 'Feral Animals',
          desc:
            'Feral animals are wild animals that lives in the bush. They attack and hurt our native animals. They eats the vegetation in the bushland and impact the biodiversity.'
        },
        {
          imgUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTg9YydG4IqiWYgGVeDju5OolkncSNqurCpBA&usqp=CAU',
          title: 'Weeds',
          desc:
            'Weeds are plants growing where it is not unwanted. They outgrow native plants and takeover the bushland. Native animals can lose their home and food.'
        }
      ]
    };
  },
  methods: {
    toCard(name) {
      this.playing = true;
      if (name === 'Feral Animals') {
        this.$router.push('/pests/animals');
      } else {
        this.$router.push('/pests/plants');
      }
      this.$refs.wrapper.style.position = 'absolute';
    }
  }
};
</script>

<style lang="scss" scoped>
.pests {
  position: relative;
  @include font_size($m);
  .pest-wrapper {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
