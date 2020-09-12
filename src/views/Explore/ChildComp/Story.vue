<template>
  <div class="story">
    <img src="~assets/images/bg.png" class="bg" />
    <h2>{{ showStory ? stories[storyIndex].title : 'Story' }}</h2>
    <div class="btn-group">
      <span class="goBack" @click="goBack">Back</span>
      <p class="instruction" v-if="showStory && !isMobile">
        Please click on the page corner to flip the page.
      </p>
    </div>
    <cards
      :content="stories"
      :clickable="true"
      @toCard="openStory"
      ref="cards"
      v-show="!showStory"
    />
    <transition>
      <flipbook v-if="showStory" :story="stories[storyIndex]" />
    </transition>
  </div>
</template>

<script>
import Cards from 'components/content/Cards';
import Flipbook from 'components/content/Flipbook';
import { mapGetters } from 'vuex';

export default {
  name: 'Story',
  created() {
    this.showStory = false;
    this.storyIndex = -1;
  },
  destroyed() {
    this.$parent.$refs.wrapper.style.position = '';
  },
  data() {
    return {
      showStory: false,
      storyIndex: -1,
      stories: [
        {
          imgUrl: require('assets/images/stories/pig/1.jpg'),
          title: 'The Monstrous Pig',
          desc:
            'The story is plotted in bushland where two trees are talking to each other on the topic of how feral pigs can harm them and cause damages to the bushland.',
          pages: [
            {
              page: '1',
              image: require('assets/images/stories/pig/1.jpg')
            },
            {
              page: '2',
              image: require('assets/images/stories/pig/2.jpg')
            },
            {
              page: '3',
              image: require('assets/images/stories/pig/3.jpg')
            },
            {
              page: '4',
              image: require('assets/images/stories/pig/4.jpg')
            },
            {
              page: '5',
              image: require('assets/images/stories/pig/5.jpg')
            },
            {
              page: '6',
              image: require('assets/images/stories/pig/6.jpg')
            },
            {
              page: '7',
              image: require('assets/images/stories/pig/7.jpg')
            },
            {
              page: '8',
              image: require('assets/images/stories/pig/8.jpg')
            },
            {
              page: '9',
              image: require('assets/images/stories/pig/9.jpg')
            },
            {
              page: '10',
              image: require('assets/images/stories/pig/10.jpg')
            }
          ]
        },
        {
          imgUrl: require('assets/images/stories/weeds/1.jpg'),
          title: 'School Trip To Bushland',
          desc:
            'The story is plotted in bushland where two school students went for the excursion. While excursion they are identifying weeds in bushland. ',
          pages: [
            {
              page: '1',
              image: require('assets/images/stories/weeds/1.jpg')
            },
            {
              page: '2',
              image: require('assets/images/stories/weeds/2.jpg')
            },
            {
              page: '3',
              image: require('assets/images/stories/weeds/3.jpg')
            },
            {
              page: '4',
              image: require('assets/images/stories/weeds/4.jpg')
            },
            {
              page: '5',
              image: require('assets/images/stories/weeds/5.jpg')
            },
            {
              page: '6',
              image: require('assets/images/stories/weeds/6.jpg')
            },
            {
              page: '7',
              image: require('assets/images/stories/weeds/7.jpg')
            },
            {
              page: '8',
              image: require('assets/images/stories/weeds/8.jpg')
            },
            {
              page: '9',
              image: require('assets/images/stories/weeds/9.jpg')
            },
            {
              page: '10',
              image: require('assets/images/stories/weeds/10.jpg')
            }
          ]
        },
        {
          imgUrl: require('assets/images/stories/bushfire/1.jpg'),
          title: 'Bushfire',
          desc:
            'The story is plotted in a home where child ask her dad to take her to visit bushland and after reaching there bush fire takes place due to human mistake.',
          pages: [
            {
              page: '1',
              image: require('assets/images/stories/bushfire/1.jpg')
            },
            {
              page: '2',
              image: require('assets/images/stories/bushfire/2.jpg')
            },
            {
              page: '3',
              image: require('assets/images/stories/bushfire/3.jpg')
            },
            {
              page: '4',
              image: require('assets/images/stories/bushfire/4.jpg')
            },
            {
              page: '5',
              image: require('assets/images/stories/bushfire/5.jpg')
            },
            {
              page: '6',
              image: require('assets/images/stories/bushfire/6.jpg')
            },
            {
              page: '7',
              image: require('assets/images/stories/bushfire/7.jpg')
            },
            {
              page: '8',
              image: require('assets/images/stories/bushfire/8.jpg')
            },
            {
              page: '9',
              image: require('assets/images/stories/bushfire/9.jpg')
            },
            {
              page: '10',
              image: require('assets/images/stories/bushfire/10.jpg')
            }
          ]
        }
      ]
    };
  },
  components: { Cards, Flipbook },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    openStory(card) {
      this.storyIndex = card.index;
      this.showStory = !this.showStory;
    },
    goBack() {
      if (this.showStory && this.storyIndex > -1) {
        this.showStory = false;
        this.storyIndex = -1;
      } else {
        this.$router.push('/explore');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.story {
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
    // margin-top: 1px;
  }
  .btn-group {
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 24px;
    display: flex;
    justify-content: flex-start;
    position: relative;
    align-items: center;
    margin-top: 10px;
    span {
      background-color: $background-color;
      border-radius: 8px;
      padding: 5px 15px;
      color: #fff;
      font-weight: 600;
      // margin-right: 20px;
      cursor: pointer;
    }
    .instruction {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #aaa;
    }
  }
}
</style>
