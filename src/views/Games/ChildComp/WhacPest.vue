<template>
  <div
    class="whac-pest"
    :class="{ mobile: isMobile, smallPc: smallDesktopScale !== 0 && !isMobile }"
    @click="hit($event)"
    ref="canvas"
    @mousedown="changeCursor($event)"
    @mouseup="changeCursor($event)"
    :style="{
      '--scale': isMobile && dpr ? mobileDim.scale : '',
      '--game-width': isMobile && dpr ? mobileDim.width + 'px' : '',
      '--game-height': isMobile && dpr ? mobileDim.height + 'px' : '',
      '--small-screen-scale': !isMobile ? smallDesktopScale : ''
    }"
  >
    <audio ref="audio" src="~assets/images/mole/TalkingCuteChiptune.mp3" loop />
    <div class="panel">
      <div class="hearts">
        <img src="~assets/images/mole/heart.png" v-for="index in life" :key="index" />
      </div>
      <div class="right-wrapper">
        <div class="score">SCORE {{ score }}</div>
        <img
          src="~assets/images/mole/music_btn.png"
          alt="game music control button"
          @click="musicControl"
        />
        <img src="~assets/images/mole/home_btn.png" alt="back home button" @click="goBack" />
      </div>
    </div>
    <div class="start-console" v-if="!isPlaying">
      <div class="start" @click="startGame" />
      <div class="help" @click="toggleDesc" />
    </div>
    <ul ref="holes">
      <li v-for="hole of 9" :key="hole" class="hole" />
    </ul>
    <transition @enter="enter" @leave="leave" :css="false">
      <div class="end" v-show="showResult">
        <img src="~assets/images/mole/end.png" />
        <span>{{ this.score }}</span>
        <div class="end-console">
          <div class="back" @click="goBack" />
          <div class="restart" @click="startGame" />
        </div>
      </div>
    </transition>
    <transition @enter="enter" @leave="leave" :css="false">
      <div class="desc" v-show="showDesc">
        <img src="~assets/images/mole/desc.png" />
        <div class="desc-console">
          <div class="back" @click="toggleDesc" />
          <div class="learn" @click="goPest" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { mapGetters } from 'vuex';
