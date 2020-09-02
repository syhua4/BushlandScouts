<template>
  <div class="footer" :class="{ fixed: isFix }">
    <div class="item-wrapper" :class="{ mobile: isMobile }">
      <span v-for="(item, index) in items" :key="index">{{ item }}</span>
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
      items: ['About Us', 'Privacy Policy', 'Contact Us', 'Feedback', 'Program and Compaign']
    };
  },
  props: {
    isFix: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: 2;
  background-color: $background-color;
  display: flex;
  // justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  @include font_size($m);
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
      flex-direction: column;
      span {
        margin: 10px;
      }
    }
    span {
      margin: 30px 20px 20px;
    }
  }
  .copyright {
    padding: 20px 0;
    text-align: center;
    &.mobile {
      border-top: 1px solid #fff;
    }
  }
}
</style>
