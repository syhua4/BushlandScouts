<template>
  <div class="home">
    <banner :banners="banners" />
    <div class="card-wrapper" v-if="isMobile">
      <cards title="WHAT IS BUSHLAND" :content="bushland" />
      <cards title="WHAT BUSHLAND CAN DO FOR US" :content="importance" />
      <cards title="NEWSLETTER FROM THE BUSH" :content="newsletter" />
      <cards title="LET'S PROTECT OUR BUSHLAND" :content="solution" />
    </div>
    <div v-else>
      <flipping-cards title="WHAT IS BUSHLAND" :content="bushland" />
      <flipping-cards title="WHAT BUSHLAND CAN DO FOR US" :content="importance" />
      <flipping-cards title="NEWSLETTER FROM THE BUSH" :content="newsletter" />
      <flipping-cards title="LET'S PROTECT OUR BUSHLAND" :content="solution" />
    </div>
  </div>
</template>

<script>
import Banner from 'components/content/Banner';
import Cards from 'components/content/Cards';
import FlippingCards from 'components/content/FlippingCard';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { Banner, Cards, FlippingCards },
  data() {
    return {
      banners: [
        { id: 'pic1', picUrl: require('assets/images/banners/1.jpg') },
        { id: 'pic2', picUrl: require('assets/images/banners/2.jpg') },
        { id: 'pic3', picUrl: require('assets/images/banners/3.jpg') },
        { id: 'pic4', picUrl: require('assets/images/banners/4.jpg') },
        { id: 'pic5', picUrl: require('assets/images/banners/5.jpg') },
        { id: 'pic5', picUrl: require('assets/images/banners/6.jpg') }
      ],
      bushland: [
        {
          title: 'The Australian Bush',
          imgUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Brisbane_Koala_Bushlands_%287114389987%29.jpg/1599px-Brisbane_Koala_Bushlands_%287114389987%29.jpg',
          desc:
            'Bushland is wooded area, it covers any habitat from thin to thick woody shrubs and bushes to tall dense forests.'
        },
        {
          title: 'Home to Native Species',
          imgUrl: 'https://nomadsworld.com/wp-content/uploads/2018/04/wombat-commons.jpg',
          desc:
            'Bushland provides a home for thousands of native animals and plants. The cute wombat lives inside the bush.'
        },
        {
          title: 'In The Early Days',
          imgUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Australia_Aboriginal_Culture_011.jpg/1599px-Australia_Aboriginal_Culture_011.jpg',
          desc:
            'Indigenous Aboriginals relies on bushlands to survive. Bushland provides them with food and woods for fuel.'
        }
      ],
      importance: [
        {
          title: 'Provides Shelter for Animals and Plants',
          imgUrl: 'https://www.newidea.com.au/media/41375/banksia.jpg?width=720&center=0.0,0.0',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Act as Carbon Sink',
          imgUrl: 'https://cdn.pixabay.com/photo/2019/02/27/17/52/germinate-4024588_960_720.jpg',
          desc: 'Forests and trees absorb CO2 and store it in their leaves,stems, trunks and roots'
        },
        {
          title: 'Slow Down Global Warming',
          imgUrl:
            'https://img.freepik.com/free-vector/illustration-global-warming-concept_53876-20557.jpg?size=626&ext=jpg',
          desc:
            'Plants and trees in bushland plays an important role in regulating the climate because they absorb carbon dioxide from the air and release oxygen back into it.'
        },
        {
          title: 'Prevent Water Erosion',
          imgUrl: 'https://www.agric.wa.gov.au/sites/gateway/files/4378049%20Water%20erosion.jpg',
          desc: 'Bushland '
        },
        {
          title: 'Prevent Wind Erosion',
          imgUrl: 'https://cdn.newsapi.com.au/image/v1/dff753c08c4ba5331032d4c34d9b1c27',
          desc: 'Bushland '
        },
        {
          title: 'Provides Healthy and Delicious Food',
          imgUrl:
            'https://www.killyourdarlings.com.au/wp-content/uploads/2019/10/37322722230_731a44af69_k.jpg',
          desc: 'Bushland '
        }
      ],
      newsletter: [
        {
          title: 'Bushfire',
          imgUrl:
            'https://robbreportedit.files.wordpress.com/2020/01/shutterstock_1608574255-1.jpg?w=1000',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Deforestration',
          imgUrl:
            'https://truththeory.com/wp-content/uploads/2018/03/IMG_20180307_224419-600x398.png',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Invasive Intruders',
          imgUrl: 'https://www.bionet.nz/assets/Uploads/feralcat3-Cropped.jpg',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Litter Dumping Ground',
          imgUrl: 'https://cdn.newsapi.com.au/image/v1/6058862cd3b6eb6d8e06ebc6171f4c7f?width=1024',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        }
      ],
      solution: [
        {
          title: 'Identify the invaders',
          imgUrl: 'https://cdn.dribbble.com/users/35810/screenshots/3286201/500-01-shot1.jpg',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Inform the authority',
          imgUrl:
            'https://img.freepik.com/free-vector/group-kids-picking-up-rubbish_1308-31447.jpg?size=626&ext=jpg',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Scouts action',
          imgUrl:
            'https://img.freepik.com/free-vector/group-kids-picking-up-rubbish_1308-31447.jpg?size=626&ext=jpg',
          desc:
            'Bushland provides a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['isMobile'])
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  @include font_size($m);
  .cards {
    max-width: 1024px;
    margin: 0 auto;
  }
  .backtop {
    overflow: scroll;
    height: 100%;
  }
}
</style>
