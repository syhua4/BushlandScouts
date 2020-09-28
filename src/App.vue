<template>
  <div id="app">
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
      navigation: [
        {
          name: 'HOME',
          to: '/',
          icon: 'icon-home'
        },
        {
          name: 'WEEDS',
          to: '/weeds',
          icon: 'icon-pest'
        }
      ]
    };
  },
  mounted() {
    this.setDpr(parseInt(this.dpr));

    this.checkIsMobile(screen.width >= 768 ? document.body.clientWidth : screen.width);

    window.onresize = () => {
      this.checkIsMobile(screen.width >= 768 ? document.body.clientWidth : screen.width);
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
    screenWidth: {
      immediate: true,
      handler(val) {
        if (!this.timer) {
          this.screenWidth = screen.width >= 768 ? val : screen.width;
          this.timer = true;
          this.checkIsMobile(val);
          setTimeout(() => {
            this.timer = false;
          }, 350);
        }
      }
    }
    // $route(to) {
    //   if (to.name !== 'Home' && !this.isMobile && to.matched.length === 1) {
    //     this.showFooter = true;

    //     this.fixedFooter = true;
    //   } else if (to.matched.length > 1) {
    //     this.showFooter = false;
    //   } else {
    //     this.showFooter = true;

    //     this.fixedFooter = false;
    //   }
    // }
  }
};
</script>
<style lang="scss">
#app {
}
</style>
