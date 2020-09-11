<template>
  <div class="cards">
    <h1 v-if="title.length" ref="header">{{ title }}</h1>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6" v-for="item of content" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" @click.native="toCard($event, item.link)">
          <div class="front" ref="front">
            <img v-lazy="item.imgUrl" class="image" />
            <div>{{ item.title }}</div>
          </div>
          <div class="back" ref="back">
            <div v-if="isString">
              {{ item.desc }}
            </div>
            <div v-else>
              <div v-for="(i, ind) in item.desc" :key="i.slice(0, 2) + ind" class="list">
                <i class="iconfont icon-plant" />
                {{ i }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FlippingCard',
  props: {
    clickable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isString: true
    };
  },
  mounted() {
    if (typeof this.content[0].desc == 'string') {
      this.isString = true;
    } else {
      this.isString = false;
    }
  },
  methods: {
    toCard(e, link) {
      if (link) {
        this.toLink(link);
      }
      let el = e.target.closest('.el-card').classList;
      let el_classList = [...e.target.closest('.el-card').classList];
      if (el_classList.includes('flip')) {
        el.remove('flip');
      } else {
        el.add('flip');
      }
      // console.log(e.target.closest('.el-card').classList.includes('flip'));
      // this.toggleFlip = !this.toggleFlip;
      // this.active = index;
    },
    toLink(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style lang="scss" scoped>
.cards {
  padding: 48px 24px 0;
  margin: 0 auto;
  @include font_size($m);
  h1 {
    display: inline-block;
    padding-right: 30px;
    color: #333;
    margin: 20px 0;
    text-align-last: left;
    @include font_size($ml);
    border-bottom: 3px solid;
    border-color: $sub_color;
    text-align: left;
    position: relative;
    z-index: 1;
  }
  .el-col {
    margin-bottom: 30px;
    .el-card {
      border-radius: 10px;
      height: 270px;
      border: none;
      position: relative;
      cursor: pointer;
      background-color: #f3cf00;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23f6e58d' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");

      img {
        height: 210px;
        width: 100%;
        object-fit: cover;
      }
      .front,
      .back {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transition: transform 0.5s linear;
      }
      .front {
        color: #333;
        @include font_size($m);
        transform: perspective(600px) rotateY(0deg);

        div {
          height: 60px;
          line-height: 1.2;
          padding: 0 10px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-weight: 800;
        }
      }
      .back {
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        padding: 0 30px;
        box-sizing: border-box;
        transform: perspective(600px) rotateY(180deg);
        a {
          color: black;
          display: inline-block;
          text-decoration: underline;
        }
        .list {
          display: flex;
          align-items: center;
          padding: 5px 0;
          .icon-plant {
            margin-right: 20px;
          }
        }
      }
      &.flip .front {
        transform: perspective(600px) rotateY(-180deg);
      }
      &.flip .back {
        transform: perspective(600px) rotateY(0deg);
      }
      &:hover {
        transform: scale(1.03);
      }
      &:hover .front {
        transform: perspective(600px) rotateY(-180deg);
      }
      &:hover .back {
        transform: perspective(600px) rotateY(0deg);
      }
    }
  }
}
</style>
