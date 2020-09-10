<template>
  <div id="app">
    <img src="~assets/images/bg1.jpeg" class="bg" />
    <nav-bar :navItems="navigation">
      <img slot="logo" src="~assets/images/logo.png" />
    </nav-bar>
    <router-view ref="router" />
    <footer-bar :isFix="fixedFooter" />
  </div>
</template>
<script>
import NavBar from 'components/common/NavBar/NavBar';
import FooterBar from 'components/common/Footer/Footer';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'App',
  components: { NavBar, FooterBar },

  data() {
    return {
      fixedFooter: false,
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
  created() {
    let pwd = prompt('Please enter the password:');
    while (pwd !== 'mp27!') {
      if (pwd == null || pwd == '') {
        this.$router.push('/404');
      } else pwd = prompt('Please enter the password:');
    }
  },
  mounted() {
    this.$refs.router.$el.offsetHeight < screen.height && !this.isMobile
      ? (this.fixedFooter = true)
      : (this.fixedFooter = false);

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
    },
    $route(to) {
      if (to.name !== 'Home' && !this.isMobile && to.name !== 'Animals') {
        this.fixedFooter = true;
      } else {
        this.fixedFooter = false;
      }
    }
  }
};
</script>

<style lang="scss">
.bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
