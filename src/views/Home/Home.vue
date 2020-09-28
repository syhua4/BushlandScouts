<template>
  <div id="home">
    <section class="s1">
      <img src="~assets/images/home/bg-1.png" alt="home-bg-1" class="home-bg-1" />
      <div class="s1-overbg">
        <img src="~assets/images/home/overbg-leave-1.png" class="overbg-leave " />
        <img src="~assets/images/home/overbg-leave-2.png" class="overbg-leave " />
        <img src="~assets/images/home/overbg-1.png" class="overbg-1" />

        <img src="~assets/images/home/clouds.png" class="overbg-cloud" />
      </div>
    </section>
    <section class="s2">
      <img src="~assets/images/home/bg-2.png" alt="home-bg-2" class="home-bg-2" />
      <span class="bubble-btn" ref="s2bubbleBtn" @click="animateBtn">Learn More</span>
      <div class="s2-overbg">
        <div class="left">
          <img src="~assets/images/home/s2-left-1.png" alt="s2-overbg-1" class="s2-overbg-1" />
          <img src="~assets/images/home/s2-left-2.png" alt="s2-overbg-2" class="s2-overbg-2" />
          <img src="~assets/images/home/s2-left-3.png" alt="s2-overbg-3" class="s2-overbg-3" />
        </div>
        <div class="right">
          <img src="~assets/images/home/s2-right-1.png" alt="s2-overbg-1" class="s2-overbg-1" />
          <img src="~assets/images/home/s2-right-2.png" alt="s2-overbg-2" class="s2-overbg-2" />
          <img src="~assets/images/home/s2-right-3.png" alt="s2-overbg-3" class="s2-overbg-3" />
        </div>
      </div>
    </section>
    <section class="s3">
      <img src="~assets/images/home/bg-3.png" alt="home-bg-3" class="home-bg-3" />
      <span class="bubble-btn" ref="s3bubbleBtn" @click="animateBtn($event)">Report Now</span>
      <div class="s3-overbg">
        <img src="~assets/images/home/s3-map.png" class="overbg-map" />
        <img src="~assets/images/home/s3-girl.png" class="overbg-girl" />
        <img src="~assets/images/home/s3-bubble.png" class="overbg-bubble" />
        <img src="~assets/images/home/s3-fish.png" class="overbg-fish" />
      </div>
    </section>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js"></script>
<script>
export default {
  name: 'Home',
  data() {
    return {
      mobile: window.matchMedia('(max-width: 450px)'),
      tablet: window.matchMedia('(max-width: 900px)')
    };
  },
  mounted() {
    this.scrollAnimation();
    window.onresize = () => {
      this.mobile.addListener(this.scrollAnimation);
      this.tablet.addListener(this.scrollAnimation);
    };
  },
  methods: {
    scrollAnimation() {
      if (this.mobile.matches) {
        console.log('mobile');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.s2-overbg',
              toggleActions: 'restart pause reverse pause',
              scrub: true
            }
          })
          .to('.left', 5, { x: -60 }, 0)
          .to('.right', 5, { x: 80 }, 0);
      } else if (this.tablet.matches) {
        console.log('tablet');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.s2-overbg',
              toggleActions: 'restart pause reverse pause',
              scrub: true
            }
          })
          .to('.left', 5, { x: -60 }, 0)
          .to('.right', 5, { x: 140 }, 0);
      } else if (!this.mobile.matches || !this.tablet.matches) {
        console.log('desktop');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.s2-overbg',
              toggleActions: 'restart pause reverse pause',
              scrub: true
            }
          })
          .to('.left', 5, { x: -200 }, 0)
          .to('.right', 5, { x: 400 }, 0);
      }
    },
    animateBtn(e) {
      let section = e.path[1].classList.value;
      let _ref = null;
      if (section == 's2') {
        _ref = this.$refs.s2bubbleBtn;
      } else {
        _ref = this.$refs.s3bubbleBtn;
      }
      _ref.classList.add('animate');
      setTimeout(() => {
        _ref.classList.remove('animate');
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
#home {
  padding-top: 75px;
  @media (max-width: 766px) {
    padding-top: 58px;
  }
  section {
    width: 100%;
    position: relative;
  }
  .s1,
  .s2,
  .s3 {
    img {
      width: 100%;
    }
    .home-bg-1,
    .home-bg-2,
    .home-bg-3 {
      display: block;
      overflow: hidden;
      position: relative;
      z-index: 0;
    }
    .s1-overbg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      .overbg-1 {
        position: relative;
        z-index: 1;
        width: 100%;
      }
      .overbg-leave {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        animation: s1-swing 1.5s ease-in infinite alternate;
      }
      .overbg-cloud {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        animation: s1-cloud 20s linear infinite;
      }
    }
    .s2-overbg {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      @media (max-width: 766px) {
        .left {
          transform: translateX(-60px);
        }
        .right {
          transform: translateX(140px);
        }
      }
      @media (max-width: 376px) {
        .left {
          transform: translateX(-60px);
        }
        .right {
          transform: translateX(80px);
        }
      }

      .left,
      .right {
        position: absolute;
        top: 0;
        overflow: hidden;
        // overflow-x: hidden;
        .s2-overbg-1 {
          position: relative;
          z-index: 0;
        }
        .s2-overbg-2,
        .s2-overbg-3 {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
        .s2-overbg-3 {
          z-index: 1;
          animation: s2-swing 2s ease-in infinite alternate;
        }
      }
      .right {
        right: 0;
      }
    }
    .s3-overbg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      .overbg-map {
        position: relative;
        z-index: 1;
        width: 100%;
      }
      .overbg-girl {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }
      .overbg-bubble {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        animation: s3-bubble 5s linear infinite;
      }
      .overbg-fish {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        animation: s1-cloud 20s linear infinite;
      }
    }
  }

  .bubble-btn {
    @include font_size($ms);
    width: 100px;
    height: 40px;
    padding: 0 10px;
    border-radius: 20px;
    color: #fff;
    background-color: $btn-color;
    box-shadow: 0 2px 25px rgba(51, 100, 246, 0.5);
    transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;

    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%);
    z-index: 5;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    &:before,
    &:after {
      position: absolute;
      content: '';
      display: block;
      width: 140%;
      height: 100%;
      left: -20%;
      z-index: -1000;
      transition: all ease-in-out 0.5s;
      background-repeat: no-repeat;
    }
    &:before {
      display: none;
      top: -75%;
      background-image: radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, transparent 20%, $btn-color 20%, transparent 30%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, $btn-color 15%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%);
      background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%,
        18% 18%;
    }

    &:after {
      display: none;
      bottom: -75%;
      background-image: radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, $btn-color 15%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%),
        radial-gradient(circle, $btn-color 20%, transparent 20%);
      background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
    }

    &.animate {
      &:before {
        display: block;
        animation: topBubbles ease-in-out 0.75s forwards;
      }
      &:after {
        display: block;
        animation: bottomBubbles ease-in-out 0.75s forwards;
      }
    }
  }

  @media (min-width: 1000px) {
    .s2 .bubble-btn,
    .s3 .bubble-btn {
      transform: scale(2) translate(-25%);
    }
  }
  .s3 .bubble-btn {
    bottom: 20%;
  }
}

@keyframes s1-swing {
  0% {
    transform: rotate(0deg) translateX(4px);
  }
  100% {
    transform: rotate(0.4deg);
  }
}

@keyframes s2-swing {
  0% {
    transform: rotate(0deg) translateX(10px);
  }
  100% {
    transform: rotate(1deg);
  }
}

@keyframes s1-cloud {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes s3-bubble {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
      70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
      90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
      90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
</style>
