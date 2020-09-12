<template>
  <div class="gallery">
    <img src="~assets/images/bg.png" class="bg" />
    <h2>{{ $route.name === 'Animals' ? 'Animals' : 'Plants' }}</h2>

    <div class="btn-group">
      <span class="goBack" @click="goBack">Back</span>

      <span class="goAnother" @click="goAnother"
        >Go To {{ $route.name === 'Animals' ? 'Plants' : 'Animals' }} Gallery</span
      >
    </div>
    <main role="main" id="main">
      <section class="tiles-a">
        <ul>
          <li v-for="(item, index) in content" :key="item.COMMON_NAME">
            <div v-lazy:background-image="item.IMAGE" @click="showSpecies(index)">
              <span>{{ item.COMMON_NAME }}</span>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  created() {
    console.log(this.$route.name);
  },
  props: {
    content: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    showSpecies(index) {
      this.$emit('showSpecies', index);
    },
    goBack() {
      this.$router.push('/pests');
    },
    goAnother() {
      if (this.$route.name === 'Animals') {
        this.$router.push('/pests/plants');
      } else {
        this.$router.push('/pests/animals');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  background-color: #fff;
  @include font_size($m);
  $keyBreakpoint: 768px;
  h2 {
    position: relative;
    z-index: 9;
    text-align: center;
    font-weight: 800;
    @include font_size($l);
    // margin-top: 1px;
  }
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
  .btn-group {
    max-width: 986px;
    margin: 0 auto;
    position: relative;
    z-index: 9;
    // padding-top: 20px;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #ff0;
    @media (max-width: $keyBreakpoint) {
      margin: 0 1.5em;
    }
    span {
      background-color: $background-color;
      border-radius: 8px;
      padding: 5px 15px;
      color: #fff;
      font-weight: 600;
      // margin-right: 20px;
      cursor: pointer;
    }
  }
  #main {
    position: relative;
    z-index: 10;
    transition: transform 0.6s ease;

    @media (min-width: $keyBreakpoint) {
      padding: 1em;
    }
  }

  .tiles-a {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding-bottom: 10px;
    position: relative;
    overflow: hidden;

    li {
      text-align: center;

      @media (min-width: $keyBreakpoint) {
        float: left;
        width: 33.33%;
      }
    }

    div {
      border-radius: 10px;
      margin: 1em;
      display: block;
      background: #222;
      padding-top: 73%;
      height: 0;
      background-size: cover;
      color: #111;
      cursor: pointer;
      transition: transform 0.3s linear;
      margin-bottom: 40px;
      @media (max-width: $keyBreakpoint) {
        margin: 1em 1.5em 3.5em;
      }
      &:hover {
        transform: scale(1.02);
      }
      span {
        display: inline-block;
        transform: none;
        margin: 5px 0;
        font-weight: 600;
        @include font_size(20);
      }
    }
  }
  .placeholder {
    opacity: 0;
  }
}
</style>
