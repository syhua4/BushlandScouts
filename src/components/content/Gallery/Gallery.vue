<template>
  <div class="gallery" :class="background ? 'showBg' : ''">
    <main role="main" id="main">
      <section class="tiles-a">
        <ul :class="content.length >= 3 ? 'more' : ''">
          <li v-for="item in content" :key="item.Common_name">
            <figure @click="showSpecies(item.Species_ID)">
              <img :src="item.IMAGE" :alt="item.Common_name" />
              <div class="overlay">
                <span>{{ item.Common_name }}</span>
              </div>
            </figure>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    content: {
      type: Array,
      default: () => [],
      required: true
    },
    background: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showSpecies(id) {
      this.$emit('showSpecies', id);
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  &.showBg {
    position: relative;
    z-index: 1;
    @include bg_alpha_color2(0.4);

    border-radius: 25px;
    min-height: 300px;
    margin-bottom: 30px;
    @media (max-width: 1023px) {
      width: 90vw;
      margin: 0 auto;
    }
  }
  #main {
    position: relative;
    z-index: 10;
    transition: transform 0.6s ease;
  }

  .tiles-a {
    width: 100%;
    max-width: 1124px;
    margin: 0 auto;
    padding-bottom: 10px;
    position: relative;
    overflow: hidden;

    ul {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      padding: 0;
    }
    ul.more::after {
      content: '';
      width: 330px;
    }

    li {
      margin: 10px;
    }

    figure {
      z-index: 1;
      min-width: 300px;
      overflow: hidden;
      margin: 0 5px;
      border-radius: 20px;
      // animation: show 0.8s ease;
      position: relative;
      cursor: pointer;

      img {
        width: 300px;
        height: 250px;
        left: 0;
        object-fit: cover;
        box-shadow: 0 10px 15px #a8b4fc30;
      }

      .overlay {
        @include font_color();
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease-in-out;
        @include bg_alpha_color(0.6);
        &:hover {
          opacity: 1 !important;
        }
        &:hover .icon-wrapper {
          transform: scale(1);
          transition: transform 0.3s 0.1s cubic-bezier(0.37, 1.05, 0.5, 1.21);
        }
        span {
          color: #fff;
        }
        .icon-wrapper {
          transform: scale(0);

          background-color: #fff;
          border-radius: 50%;
          height: 60px;
          width: 60px;
          line-height: 60px;
          i {
            @include font_size($l);
          }
        }
      }
    }

    // li {
    //   text-align: center;

    //   @media (min-width: $keyBreakpoint) {
    //     float: left;
    //     width: 33.33%;
    //   }
    // }

    // div {
    //   max-width: 300px;
    //   max-height: 250px;
    //   border-radius: 10px;
    //   margin: 1em;
    //   display: block;
    //   background: #222;
    //   // padding-top: 73%;
    //   height: 250px;
    //   background-size: cover;
    //   color: #111;
    //   cursor: pointer;
    //   transition: transform 0.3s linear;
    //   margin-bottom: 40px;
    //   @media (max-width: $keyBreakpoint) {
    //     margin: 1em 1.5em 3.5em;
    //   }
    //   &:hover {
    //     transform: scale(1.02);
    //   }
    //   span {
    //     display: inline-block;
    //     transform: none;
    //     margin: 5px 0;
    //     font-weight: 600;
    //     @include font_size(20);
    //   }
    // }
  }

  @media (max-width: 989px) {
    li {
      transform: scale(0.9);
      transition: 0.5s ease-in;
    }
  }

  @media (max-width: 725px) {
    .tiles-a ul li {
      figure img {
        width: 330px;
        transition: 0.5s ease-in;
      }
    }
  }
}
</style>
