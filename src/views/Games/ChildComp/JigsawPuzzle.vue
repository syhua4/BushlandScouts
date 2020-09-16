<template>
  <div
    class="j-puzzle"
    :class="{ smallPc: smallDesktopScale !== 0 && !isMobile }"
    :style="{
      '--scale': isMobile && dpr ? mobileDim.scale : '',
      '--table-height': isMobile && dpr ? mobileDim.width + 'px' : '',
      '--small-screen-scale': !isMobile ? smallDesktopScale : ''
    }"
  >
    <transition @enter="enter" @leave="leave" :css="false">
      <div class="select-puzzle" v-if="!animal">
        <div class="card-wrapper" :class="{ smallPc: smallDesktopScale !== 0 && !isMobile }">
          <el-row class="el-desc">Please select a card!</el-row>
          <el-row :gutter="30">
            <el-col
              :xs="12"
              :sm="12"
              :md="12"
              :lg="12"
              :xl="12"
              v-for="item of puzzles"
              :key="item.name"
            >
              <el-card :body-style="{ padding: '0px' }" @click.native="startGame(item.name)">
                <img :src="item.picUrl" class="image" />
              </el-card>
            </el-col>
          </el-row>
          <el-row class="el-back" :class="{ mobile: isMobile }">
            <div class="back" @click="goBack">Back</div>
          </el-row>
        </div>
      </div>
    </transition>
    <div
      v-if="animal"
      class="puzzle-wrapper"
      :style="{
        'flex-direction': isMobile && dpr ? 'column' : 'row'
      }"
    >
      <div class="play-area">
        <table :class="{ mobile: isMobile }">
          <tr v-for="(i, index) in getGrid" :key="index">
            <td
              v-for="num in i"
              :key="num"
              :class="'puzzle_td_' + num"
              @dragover="dragOver($event)"
              @dragleave="dragLeave($event)"
              @drop="drop($event)"
              @dragstart="dragStart($event)"
            ></td>
          </tr>
        </table>
      </div>

      <div class="drawer-wrapper" :style="{ width: isMobile && dpr ? mobileDim.width + 'px' : '' }">
        <ul ref="drawer">
          <li v-for="i in puzzles_num" :key="i" class="piece">
            <img
              :src="getPiece(i)"
              :class="'piece_' + i"
              draggable="true"
              @dragstart="dragStart($event)"
              @dragend="dragEnd()"
            />
          </li>
        </ul>
        <transition @enter="enterDesc" @leave="leaveDesc" :css="false">
          <div class="summary" v-if="completed && !isMobile">
            <h2>{{ getAnimalInfo.title }}</h2>
            <div>{{ getAnimalInfo.desc }}</div>
          </div>
        </transition>
      </div>
      <div class="tools" :class="{ mobile: isMobile }">
        <div class="back" @click="goBack">Back</div>
        <div @click="changePuzzle">Change Puzzle</div>
        <div class="restart" @click.stop="playAgain">Restart</div>
      </div>
    </div>
    <el-dialog
      :title="getAnimalInfo.title"
      :visible.sync="showDialog"
      width="90%"
      center
      :modal="false"
    >
      <span>{{ getAnimalInfo.desc }}</span>
    </el-dialog>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { mapGetters } from 'vuex';
