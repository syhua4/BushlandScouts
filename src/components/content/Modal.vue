<template>
  <div class="modal-wrapper">
    <div class="modal-overlay active">
      <div class="modal active">
        <div class="header" :class="{ mobile: isMobile }">
          <span class="title">{{ title }}</span>
          <i class="iconfont icon-close" @click="closeModal" />
        </div>
        <!-- close modal -->

        <div class="modal-content">
          <slot name="modal-content" />
        </div>
        <!-- content -->
      </div>
      <!-- modal -->
    </div>
    <!-- overlay -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    closeModal() {
      this.$parent.speciesInfo = {};
    }
  }
};
</script>

<style lang="scss" scoped>
/**
 * Variables
 */
$button-bg: #0d52e9;
$speed: 0.6s;
$delay: ($speed * 0.5);
$easing: cubic-bezier(0.55, 0, 0.1, 1);

.modal-wrapper {
  position: relative;
  z-index: 20;
  // top: 50%;
  // z-index: 20;
  // left: 50%;
  // transform: translate(-50%, -50%);
  .modal {
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    position: relative;
    margin: 0 auto;
    background-color: #fff;
    width: 600px;
    max-width: 100%;
    min-height: 20rem;
    padding: 1rem;
    border-radius: 3px;
    opacity: 0;
    overflow-y: auto;
    visibility: hidden;
    box-shadow: 0 2px 10px rgba(#000, 0.1);
    backface-visibility: hidden;
    transform: scale(1.2);
    transition: all $speed $easing;

    .header {
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: relative;
      text-transform: uppercase;
      @include font_size($ml);
      &.mobile {
        margin-top: 10px;
      }
      span {
        font-weight: 600;
      }
      .iconfont {
        position: absolute;
        right: 10px;
        top: 0;
        color: #ccc;
        &:hover {
          color: #333;
          transition: color 0.3s linear;
        }
      }
    }

    .modal-content {
      opacity: 0;
      backface-visibility: hidden;
      transition: opacity $speed $easing;
      transition-delay: $delay;
    } // content

    &.active {
      visibility: visible;
      opacity: 1;
      transform: scale(1);

      .modal-content {
        opacity: 1;
      }

      .close-modal {
        transform: translateY(10px);
        opacity: 1;
      }
    }
  }

  /**
 * Overlay
 * -- only show for tablet and up
 */
  @media only screen and (min-width: 768px) {
    .modal-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      background-color: rgba(#000, 0.6);
      opacity: 0;
      visibility: hidden;
      backface-visibility: hidden;
      transition: opacity $speed $easing, visibility $speed $easing;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }
  } // media query

  /**
 * Mobile styling
 */
  @media only screen and (max-width: 767px) {
    h1 {
      font-size: 1.5rem;
    }

    .modal {
      position: fixed;
      top: 58px;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-overflow-scrolling: touch;
      border-radius: 0;
      transform: scale(1.1);
      padding: 0 !important;
      .modal-content {
        padding: 20px;
      }
    }

    .close-modal {
      right: 20px !important;
    }
  } // media query
}
</style>
