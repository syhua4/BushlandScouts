<template>
  <div id="app">
    <nav-bar :navItems="navigation">
      <img slot="logo" src="~assets/images/logo.png" alt="logo" />
    </nav-bar>
    <keep-alive include="Weeds">
      <router-view />
    </keep-alive>
    <back-top />

    <bs-footer :isShow="showFooter" />
  </div>
</template>
<script>
import NavBar from 'components/common/NavBar/NavBar';
import BsFooter from 'components/common/Footer/Footer';
import BackTop from 'components/common/BackTop/BackTop';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  created() {
    this.setPwd();
  },
  components: { NavBar, BsFooter, BackTop },
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
          icon: 'icon-herb'
        },
        {
          name: 'SETTING',
          to: '/setting',
          icon: 'icon-setting'
        }
      ],
      showFooter: true
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
    },
    setPwd() {
      let pwd = prompt('Please enter the password:');
      while (pwd !== 'scouts27') {
        if (pwd == null || pwd == '') {
          this.$router.push('/404');
        } else pwd = prompt('Please enter the password:');
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
    },
    $route(to) {
      if (this.isMobile) {
        if (to.name == 'WeedInfo' || to.name == 'Report' || to.name == 'ReportForm') {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
        // WeedInfo
      }
    }
  }
};
</script>
<style lang="scss">
@import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css';
</style>
