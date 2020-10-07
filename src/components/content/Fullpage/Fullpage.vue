<template>
  <div class="fullpage">
    <swiper v-if="Object.keys(content).length > 0" ref="fullpage">
      <swiper-item>
        <img src="~assets/images/test-bg.png" alt="home-bg-2" class="bg" />
        <section class="s0">
          <h2>{{ content.Common_name }}</h2>
          <img :src="content.IMAGE" :alt="content.Common_name" />
          <scroll-indicator />
        </section>
      </swiper-item>
      <swiper-item>
        <img src="~assets/images/test-bg.png" alt="home-bg-2" class="bg" />
        <section class="s1">
          <div class="text">
            <h2>Description</h2>
            <div class="content">
              <div class="content-left">
                {{ content.Description }}
              </div>
              <div class="content-right">
                <img :src="content.IMAGE" :alt="content.Common_name" />
              </div>
            </div>
          </div>
        </section>
      </swiper-item>
      <swiper-item>
        <img src="~assets/images/test-bg.png" alt="home-bg-2" class="bg" />
        <section class="s2">
          <h2>Characterisitcs</h2>
          <div class="img-wrapper">
            <img :src="content.IMAGE" :alt="content.Common_name" />
            <div class="line line-1">
              <div class="circle circle-1" :text="content.Type.toLowerCase()">
                <i class="iconfont" :class="`icon-${content.Type.toLowerCase()}`" />
              </div>
            </div>
            <div class="line line-2">
              <div class="circle circle-2" :text="content.Flower_colour.toLowerCase()">
                <i ref="flower" class="iconfont icon-flower" />
              </div>
            </div>
            <div class="line line-3">
              <div class="circle circle-3" :text="content.Leaf_shape.toLowerCase()">
                <i class="iconfont" :class="`icon-${content.Leaf_shape.toLowerCase()}`" />
              </div>
            </div>
            <div class="line line-4">
              <div class="circle circle-4" :text="content.Leaf_arrangement.toLowerCase()">
                <el-popover
                  class="popover"
                  placement="top"
                  :title="content.Leaf_arrangement"
                  width="200"
                  trigger="hover"
                  :content="leaf_pop[content.Leaf_arrangement]"
                >
                  <i
                    class="iconfont"
                    :class="`icon-${content.Leaf_arrangement.toLowerCase()}`"
                    slot="reference"
                  />
                </el-popover>
              </div>
            </div>
          </div>
          <div class="bubble-wrapper">
            <div class="circle circle-1" :text="content.Type.toLowerCase()">
              <i class="iconfont" :class="`icon-${content.Type.toLowerCase()}`" />
            </div>
            <div class="circle circle-2" :text="content.Flower_colour.toLowerCase()">
              <i ref="flower2" class="iconfont icon-flower" />
            </div>
            <div class="circle circle-3" :text="content.Leaf_shape.toLowerCase()">
              <i class="iconfont" :class="`icon-${content.Leaf_shape.toLowerCase()}`" />
            </div>
            <div class="circle circle-4" :text="content.Leaf_arrangement.toLowerCase()">
              <i class="iconfont" :class="`icon-${content.Leaf_arrangement.toLowerCase()}`" />
            </div>
          </div>
        </section>
      </swiper-item>
      <swiper-item>
        <img src="~assets/images/test-bg.png" alt="home-bg-2" class="bg" />
        <section class="s3">
          <div class="text">
            <h2>Impact</h2>

            <div>
              {{ content.IMPACT }}
            </div>
            <p>Have you spotted any plants like described?</p>
            <el-button type="primary" @click="$router.push('/report')">Report now</el-button>
          </div>
          <!-- <img :src="content.IMAGE" :alt="content.Common_name" /> -->
        </section>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';
import ScrollIndicator from 'components/content/ScrollIndicator/ScrollIndicator';

export default {
  name: 'Fullpage',
  components: {
    Swiper,
    SwiperItem,
    ScrollIndicator
  },
  props: {
    content: {
      type: [Object, Array],
      default: () => {}
    }
  },
  data() {
    return {
      colors: {
        green: '#45b10f',
        brown: '#8b4425',
        'golden-yellow': '#ffc312',
        'greenish-yellow': '#a3cb38',
        orange: '#f79f1f',
        pink: '#ffb8b8',
        purple: '#cd84f1',
        white: '#fff',
        yellow: '#fffa65'
      },
      leaf_pop: {
        Alternate: 'Leaves on the stem is arranged in alternate sides.',
        Opposite: 'Leaves on the stem is arranged in a symmetrical way.',
        Basal: 'All the leaves arise from the base (crown) of the plant.',
        Wholred: 'More than three leaves grow from a same plant node on the stem.',
        Rosulate: 'Leaves are arranged in dense, radiating cluster.'
      }
    };
  },
  mounted() {
    this.$refs.flower.style.color = this.colors[this.content.Flower_colour.toLowerCase()];
    this.$refs.flower2.style.color = this.colors[this.content.Flower_colour.toLowerCase()];
  }
};
</script>

