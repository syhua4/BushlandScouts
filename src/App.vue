<template>
  <div id="app">
    <img src="~assets/images/bg.jpg" class="bg" />
    <nav-bar :navItems="navigation">
      <img slot="logo" src="~assets/images/logo.png" />
    </nav-bar>
    <router-view />
  </div>
</template>
<script>
import NavBar from 'components/common/NavBar/NavBar';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'App',
  components: { NavBar },

  data() {
    return {
      screenWidth: document.body.clientWidth,
      dpr: Math.floor(window.devicePixelRatio),
      navigation: [
        {
          name: 'HOME',
          to: '/',
          icon: 'icon-home'
        },
        {
          name: 'PESTS',
          to: '/pests',
          icon: 'icon-pest'
        },
        {
          name: 'GAMES',
          to: '/games',
          icon: 'icon-game'
        },
        {
          name: 'EXPLORE',
          to: '/explore',
          icon: 'icon-explore'
        }
      ]
    };
  },
  mounted() {
    this.setDpr(parseInt(this.dpr));
    this.checkIsMobile(document.body.clientWidth);

    this.checkIsMobile(
      this.dpr <= 2 ? document.body.clientWidth : document.body.clientWidth / this.dpr
    );

    window.onresize = () => {
      this.screenWidth =
        this.dpr <= 2 ? document.body.clientWidth : document.body.clientWidth / this.dpr;
    };
  },
  methods: {
    ...mapActions(['setDpr', 'setIsMobile']),
    checkIsMobile(val) {
      if (val <= 768 && !this.isMobile) {
        this.setIsMobile(true);
      } else if (val > 768) {
        this.setIsMobile(false);
      }
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = this.dpr <= 2 ? val : val / this.dpr;
        this.timer = true;
        this.checkIsMobile(val);
        setTimeout(() => {
          this.timer = false;
        }, 350);
      }
    }
  }
};
</script>

<style lang="scss">
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
