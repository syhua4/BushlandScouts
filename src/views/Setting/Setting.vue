<template>
  <div class="setting">
    <audio src="~assets/shimmer.mp3" ref="fx" />
    <div class="container">
      <div class="content-wrapper">
        <div class="content">
          <div class="text">color theme</div>
          <div class="themes">
            <span @click="changeTheme('theme')" />
            <span @click="changeTheme('theme1')" />
            <span @click="changeTheme('theme2')" />
          </div>
        </div>
        <div class="content">
          <div class="text">sound effect</div>
          <el-switch v-model="soundSwitch"></el-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Setting',
  data() {
    return {
      soundSwitch: null
    };
  },
  created() {
    this.soundSwitch = this.toggleSound;
  },
  methods: {
    ...mapActions(['setSound']),
    changeTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  },
  computed: {
    ...mapGetters(['toggleSound'])
  },
  watch: {
    soundSwitch: {
      handler(val) {
        this.setSound(val);
        if (val) {
          this.$refs.fx.play();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.setting {
  @include font_size($m);
  height: calc(100vh - 200px);
  @include bg_color_sub();
  overflow-x: hidden;
  padding-top: 120px;
  text-align: center;

  .container {
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;

    &::before,
    .bubble {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      top: -150px;
      right: -150px;
      width: 300px;
      height: 300px;
      @include bg_color_sub_before();
      animation: transform 25s ease-in-out infinite both alternate,
        movement 20s ease-in-out infinite both;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 100px;
      left: -220px;
      width: 400px;
      height: 400px;
      @include bg_color_sub_after();
      animation: transform 25s ease-in-out infinite both alternate,
        movement 20s ease-in-out infinite both;
    }
    h2 {
      margin: 30px 0 20px;
      @include font_size($ml);
      font-weight: 800;
    }

    ul {
      max-width: 600px;
      padding-top: 75px;
      text-align: left;
      margin: 0 auto;
      li {
        @include font_color();

        margin-bottom: 40px;
      }
      a {
        @include font_color();

        text-decoration: underline;
      }
      p:last-child {
        margin-top: 30px;
      }
      img {
        width: 88px;
        height: 31px;
        display: block;
        margin: 10px 0;
      }
    }
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
    .content {
      display: flex;
      align-items: center;
      height: 30px;
      width: 300px;
      margin-bottom: 20px;
      justify-content: space-between;
      .text {
        text-transform: uppercase;
        font-weight: 600;
      }
      .themes {
        span {
          display: inline-block;
          margin-left: 5px;
          height: 30px;
          width: 30px;
          border: 2px solid #eee;
          background-color: $background-color;
          cursor: pointer;
          &:nth-child(2) {
            background-color: #febbbb;
          }
          &:nth-child(3) {
            background-color: $background-color2;
          }
        }
      }
    }
  }
  @keyframes transform {
    0%,
    100% {
      border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
    }
    14% {
      border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
    }
    28% {
      border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
    }
    42% {
      border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
    }
    56% {
      border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
    }
    70% {
      border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
    }
    84% {
      border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
    }
  }

  @keyframes movement {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: translateY(20%) rotateY(10deg);
    }
  }
  @media (max-width: 600px) {
    .container {
      padding: 0 20px;
    }
  }
}
</style>
