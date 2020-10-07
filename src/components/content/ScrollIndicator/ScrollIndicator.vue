<template>
  <div class="scroll-indicator-wrapper">
    <transition name="fade">
      <div class="scroll-indicator" v-if="isShow">
        <div class="dots" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ScrollIndicator',
  data() {
    return {
      isShow: true
    };
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.isShow = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.scroll-indicator-wrapper {
  position: absolute;
  bottom: 20px;
  z-index: 100;
  width: 100%;
  .scroll-indicator {
    @include font_size($m);
    width: 20px;
    margin: 0 auto;
    position: relative;
    opacity: 0.5;
    &::before,
    &::after {
      content: '';
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    &::before {
      width: 12px;
      height: 12px;
      border-radius: 10px;
      border: 2px solid #333;
      animation: dot 3s infinite ease-in-out;
    }
    &::after {
      width: 7px;
      height: 7px;
      border-right: 2px solid #333;
      border-bottom: 2px solid #333;
      transform: rotate(45deg);
      animation: arrow 3s infinite ease-in-out;
      animation-delay: 0.75s;
      opacity: 0.25;
    }
    & > div {
      display: block;
      &::before,
      &::after {
        content: '';
        display: block;
        margin: 5px auto;
        border-radius: 10px;
        border: 2px solid #333;
        animation: dot 3s infinite ease-in-out;
      }
      &::before {
        width: 8px;
        height: 8px;
        animation-delay: 0.25s;
      }
      &::after {
        width: 6px;
        height: 6px;
        animation-delay: 0.5s;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

@keyframes dot {
  0% {
    transform: scale(0.75);
    opacity: 0.25;
  }
  25% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.75);
    opacity: 0.25;
  }
}

@keyframes arrow {
  0% {
    transform: scale(0.75) rotate(45deg);
    opacity: 0.25;
  }
  25% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.75) rotate(45deg);
    opacity: 0.25;
  }
}
</style>
