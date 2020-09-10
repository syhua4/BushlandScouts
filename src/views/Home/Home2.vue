<template>
  <div class="home">
    <banner :banners="banners" @scroll="scrollTo" />
    <div class="card-wrapper" v-if="isMobile">
      <cards title="WHAT IS BUSHLAND" :content="bushland" ref="card1" />
      <cards title="WHAT BUSHLAND CAN DO FOR US" :content="importance" />
      <cards title="NEWSLETTER FROM THE BUSH" :content="newsletter" />
      <cards title="LET'S PROTECT OUR BUSHLAND" :content="solution" />
    </div>
    <div v-else>
      <flipping-cards title="WHAT IS BUSHLAND" :content="bushland" ref="card1" />
      <flipping-cards title="WHAT BUSHLAND CAN DO FOR US" :content="importance" />
      <flipping-cards title="HARSH TRUTH FROM THE BUSH" :content="newsletter" />
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
  name: 'Home2',
  components: { Banner, Cards, FlippingCards },
  data() {
    return {
      banners: [
        {
          id: 'pic1',
          btnText: 'Explore',
          picUrl: require('assets/images/banners/test-bg5.jpg'),
          title: 'protect our bushland',
          desc: 'explore why and how we can preserve our bushland',
          btnLink: '/'
        },
        {
          id: 'pic2',
          btnText: 'Identify',
          picUrl: require('assets/images/banners/test-bg2.jpg'),
          title: 'Identify the invaders',
          desc: 'There are over 100 species that damage our bushland',
          btnLink: '/pests'
        },
        {
          id: 'pic3',
          btnText: 'Play',
          picUrl: require('assets/images/banners/test-bg3.jpg'),
          title: 'Play and Learn',
          desc: 'Learn abou the invaders while have fun!',
          btnLink: '/games'
        },
        {
          id: 'pic4',
          btnText: 'Explore',
          picUrl: require('assets/images/banners/test-bg4.jpg'),
          title: 'Explore more and learn',
          desc: 'Take scout actions and protect our bushland',
          btnLink: '/explore'
        }
      ],
      bushland: [
        {
          title: 'The Australian Bush',
          imgUrl: require('assets/images/home_image/bushland.png'),
          desc:
            'Bushland is an uncultivated land that is covered with shrubs, trees, natural vegetation.'
        },
        {
          title: 'Home to Native Species',
          imgUrl: require('assets/images/home_image/koala.png'),
          desc:
            'Bushland is a home for thousands of native animals and plants. The cute wombat lives inside the bush.'
        },
        {
          title: 'In The Early Days',
          imgUrl: require('assets/images/home_image/aboriginal.png'),
          desc:
            'Indigenous Aboriginals relies on bushlands to survive. Bushland provides them with food and woods for fuel.'
        }
      ],
      importance: [
        {
          title: 'Provides Shelter for Animals and Plants',
          imgUrl: require('assets/images/home_image/kangaroo.png'),
          desc:
            'Bushland is a home for many threatened and endangered species. It provides a home for more than 80% of biodiverity on earth'
        },
        {
          title: 'Act as Carbon Sink',
          imgUrl: require('assets/images/home_image/tree.png'),
          desc: 'Forests and trees absorb CO2 and store it in their leaves,stems, trunks and roots.'
        },
        {
          title: 'Slow Down Global Warming',
          imgUrl:
            'https://img.freepik.com/free-vector/illustration-global-warming-concept_53876-20557.jpg?size=626&ext=jpg',
          desc:
            'Plants and trees in bushland play an important role in regulating the climate because they absorb carbon dioxide from the air and release oxygen back into it.'
        },
        {
          title: 'Prevent Water Erosion',
          imgUrl: require('assets/images/home_image/water_erosion.png'),
          desc:
            'The roots of bushland plants will also help to stabilize the soil by drinking excess water. In addition, they can reduce the effects of rainfall, wind, and overwatering.'
        },
        {
          title: 'Prevent Wind Erosion',
          imgUrl: require('assets/images/home_image/wind.png'),
          desc:
            'In bushland, the surface of the soil was shielded by trees. It reduces the wind speed and prevents the loss of fine particles and organic matter.'
        },
        {
          title: 'Provides Healthy and Delicious Food',
          imgUrl: require('assets/images/home_image/bush_food.png'),
          desc:
            'Bush vegetables and fruits are bursting with vitamins and minerals, It accounts for a large portion of indigenous diets.'
        }
      ],
      newsletter: [
        {
          title: 'Bushfire',
          imgUrl: require('assets/images/home_image/bushfire.png'),
          desc:
            'The 2019-2020 bushfire has burnt down 19830 hectares of bushland. Around 1.25 billion animals have been lost and caused a significant reduction in Queensland’s biological diversity, is the variety of life.'
        },
        {
          title: 'Deforestration',
          imgUrl: require('assets/images/home_image/deforestation.png'),
          desc:
            'Forest wood has a high usage for fuel, construction or manufacturing. Around 5,000 square kilometres of bushland are being destroyed annually and 85% happens in Queensland'
        },
        {
          title: 'Invasive Intruders',
          imgUrl: require('assets/images/home_image/fox.png'),
          desc:
            'Invasive intruders in bushland are animals and plants. They have an impact on native flora and fauna, reducing local biological diversity, is the variety of life.'
        },
        {
          title: 'Litter Dumping Ground',
          imgUrl: require('assets/images/home_image/litter.png'),
          desc:
            'Recently, there is a rise in waste material and household rubbish found in the bushland area. Hazardous waste will pollute the bushland and affect biological diversity, is the variety of life.'
        }
      ],
      solution: [
        {
          title: 'Identify the invaders',
          imgUrl: require('assets/images/home_image/identify.png'),
          desc:
            'Identify a variety of plants and animals that are harmful to the bushland, know what they looked like and why they are harmful to the bushland!',
          link: '/pests/'
        },
        {
          title: 'Learn about the invaders and have fun',
          imgUrl: require('assets/images/home_image/play.png'),
          desc:
            'Packed full of cool kids games that will test your knowledge and cunning, prepare for a challenge!',
          link: '/games'
        },
        {
          title: 'Scouts action',
          imgUrl: require('assets/images/home_image/action.png'),
          desc:
            'Do you want to explore Bushland? Do you want to know the conversation between plants and animals?',
          link: '/explore'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    scrollTo() {
      this.$refs.card1.$refs.header.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
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