<style lang="scss" scoped>
.fullpage {
  height: calc(100vh - 75px);
  transition: all 0.2 ease-in;
  .swiper-slide {
    position: relative;
    .bg {
      display: block;
      overflow: hidden;
      position: relative;
      z-index: -1;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      opacity: 0.55;
    }
    section {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100vw;
      height: calc(100vh - 75px);
      img {
        border-radius: 30px;
        width: 50vw;
        max-width: 500px;
        min-width: 300px;
        max-height: 350px;
        object-fit: cover;
      }
      &.s0,
      &.s1,
      &.s2,
      &.s3 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
          margin-bottom: 30px;
          @include font_size($l);
          font-weight: 800;
        }
      }
      &.s1 {
        .content {
          display: flex;
          align-items: center;
          .content-left {
            padding-right: 100px;
            text-align: left;
          }

          img {
            height: 300px;
            width: 300px;
            border-radius: 50%;
          }
        }
      }
      &.s1,
      &.s3 {
        .text {
          width: 80vw;
          position: absolute;
          z-index: 1;
          @include font_size($ml);
          text-align: center;

          p {
            margin: 20px 0;
          }
        }
      }
      &.s2 {
        .img-wrapper {
          width: 30vw;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          img {
            width: 100%;
          }
          .line {
            height: 2px;
            width: 100px;
            background-color: #333;
            position: absolute;
            z-index: -1;
            &.line-1 {
              top: 30px;
              left: -100px;
            }
            &.line-2 {
              bottom: 30px;
              left: -100px;
            }
            &.line-3 {
              top: 30px;
              right: -100px;
            }
            &.line-4 {
              bottom: 30px;
              right: -100px;
            }
            .circle {
              position: absolute;
              width: 75px;
              height: 75px;
              border-radius: 50%;
              background: rgba($color: $background-color, $alpha: 0.9);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333;
              &.circle-1,
              &.circle-2 {
                top: -35px;
                left: -75px;
                &::before {
                  content: 'Plant Type';
                  width: 150px;
                  position: absolute;
                  left: 50%;
                  top: -30px;
                  transform: translateX(-50%);
                  text-align: center;
                  font-weight: 600;
                }
                &::after {
                  content: attr(text);
                  position: absolute;
                  width: 150px;
                  left: 50%;
                  bottom: -30px;
                  transform: translateX(-50%);
                  text-align: center;
                }
              }
              &.circle-3,
              &.circle-4 {
                top: -35px;
                right: -75px;
                &::before {
                  content: 'Leaf Shape';
                  width: 150px;
                  position: absolute;
                  left: 50%;
                  top: -30px;
                  transform: translateX(-50%);
                  text-align: center;
                  font-weight: 600;
                }
                &::after {
                  content: attr(text);
                  position: absolute;
                  width: 150px;
                  left: 50%;
                  bottom: -30px;
                  text-align: center;

                  transform: translateX(-50%);
                }
              }
              &.circle-2 {
                .icon-flower {
                  color: pink;
                }
                &::before {
                  content: 'Flower Colour';
                }
              }
              &.circle-4 {
                .iconfont {
                  @include font_size(60);
                }
                &::before {
                  content: 'Leaf Arrangement';
                }
              }

              .iconfont {
                // background-color: ;
                @include font_size(35);
                color: #fff;
              }
            }
          }
        }
        h2 {
          position: absolute;
          top: 20%;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .fullpage .swiper-slide section.s1 {
    .text {
      .content {
        img {
          width: 200px;
          height: 200px;
          min-width: 200px;
        }
      }
    }
  }
  .fullpage .swiper-slide section.s2 {
    .img-wrapper {
      width: 40vh;
      img {
        min-width: 150px;
        min-height: 100px;
      }
      .line {
        height: 0;
        display: none;
      }
    }
    .bubble-wrapper {
      position: absolute;
      bottom: 100px;
      display: flex;
      height: 75px;
      width: 80vw;
      align-items: center;
      justify-content: space-evenly;
      .circle {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba($color: $background-color, $alpha: 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: $background-color;
        .iconfont {
          color: #fff;
        }
        &.circle-1::before,
        &.circle-2::before,
        &.circle-3::before,
        &.circle-4::before {
          content: 'Type';
          @include font_size($s);
          position: absolute;
          top: -10px;
        }
        &.circle-1::after,
        &.circle-2::after,
        &.circle-3::after,
        &.circle-4::after {
          content: attr(text);
          @include font_size($s);
          position: absolute;
          bottom: -10px;
        }
        &.circle-2::before {
          content: 'Colour';
        }
        &.circle-3::before {
          content: 'Shape';
        }
        &.circle-4::before {
          content: 'Arrangement';
        }

        .iconfont {
          // background-color: ;
          @include font_size($ml);
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .fullpage {
    height: calc(100vh - 58px);
    .swiper-slide section.s1,
    .swiper-slide section.s3 {
      // h2 {
      //   position: absolute;
      //   top: 100px;
      // }
      .text {
        @include font_size($m);
        .content {
          flex-direction: column-reverse;
          .content-left {
            padding: 20px 0 0 0;
          }
        }
      }
    }
  }
}
</style>
