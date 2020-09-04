<template>
  <div class="gallery">
    <img src="~assets/images/bg1.jpeg" class="bg" />
    <main role="main" id="main">
      <section class="tiles-a">
        <ul>
          <li v-for="(item, index) in content" :key="item.COMMON_NAM">
            <div v-lazy:background-image="item.Image_url" @click="showSpecies(index)" />
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
    }
  },
  methods: {
    showSpecies(index) {
      this.$emit('showSpecies', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  background-color: #fff;
  @include font_size($m);
  $keyBreakpoint: 768px;

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
  #main {
    position: relative;
    z-index: 10;
    // background: #fff;
    transition: transform 0.6s ease;
    @media (min-width: $keyBreakpoint) {
      padding: 1em;
    }
  }

  .tiles-a {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    li {
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
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
