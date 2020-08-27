<template>
  <div class="navbar">
    <div class="logo">
      <slot name="logo" />
    </div>
    <div class="nav-items" v-if="!isMobile">
      <router-link v-for="item in navItems" :key="item.name" :to="item.to" class="nav-item">
        <i class="iconfont" :class="item.icon" />
        <span>{{ item.name }}</span>
      </router-link>
    </div>

    <hamburger-icon class="nav-item" v-else @click.native="toggleSideDrawer" ref="burger" />
    <transition name="slide-in">
      <el-row v-show="showSideDrawer">
        <el-col :span="12">
          <el-menu
            text-color="#fff"
            active-text-color="$background-color"
            router
            :default-active="$route.path"
          >
            <el-menu-item v-for="item in navItems" :index="item.to" :key="item.name">
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
      showSideDrawer: false,
      showSubNav: false,
      subItems: []
    };
  },
  props: {
    navItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    toggleSideDrawer() {
      this.showSideDrawer = !this.showSideDrawer;
    }
  },
  watch: {
    isMobile(val) {
      if (!val) {
        this.showSideDrawer = false;
      }
    },
    $route(to, from) {
      if (to.name !== from.name && this.isMobile) {
        this.$refs.burger.$refs.hamburger.classList.remove('opened');
        this.toggleSideDrawer();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';

.navbar {
  @include font_size($s);
  position: relative;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  z-index: 99;
  display: flex;
  padding: 8px;
  justify-content: center;
  background-color: $background-color;
  .logo {
    padding-left: 20px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    img {
      height: 40px;
    }
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
      // &:hover,
      // &:active {
      //   color: #90ba92;
      //   transition: all 0.2s;
      // }
    }
  }
  .hamburger-icon {
    margin-left: auto;
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
    background-color: $background-color;
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