export default {
  name: 'WhacPest',
  data() {
    return {
      hammer: 1,
      maxMoleCount: 2,
      moles: [],
      score: 0,
      life: 5,
      isPlaying: false,
      showResult: false,
      showDesc: false,
      mobileDim: {},
      smallDesktopScale: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'Pests') {
        vm.$parent.playing = true;
      }
    });
  },
  created() {
    console.log(window.innerHeight);
    if (window.innerHeight < 800) {
      this.smallDesktopScale = window.innerHeight / 920;
    }
    console.log('small', this.smallDesktopScale);
    this.$parent.$refs.wrapper.style.paddingTop = '30px';
    this.dom = document.getElementsByTagName('html')[0];
    // this.disableScroll(true);

    this.mobileDim['width'] = document.body.clientWidth;
    this.mobileDim['height'] = (document.body.clientWidth / 920) * 577;
    this.mobileDim['scale'] = document.body.clientWidth / 920;
  },
  mounted() {
    this.$refs.audio.volume = 0.1;
    this.$refs.audio.play();
  },
  destroyed() {
    this.$parent.$refs.wrapper.style.paddingTop = '';
    this.$parent.playing = false;
    // this.disableScroll(false);
  },
  methods: {
    goPest() {
      this.$router.push('/pests');
    },
    toggleDesc() {
      this.showDesc = !this.showDesc;
    },
    musicControl() {
      this.$refs.audio.paused ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
    enter(el, done) {
      Velocity(el, 'transition.bounceDownIn', { duration: 500 }, function() {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function() {
        done();
      });
    },
    changeCursor() {
      let cursor;
      if (this.hammer === 1) {
        cursor = require('assets/images/mole/hammer2.png');
        this.hammer = 2;
      } else {
        cursor = require('assets/images/mole/hammer.png');
        this.hammer = 1;
      }
      this.$refs.canvas.style.cursor = `url(${cursor}) 0 -20, auto`;
    },
    createMole(pos) {
      let num = Math.floor(Math.random() * 4);
      let mole = require(`assets/images/mole/mole${num}.png`);
      this.moles = this.$refs.holes.children;
      this.moles[pos].style.backgroundImage = `url(${mole})`;
      this.moles[pos].setAttribute('num', num);
      let timer = setTimeout(() => {
        this.hideMole(this.moles[pos], false);
      }, 2000);
      this.moles[pos].timer = timer;
    },
    controlMole() {
      let pos = Math.floor(Math.random() * 9);
      let holes;
      if (this.$refs.holes && this.$refs.holes.children) {
        holes = [...this.$refs.holes.children] || this.moles;
      } else {
        return;
      }

      let moleOnBoard = holes.filter(mole => {
        return mole.hasAttribute('num');
      });
      if (moleOnBoard.length < this.maxMoleCount && !holes[pos].hasAttribute('num')) {
        this.createMole(pos);
      }
    },
    hideMole(el, isHit) {
      let style = el.style;
      let num = el.getAttribute('num');
      if (isHit) {
        let hit = require(`assets/images/mole/hit${num}.png`);
        num == 3 ? (this.score -= 10) : (this.score += 10);
        el.style.backgroundImage = `url(${hit})`;
        clearTimeout(el.timer);
        setTimeout(() => {
          el.removeAttribute('num');
          style.removeProperty('background-image');
        }, 500);
      } else {
        //生命--
        if (num != 3) this.life -= 1;
        if (!this.life) return;
        el.removeAttribute('num');
        style.removeProperty('background-image');
      }
    },
    hit(e) {
      if (e.target.hasAttribute('num')) this.hideMole(e.target, true);
    },
    init() {
      this.showResult = false;
      this.initHoles();
      let gameTimer = setInterval(() => {
        this.controlMole();

        if (this.life <= 0) {
          clearInterval(gameTimer);
          this.showResult = true;
        }
        this.maxMoleCount = this.score / 100 + 1;
      }, 100);
    },
    initHoles() {
      let holes = [...this.$refs.holes.children];
      holes.map((hole, index) => {
        hole.style.left = 270 + (index % 3) * 185 + 'px';
        hole.style.top = 300 + ~~(index / 3) * 65 + 'px';
      });
    },
    startGame() {
      this.showResult = false;
      this.isPlaying = !this.isPlaying;
      this.life = 5;
      this.score = 0;
      this.maxMoleCount = 2;
      let bg = require(`assets/images/mole/bg.jpg`);
      this.$refs.canvas.style.backgroundImage = `url(${bg})`;
      setTimeout(() => {
        this.init();
      }, 1500);
    },
    goBack() {
      this.$router.push('/games');
      this.$parent.playing = false;
    },
    disableScroll(status) {
      this.dom.style.overflow = status ? 'hidden' : 'auto';
      status
        ? this.dom.addEventListener(
            'touchmove',
            e => {
              e.preventDefault;
            },
            false
          )
        : this.dom.removeEventListener(
            'touchmove',
            e => {
              e.preventDefault;
            },
            false
          );
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'dpr'])
  },
  watch: {
    life(val) {
      if (val < 1) {
        this.life = 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.whac-pest {
  margin: 0 auto;
  height: 580px;
  width: 920px;
  max-width: 920px;
  background: url('~assets/images/mole/start.jpg');
  background-position: bottom center;
  background-size: cover;
  transition: background-image 1s ease-in-out;
  cursor: url('~assets/images/mole/hammer.png') -20 0, auto;
  position: relative;
  &.mobile {
    transform-origin: center left;
    transform: scale(var(--scale));
  }
  &.smallPc {
    transform: scale(var(--small-screen-scale)) translateY(-10%);
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
  }
  .panel {
    padding: 20px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    .hearts {
      display: flex;
      img {
        height: 30px;
        padding-right: 3px;
      }
    }
    .right-wrapper {
      text-align: right;
      img {
        position: relative;
        z-index: 30;
        margin: 10px 0 0 20px;
        width: 40px;
        height: 40px;
      }
      .score {
        font-size: 28px;
        color: #fff;
        line-height: 30px;
      }
    }
  }
  .start-console {
    .start,
    .help {
      position: absolute;
      top: 395px;
      left: 500px;
      height: 45px;
      width: 155px;
      // background-color: #fff;
    }
    .help {
      top: 445px;
      left: 455px;
      width: 240px;
    }
  }
  .end,
  .desc {
    position: absolute;
    height: 100%;
    top: 0;
    span,
    .end-console {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-45%, -65%, 0);
      font-size: 60px;
      color: #fff;
    }
    .end-console {
      top: 70%;
      left: 48%;
      width: 280px;
      display: flex;
      .back,
      .restart {
        height: 50px;
        width: 100px;
      }
      .restart {
        margin-left: auto;
      }
    }
  }
  .hole {
    background-repeat: no-repeat;
    background-size: cover;
    width: 90px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(-20%, -4%, 0);
  }
  .desc-console {
    display: flex;
    position: absolute;
    top: 77%;
    left: 48%;
    width: 400px;
    height: 80px;
    transform: translate3d(-45%, -65%, 0);
    font-size: 60px;
    color: #fff;
    .back,
    .learn {
      width: 160px;
    }
    .learn {
      margin-left: auto;
    }
  }
}
</style>