export default {
  name: 'JigsawPuzzle',
  data() {
    return {
      drag_id: null,
      drop_id: null,
      puzzleInfo: null,
      puzzles_num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      correctPiece: [],
      mobileDim: {},
      dom: '',
      completed: false,
      showDialog: false,
      puzzles: [
        {
          picUrl: require('assets/images/jigsaw/silhouette/rabbit.png'),
          name: 'rabbit',
          title: 'European Rabbits',
          desc:
            'European rabbits eat a vast amount of seedlings and destroy the native plants in bushland. They populate very quickly, and the bushlands’ vegetation can not keep up to the rabbits’ need for seedlings. As a result, the plants are not growing and causing erosions. European rabbits also compete with the native animals for food and living habitat.'
        },
        {
          picUrl: require('assets/images/jigsaw/silhouette/deer.png'),
          name: 'deer',
          title: 'Feral Deer',
          desc:
            'There are four types of feral deers in Queensland - Feral Red Deer, Feral Chital Deer, Feral Rusa Deer and Feral Fallow Deer. Those deers eat the native vegetation, cause damage to trees, spreading weed seeds and pollute the water resources.'
        },
        {
          picUrl: require('assets/images/jigsaw/silhouette/dingo.png'),
          name: 'dingo',
          title: 'Wild Dog',
          desc:
            'Wild dogs have sharp teeth, and they are the predators of endangered native animals, such as the bridled nail tail wallabies, koalas and tree kangaroos. They threaten the biodiversity of the bushlands.'
        },
        {
          picUrl: require('assets/images/jigsaw/silhouette/pig.png'),
          name: 'pig',
          title: 'Feral Pig',
          desc:
            'Feral pigs have sharp, dangerous tusks. They cause a lot of damage by digging up vegetables and plants in the bushland. Feral pigs prey on small native animals, and they could spread diseases to the animals and spread weeds.'
        }
      ],
      animal: '',
      smallDesktopScale: 0
    };
  },
  created() {
    this.dom = document.getElementsByTagName('html')[0];
    console.log(window.innerHeight);
    if (window.innerHeight < 800 && window.innerHeight > 650) {
      this.smallDesktopScale = 540 / window.innerHeight;
    } else if (window.innerHeight <= 650) {
      this.smallDesktopScale = 0.6;
    }
    console.log(window.innerHeight, this.smallDesktopScale);
    // this.disableScroll(true);
    this.mobileDim['width'] = document.body.clientWidth * 0.8;
    this.mobileDim['scale'] = (document.body.clientWidth * 0.8) / 540;
  },
  destroyed() {
    // this.disableScroll(false);
    this.$parent.playing = false;
  },
  methods: {
    changePuzzle() {
      this.animal = '';
    },
    enterDesc(el, done) {
      Velocity(el, 'transition.slideUpIn', { duration: 500, display: 'flex' }, function() {
        done();
      });
    },
    leaveDesc(el, done) {
      Velocity(el, 'transition.slideUpOut', { duration: 500, display: 'flex' }, function() {
        done();
      });
    },
    enter(el, done) {
      Velocity(el, 'transition.expandIn', { duration: 500 }, function() {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, 'transition.expandOut', { duration: 500 }, function() {
        done();
      });
    },
    init() {
      this.drag_id = null;
      this.drop_id = null;
      this.completed = false;
      this.puzzleInfo = null;
      this.correctPiece = [];
    },
    startGame(name) {
      this.animal = name;
      this.init();
    },

    scatterPieces() {
      let pieces = [...document.getElementsByClassName('piece')];
      // let drawerDim = this.$refs.drawer && this.$refs.drawer.getBoundingClientRect();
      pieces.map(piece => {
        if (this.isMobile && this.dpr) {
          piece.style.top = `0px`;
          piece.style.left = `${Math.floor(Math.random() * 150)}px`;
        } else {
          piece.style.left = `${Math.floor(Math.random() * 150)}px`;
          piece.style.top = `${Math.floor(Math.random() * (340 - 24 + 1) + 24)}px`;
        }
      });
    },
    dragStart(e) {
      this.drag_id = e.target.className.substr(-1);
      setTimeout(() => (e.target.className += ' invisible'), 0);
      this.puzzleInfo = e.target;
    },
    dragEnd() {
      this.puzzleInfo.classList.remove('invisible');
    },
    dragOver(e) {
      e.preventDefault();
      if (!e.target.children.length) {
        e.target.classList.add('hovered');
      }
    },
    dragLeave(e) {
      e.target.classList.remove('hovered');
    },
    drop(e) {
      e.preventDefault();
      e.stopPropagation();

      e.target.classList.remove('hovered');

      if (e.target.parentElement.tagName != 'TR' || e.target.children.length != 0) {
        let name = this.puzzleInfo.className;
        let t = document.getElementsByClassName(name)[0];
        t.classList.remove('invisible', 'hovered');
        return;
      }
      this.drop_id = e.target.className.substr(-1);
      e.target.appendChild(this.puzzleInfo);

      if (this.drop_id === this.drag_id) {
        this.puzzleInfo.setAttribute('draggable', false);
        e.target.classList += ' correct';
        setTimeout(() => e.target.classList.remove('correct'), 500);
        this.correctPiece.push(this.drag_id - 1);
        if (this.correctPiece.length === this.puzzles_num.length) {
          this.completed = true;
          if (this.isMobile) {
            this.showDialog = true;
          }
        }
      }
    },
    playAgain() {
      this.correctPiece = [];
      let imgs = [];
      let td = [...document.getElementsByTagName('td')];
      let pieces = [...this.$refs.drawer.children];
      this.completed = false;
      td.map(item => {
        if (item.children.length) {
          imgs.push(item.firstChild);
          item.removeChild(item.firstChild);
        }
      });
      pieces.map(item => {
        if (!item.children.length) {
          item.appendChild(imgs.shift());
          item.children[0].setAttribute('draggable', true);
        }
      });
      this.scatterPieces();
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
    },
    goBack() {
      this.$router.push('/games');
      this.$parent.playing = false;
    }
  },
  computed: {
    ...mapGetters(['dpr', 'isMobile']),
    getAnimalInfo() {
      let info = [];
      if (this.animal) {
        info = this.puzzles.filter(item => {
          return item.name === this.animal;
        });
      }
      return info.length ? info[0] : '';
    },
    getGrid() {
      const newArr = [];
      let num = [...this.puzzles_num];
      while (num.length) {
        newArr.push(num.splice(0, 3));
      }
      return newArr;
    },
    getMobTable() {
      let style = '';
      if (this.isMobile && this.dpr) {
        style = {
          transform: 'scale()'
        };
      }
      return style;
    },
    getPiece() {
      return function(i) {
        let imgPath = require(`assets/images/jigsaw/${this.animal}/${i}.png`);
        return imgPath;
      };
    }
  },
  watch: {
    animal(val) {
      if (val) {
        this.$nextTick(() => {
          this.scatterPieces();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.j-puzzle {
  padding: 30px 24px 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  &.smallPc {
    transform: scale(var(--small-screen-scale));
    transform-origin: top;
  }

  .select-puzzle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #fff;
    .el-desc {
      padding-bottom: 20px;
      font-weight: 600;
    }

    .card-wrapper {
      text-align: center;
      position: absolute;
      top: 35%;
      left: 50%;
      width: 350px;
      transform: translate(-50%, -50%);
      &.smallPc {
        top: 50%;
      }
      .el-card {
        border: 8px solid #97dea5;
        margin-bottom: 20px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: $background-color;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' viewBox='0 0 192 192'%3E%3Cpath fill='%2397dea5' fill-opacity='0.4' d='M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z'%3E%3C/path%3E%3C/svg%3E");
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    .el-back {
      margin-top: 10px;
      padding: 5px 24px;
      background-color: $background-color;
      display: inline-block;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        color: #eee;
      }
    }
  }
  .puzzle-wrapper {
    color: #fff;
    display: flex;
    font-size: 0;
    position: relative;
    // height: 70vh;
    flex-wrap: wrap;
    &.smallPc {
      transform: scale(var(--small-screen-scale));
    }
    .play-area {
      display: flex;
      justify-content: center;
      height: var(--table-height);
      flex: 0 0 55%;
      table {
        background-image: url('~assets/images/jigsaw/placeholder.png');
        width: 540px;
        height: 540px;
        transform: scale(var(--scale));
        transform-origin: top center;
        &.mobile {
          transform: scale(var(--scale)) translate(-35%, 0);
        }

        .hovered {
          transition: all 0.8s ease;
          background-color: #ffffff6e;
        }
        td {
          position: relative;
          outline: 2px solid rgba($color: #000, $alpha: 0.3);
          width: 180px;
          height: 180px;
          &.correct {
            transition: all 0.8s ease;
            box-shadow: 0px 0px 12px 10px #ffff;
          }
          img {
            position: absolute;
            top: 1px;
            left: 2px;
            &.piece_2,
            &.piece_8 {
              left: -27px;
            }
            &.piece_6 {
              left: -28px;
            }
            &.piece_5,
            &.piece_7,
            &.piece_9 {
              top: -27px;
            }
            &.piece_3,
            &.piece_9 {
              left: -2px;
            }
            &.piece_5 {
              left: 0;
            }
          }
        }
      }
    }
    .drawer-wrapper {
      position: relative;
      flex: 0 0 40%;
      justify-content: center;
      // top: 0;
      // left: 540px;
      height: 100%;
      width: 360px;
      // background-color: #0ff;
      li {
        position: relative;
        top: 0;
        left: 0;
        list-style: none;
        img {
          display: inline-block;
          position: absolute;
          transform: scale(var(--scale));
          cursor: pointer;
        }
      }
      .invisible {
        display: none;
      }
      .summary {
        text-align: center;
        height: 100%;
        padding: 0 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @include font_size($m);
        color: #000;
        h2 {
          @include font_size($l);
          margin-bottom: 20px;
          font-weight: 800;
        }
      }
    }
  }
  .tools {
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    @include font_size($m);
    &.mobile {
      padding-bottom: 0px;
      position: fixed;
      bottom: 50px;
      box-sizing: border-box;
      justify-content: space-between;

      div {
        line-height: 1;
        padding: 10px 20px;
        margin-left: -24px;
      }
    }
    div {
      display: flex;
      align-items: center;
      text-align: center;
      height: 30px;
      line-height: 30px;
      margin: 20px;
      margin-bottom: 0;
      padding: 0 20px;
      background-color: $background-color;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      transform: translateY(50px);
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
