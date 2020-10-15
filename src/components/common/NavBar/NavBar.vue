<template>
  <div class="navbar">
    <div class="logo" @click="goHome">
      <slot name="logo" />
    </div>
    <audio src="~assets/shimmer.mp3" ref="fx" />

    <div class="navbar-wrapper" :class="{ mobile: isMobile }">
      <div class="nav-items" v-if="!isMobile">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="nav-item"
          @click.native="navClick"
        >
          <i class="iconfont" :class="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>
      <hamburger-icon class="nav-item" v-else ref="burger" @toggler="toggler" />
    </div>
    <transition name="slide-in">
      <el-row v-show="showSideDrawer">
        <el-col :span="12">
          <el-menu text-color="#fff" active-text-color="#fff" router :default-active="$route.path">
            <el-menu-item
              v-for="item in navItems"
              :index="item.to"
              :key="item.name"
              @click.native="navClick"
            >
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>

<script>
import HamburgerIcon from './HamburgerIcon';
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  components: { HamburgerIcon },
  data() {
    return {
      showSideDrawer: false
    };
  },
  props: {
    navItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'toggleSound'])
  },
  methods: {
    toggler(status) {
      this.showSideDrawer = status;
    },
    navClick() {
      console.log(this.toggleSound);
      this.toggleSound ? this.$refs.fx.play() : '';
    },
    goHome() {
      this.$router.push('/');
    }
  },
  watch: {
    isMobile(val) {
      console.log(val);
      if (!val) {
        this.showSideDrawer = false;
      }
    },
    $route(to, from) {
      if (this.isMobile) {
        if (to.path !== from.path || to.path == '/report') {
          this.showSideDrawer = false;
          this.$refs.burger.toggleOn = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';

.navbar {
  @include font_size($s);
  @include bg_color();

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  z-index: 99;
  display: flex;
  padding: 8px;
  justify-content: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  .logo {
    z-index: 1;
    padding-left: 20px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    img {
      height: 40px;
    }
  }
  .navbar-wrapper {
    position: relative;
    &.mobile {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .nav-items {
      display: flex;
      height: 59px;
      align-items: center;
      text-align: center;

      .nav-item {
        display: flex;
        flex-direction: column;
        margin: 0 24px;
        width: 68px;
        cursor: pointer;
        position: relative;
        .iconfont {
          @include font_size($ml);
          padding: 5px 0;
        }
        &:hover,
        &.router-link-exact-active {
          background: rgba(0, 0, 0, 0.18);
          border-radius: 3px;
        }
      }
    }
    .hamburger-icon {
      margin-left: auto;
    }
  }

  .el-row {
    position: fixed;
    top: 58px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .el-col,
  .el-menu {
    height: 100%;
  }
  .el-menu {
    padding-top: 20px;
    border-right: none;
    @include bg_color();

    .el-menu-item {
      @include font_size($ms);

      &:hover,
      &:active,
      &:focus {
        color: #90ba92 !important;
        background-color: rgba(37, 53, 38, 0.1) !important;
      }
    }
    li {
      height: 40px;
      line-height: 40px;
    }
  }
  .slide-in-enter,
  .slide-in-leave-active {
    transform: translateX(-350px);
  }

  .slide-in-leave-active,
  .slide-in-enter-active {
    transition: all 0.2s cubic-bezier(0.33, 0.25, 0.33, 1);
  }
}
</style>
