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
      screenWidth: document.body.clientWidth,
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
    this.checkIsMobile(document.body.clientWidth);

    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
  methods: {
    ...mapActions(['setIsMobile']),
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
        this.screenWidth = val;
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

<style lang="scss"></style>
