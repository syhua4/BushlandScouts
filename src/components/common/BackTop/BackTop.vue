<template>
  <div ref="btn" class="backtop">
    <transition name="fade">
      <el-button type="primary" :icon="icon" circle v-show="show" @click="backtop" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    length: {
      type: Number,
      default: 200
    },
    bottom: {
      type: Number,
      default: 75
    },
    right: {
      type: Number,
      default: 50
    },
    icon: {
      type: String,
      default: 'el-icon-caret-top'
    },
    speed: {
      type: Number,
      default: 100
    }
  },
  mounted() {
    var btn = this.$refs.btn;
    (btn.style.right = this.right + 'px'), (btn.style.bottom = this.bottom + 'px');
    this.$refs.btn.parentElement.onmousewheel = this.isShow;
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    backtop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.show = false;
    },
    isShow() {
      if (window.scrollY > 500) this.show = true;
      else this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.backtop {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 100;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
