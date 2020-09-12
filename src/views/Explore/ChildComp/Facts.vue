<template>
  <div class="facts">
    <img src="~assets/images/bg.png" class="bg" />
    <h2>{{ showFacts ? (factIndex == 1 ? 'Weed Facts' : 'Animal Facts') : 'Facts' }}</h2>
    <div class="btn-group">
      <span class="goBack" @click="goBack">Back</span>
      <span class="goAnother" @click="goAnother" v-show="showFacts"
        >Check out {{ factIndex == 0 ? 'Weed Facts' : 'Animal Facts' }}</span
      >
    </div>
    <cards
      :content="facts"
      :clickable="true"
      @toCard="openFacts"
      ref="cards"
      v-show="!showFacts"
      two-cards
    />
    <flipping-card v-if="showFacts" :content="getContent" />
  </div>
</template>

<script>
import Cards from 'components/content/Cards';
import FlippingCard from 'components/content/FlippingCard';

export default {
  name: 'Facts',
  components: { Cards, FlippingCard },
  created() {
    this.showFacts = false;
    this.factIndex = -1;
  },
  destroyed() {
    this.$parent.$refs.wrapper.style.position = '';
  },
  computed: {
    getContent() {
      let content;
      if (this.factIndex === 0) {
        content = this.facts[0].animal;
      } else if (this.factIndex === 1) {
        content = this.facts[1].plant;
      }
      return content;
    }
  },
  data() {
    return {
      showFacts: false,
      factIndex: -1,
      facts: [
        {
          imgUrl: require('assets/images/placeholder.png'),
          title: 'Animal Facts',
          desc: 'WIP',
          animal: [
            {
              title: 'Did you know rabbits are amazing athletes?',
              imgUrl:
                'https://i.pinimg.com/originals/a5/ab/2b/a5ab2b852070ccd3a0d201390e7b046a.jpg',
              desc: [
                'Rabbit can jump up to 90cm in one leap!',
                'A rabbit’s teeth never stop growing!',
                'One rabbit can have up to 800 offspring per year.'
              ]
            },
            {
              title: 'Did you know deer can swim?',
              imgUrl: 'https://www.business.qld.gov.au/__data/assets/image/0028/84385/Red-deer.jpg',
              desc: [
                'Deers can jump high and swim well',
                'Deers are an emerging pest in Australia, they cause damage the natural environment and agricultural businesses.'
              ]
            },
            {
              title: 'Did you know foxes can run 30 miles per hour?',
              imgUrl: 'https://www.business.qld.gov.au/__data/assets/image/0027/84357/Fox-2.JPG',
              desc: [
                'A fox can run 30 miles per hour.',
                'Foxes use 28 different sounds to communicate.',
                'Foxes eat almost anything, including berries, insects and even jam sandwiches.'
              ]
            },
            {
              title: 'Did you know cane toads does not drink water?',
              imgUrl:
                'https://www.business.qld.gov.au/__data/assets/image/0023/84326/CaneToadHead_SamFraser-SmithFlickrCreativeCommons.jpg',
              desc: [
                'The biggest cane toad weighed more than 5 pounds',
                'Cane toad does not drink water. It absorbs dew and moisture from the soil through the skin on the belly.'
              ]
            },
            {
              title: 'Did you kown buffalo can run 30 miles per hour?',
              imgUrl:
                'https://www.business.qld.gov.au/__data/assets/image/0025/84463/WaterBuffaloHead_GunnarPetterssonFlickrCreativeCommons.jpg',
              desc: [
                'Water buffalo is the second largest type of wild cattle that can be seen in the wild.',
                'Water buffalo can run up to 30 miles per hour when faced with danger.'
              ]
            },
            {
              title: 'Did you know Dingo howls like a wolf?',
              imgUrl:
                'https://www.business.qld.gov.au/__data/assets/image/0022/84352/Dingo-with-prey.jpg',
              desc: [
                'Dingoes are the largest land predator in Australia.',
                'Unlike other dogs, dingo does not bark. It howls like a wolf.',
                'Dingo is able to rotate its head for almost 180 degrees in both directions.'
              ]
            }
          ]
        },
        {
          imgUrl: require('assets/images/placeholder.png'),
          title: 'Plant Facts',
          desc: 'WIP',
          plant: [
            {
              title: 'Did you know blackberries are weeds in Australia?',
              imgUrl:
                'https://weeds.brisbane.qld.gov.au/sites/default/files/styles/large/public/images/rubus_fruticosus37.jpg?itok=BmVtQdG0',
              desc: [
                'Blackberries are classified as weeds in Australia and New Zealand.',
                'Blackberries turn from green to red to black when they’re fully ripe.'
              ]
            },
            {
              title: 'Did you know willow can grow 3m each year?',
              imgUrl:
                'https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/land-management/health-pests-weeds-diseases/weeds-diseases/invasive-plants/restricted/tortured-willow/TorturedWillow_TomDeGomezBugwoodCreativeCommons.jpg',
              desc: [
                'Willow is one of the fastest growing plants in the world. It can grow 3m each year.',
                'People chewed the bark of the willow tree to treat fever, inflammation and pain in the past.'
              ]
            },
            {
              title: 'Did you know alligator weeds are deadly?',
              imgUrl:
                'https://www.business.qld.gov.au/__data/assets/image/0020/81542/Alligator-weed-flower.JPG',
              desc: [
                'Alligator weeds are classified as deadly weed in more than 30 countries.',
                "Alligator weed's stems can form large mat. This mat is strong enough to support an adult man."
              ]
            },
            {
              title: 'Did you know honey locust can make bowls?',
              imgUrl:
                'https://www.business.qld.gov.au/__data/assets/image/0024/81627/Honey-locust-stem-and-spikes.JPG',
              desc: [
                'Honey locust usually lives around 100 years.',
                "Honey locust's pulp is a sweetener and a source of food",
                'The aboriginals used wood of honey locust for bowls.'
              ]
            },
            {
              title: "Did you know momisa's leaves will fold?",
              imgUrl: 'https://kids.kiddle.co/images/f/fe/Mimosa_Pudica.gif',
              desc: [
                'Mimosa folds its leaves during the night and when touched.',
                "Some animals are afraid of moving plants (momisa) and would rather eat a plant that won't move."
              ]
            },
            {
              title: "Did you know Scotch broom's seeds are toxic?",
              imgUrl:
                'https://weeds.brisbane.qld.gov.au/sites/default/files/styles/large/public/images/cytisusscopariusscoparius13.jpg?itok=EfwVpcb2',
              desc: [
                'Scotch broom can produce up to 10,000 seed per season.',
                'Seeds of Scotch broom are toxic for humans and livestock.'
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    openFacts(card) {
      this.factIndex = card.index;
      this.showFacts = !this.showFacts;
    },
    goBack() {
      if (this.showFacts && this.factIndex > -1) {
        this.showFacts = false;
        this.storyIndex = -1;
      } else {
        this.$router.push('/explore');
      }
    },
    goAnother() {
      if (this.showFacts && this.factIndex > -1) {
        if (this.factIndex === 0) {
          this.factIndex = 1;
        } else {
          this.factIndex = 0;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.facts {
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
    z-index: 0;
  }
  h2 {
    position: relative;
    z-index: 9;
    text-align: center;
    font-weight: 800;
    @include font_size($l);
  }
  .btn-group {
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    position: relative;
    span {
      background-color: $background-color;
      border-radius: 8px;
      padding: 5px 15px;
      color: #fff;
      font-weight: 600;
      // margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
