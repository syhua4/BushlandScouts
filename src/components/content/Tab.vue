<template>
  <div class="tab-control">
    <div class="tab-header">
      <span
        class="tab"
        :class="{ active: activeIndex === index }"
        v-for="(title, index) in titles"
        :key="index"
        @click="indexClick(index)"
        >{{ title }}</span
      >
    </div>
    <div class="tab-content-wrapper">
      <div class="tab-content-0" v-if="activeIndex === 0">
        <div class="left-wrapper">
          <img :src="speciesInfo.IMAGE" alt="" />
          <div class="stats">
            <div class="heading">
              Class Name: <em> {{ speciesInfo.CLASS_NAME }}</em>
            </div>
            <div class="heading">
              Family Name: <em> {{ speciesInfo.FAMILY_NAME }}</em>
            </div>
            <div class="heading">
              Common Name: <em> {{ speciesInfo.COMMON_NAME }}</em>
            </div>
            <div class="heading">
              Scientific Name: <em> {{ speciesInfo.SCIENTIFIC }}</em>
            </div>
          </div>
        </div>
        <div class="right-wrapper">
          <div class="heading">Description:</div>
          {{ speciesInfo.DESCRIPTION }}
        </div>
      </div>
      <div class="tab-content-1" v-if="speciesInfo && activeIndex === 1 && isAnimal">
        <div class="reason" v-for="(item, index) in separateImpact" :key="index + random + 1">
          <i class="iconfont icon-plant" /> {{ item }}
        </div>
      </div>
      <div class="tab-content-1" v-if="speciesInfo && activeIndex === 1 && !isAnimal">
        <div class="reason" v-for="(item, index) in plant.reason" :key="index + random + 1">
          <i class="iconfont icon-plant" /> {{ item }}
        </div>
      </div>
      <div class="tab-content-2" v-if="activeIndex === 2 && isAnimal">
        <h2>--- DO'S ---</h2>
        <div class="dos" v-for="(item, index) in animal.do" :key="index * random + 2">
          <i class="iconfont icon-do" />{{ item }}
        </div>
        <h2>--- DON'TS ---</h2>
        <div class="dont" v-for="(item, index) in animal.dont" :key="index + random + 3">
          <i class="iconfont icon-dont" />{{ item }}
        </div>
      </div>
      <div class="tab-content-2" v-if="activeIndex === 2 && !isAnimal">
        <h2>--- DO'S ---</h2>
        <div class="dos" v-for="(item, index) in plant.do" :key="index * random + 2">
          <i class="iconfont icon-do" />{{ item }}
        </div>
        <h2>--- DON'TS ---</h2>
        <div class="dont" v-for="(item, index) in plant.dont" :key="index + random + 3">
          <i class="iconfont icon-dont" />{{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data() {
    return {
      activeIndex: 0,
      plant: {
        do: [
          'Ask for guardian assistance to identify the weed.',
          'Ask for guardian assistance to stop the spread.',
          'Make sure your shoes are weed free before going into the bushland.',
          'Check your garden at home, keep your garden weed-free.'
        ],
        dont: [
          'Do not interact with weeds. Some weeds can lead to allergies and skin rash.',
          "Do not pick and transport wildflowers that you can't identify.",
          'Do not pick the flowers of noxious weeds and take them home.',
          'Do not litter in the bushland, it helps weeds to grow.'
        ],
        reason: [
          'Strong vitality - Weeds are very active and strong. They can survive under extreme weathers that other native plant can not. Because of this, weeds can replace the natural bushland.',
          "Threaten native species live in bushlands - When weeds out-grows the native plants, they took native plants' resources - water, space, sunlight.",
          'Destroy the natural habitat for species live in the bushland - Weeds out-complete the native plants. Animals that relied on these native plants for food, nesting and shelter are suffering.',
          'Weeds can grow quickly and spread across areas; They can strangle trees and spread across the entire water surface. This causes pollution to the river streams and affect the environment.',
          'Some weeds even pose a direct threat to human health, causing respiratory diseases such as asthma, especially children will be more affected.'
        ]
      },
      animal: {
        do: [
          'Report to your parents or teachers.',
          'Get away from these kinds of animals.',
          'Take a photo and search online to learn its relevant knowledge.',
          'Protect your pets from invasive animals when travelling with them.'
        ],
        dont: [
          'Do Not feed them.',
          'Do Not try to take invasive animals home.',
          'Do Not try to deal with invasive animals by yourself.',
          "Do Not 'pack a pest' when travelling."
        ]
      }
    };
  },
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    speciesInfo: {
      type: Object,
      default: () => {}
      // required: true
    }
  },
  computed: {
    isAnimal() {
      return this.$route.name === 'Animals';
    },
    random() {
      return Math.round(Math.random() * 100);
    },
    separateImpact() {
      let sentence;
      if (Object.keys(this.speciesInfo).length) {
        sentence = this.speciesInfo.IMPACT.split(';');
      }
      return sentence;
    }
  },
  methods: {
    indexClick(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-control {
  @include font_size($m);
  position: relative;
  height: 100%;
  .tab-header {
    display: flex;
    justify-content: flex-start;
    line-height: 0.9;
    border-bottom: 5px solid $background-color;
    margin-bottom: 10px;
    text-align: left;
    span {
      cursor: pointer;
      display: block;
      padding: 10px;
      margin-right: 15px;
      margin-bottom: -2px;
      border-radius: 5px 5px 0 0;
      &.active,
      &:hover {
        background-color: $background-color;
        color: #fff;
      }
    }
  }
  .tab-content-wrapper {
    min-height: 300px;
    max-height: 350px;
    overflow: scroll;
    .tab-content-0 {
      display: flex;
      padding-top: 20px;
      .right-wrapper {
        padding: 0 15px;
        .heading {
          margin-bottom: 10px;
        }
      }
      .heading {
        font-weight: 800;
        em {
          font-weight: 400;
        }
      }
      img {
        display: block;
        height: 200px;
        width: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 20px;
        margin-right: 40px;
      }
      .stats {
        width: 220px;
      }
    }
    .tab-content-1 {
      display: flex;
      flex-direction: column;
      .reason {
        padding: 10px;
        display: flex;
        align-items: center;
        .icon-plant {
          margin-right: 20px;
          color: $background-color;
        }
      }
    }
    .tab-content-2 {
      h2 {
        font-weight: 800;
        text-align: center;
        &:nth-of-type(2) {
          margin-top: 20px;
        }
      }
      .dos,
      .dont {
        padding: 2px 0;
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 20px;
          @include font_size(20);
          color: #9ace43;
          font-weight: 600;
        }
        .icon-dont {
          color: #e84955;
        }
      }
    }
  }
}
@media only screen and (max-width: 400px) {
  .tab-control {
    box-sizing: border-box;
    .tab-content-0 {
      padding-top: 0;
      flex-direction: column;
      .left-wrapper {
        display: flex;
        .heading {
          em {
            display: block;
          }
        }
        img {
          margin-right: 20px;
          width: 150px;
          height: 150px;
        }
        .stats {
          flex: 1;
        }
      }
      .right-wrapper {
        padding-top: 20px;
      }
    }
  }
}
</style>
