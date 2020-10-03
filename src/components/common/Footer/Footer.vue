<template>
  <div class="footer">
    <div class="item-wrapper" :class="{ mobile: isMobile }">
      <span v-for="(item, index) in items" :key="index" @click="toLink(item)">{{ item }}</span>
    </div>
    <span class="copyright" :class="{ mobile: isMobile }"
      >Copyright © 2020 Bushland Scouts Inc. All rights reserved</span
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Footer',
  data() {
    return {
      items: ['About', 'Privacy', 'Copyright', 'Attributions']
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    toLink(route) {
      this.$router.push(`/${route.toLowerCase()}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  color: #fff;
  position: relative;
  z-index: 2;
  background-color: $background-color;
  display: flex;
  // justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.2);
  @include font_size($ms);
  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .item-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &.mobile {
      span {
        margin: 10px;
      }
    }
    span {
      margin: 15px 20px 10px;
      cursor: pointer;
    }
  }
  .copyright {
    @include font_size($s);
    padding: 10px 0;
    text-align: center;
    &.mobile {
      border-top: 1px solid #fff;
    }
  }
}
</style>
