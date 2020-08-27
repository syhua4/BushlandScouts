<template>
  <div class="j-puzzle">
    <div
      class="puzzle-wrapper"
      :style="{
        'flex-direction': isMobile && dpr ? 'column' : 'row',
        '--scale': isMobile && dpr ? mobileDim.scale : '',
        '--table-height': isMobile && dpr ? mobileDim.width + 'px' : ''
      }"
    >
      <div class="play-area">
        <table>
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
      </div>
    </div>

    <div class="tools">
      <div class="back">go back</div>
      <div class="restart" @click.stop="playAgain">Restart</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'JigsawPuzzle',
  data() {
    return {
      isPlay: true,
      drag_id: null,
      drop_id: null,
      puzzleInfo: null,
      puzzles_num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      correctPiece: [],
      isDown: false,
      mobileDim: {}
    };
  },
  mounted() {
    this.mobileDim['width'] = document.body.clientWidth * 0.8;
    this.mobileDim['scale'] = (document.body.clientWidth * 0.8) / 540;
    this.scatterPieces();

    this.init();
  },
  methods: {
    init() {
      this.isPlay = true;
      this.drag_id = null;
      this.drop_id = null;
      this.puzzleInfo = null;
      this.correctPiece = [];
      this.isDown = false;
    },
    startGame() {
      this.isPlay = true;
      this.init();
    },
    scatterPieces() {
      let pieces = [...document.getElementsByClassName('piece')];
      let drawerDim = this.$refs.drawer.getBoundingClientRect();
      pieces.map(piece => {
        if (this.isMobile && this.dpr) {
          piece.style.left = `${Math.floor(Math.random() * this.mobileDim.width)}px`;
          piece.style.top = `${Math.floor(
            Math.random() * (this.mobileDim.width - 180 + 1) - 180
          )}px`;
        } else {
          piece.style.left = `${Math.floor(Math.random() * (drawerDim.width - 180))}px`;
          piece.style.top = `${Math.floor(Math.random() * (540 - 24 + 1) + 24)}px`;
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
          console.log('win');
        }
      }
    },
    playAgain() {
      let imgs = [];
      let td = [...document.getElementsByTagName('td')];
      let pieces = [...this.$refs.drawer.children];
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
      this.isPlay = false;
      this.isDown = false;
    }
  },
  computed: {
    ...mapGetters(['dpr', 'isMobile']),
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
        let imgPath = require(`assets/images/jigsaw/pig/${i}.png`);
        return imgPath;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.j-puzzle {
  padding: 24px;
  display: flex;
  flex-direction: column;
  .puzzle-wrapper {
    color: #fff;
    display: flex;
    font-size: 0;
    position: relative;
    height: 80vh;
    .play-area {
      display: flex;
      justify-content: center;
      height: var(--table-height);

      flex: 0 0 60%;
      table {
        width: 540px;
        height: 540px;
        transform: scale(var(--scale));
        transform-origin: top center;
        .hovered {
          transition: all 0.8s ease;
          background-color: #ffffff6e;
        }
        td {
          position: relative;
          outline: 2px solid white;
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
    }
  }
  .tools {
    padding: 24px;
    display: flex;
    justify-content: center;
    div {
      text-align: center;
      width: 100px;
      height: 30px;
      line-height: 30px;
      margin: 20px;
      background-color: #fff;
      cursor: pointer;
    }
  }
}
</style>
