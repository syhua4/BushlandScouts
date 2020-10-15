<template>
  <div class="attribution">
    <div class="container">
      <h2>Attribution</h2>
      <div class="text">
        Special thanks to all people who made and shared these resources for free.
      </div>
      <ul>
        <li>
          Open data sourced from
          <a href="https://agriculture.vic.gov.au/">Agriculture Victoria</a> and
          <a href="https://www.gbif.org/">GBIF - Global Biodiversity Information Facility</a>
        </li>
        <li class="image-li">
          Images by:
          <a href="https://agriculture.vic.gov.au/">Agriculture Victoria</a>
          <a href="https://www.agric.wa.gov.au/">Agriculture Western Australia</a>

          <a href="https://www.ala.org.au/">Atlas of Living Australia</a>
          <a href="https://weeds.brisbane.qld.gov.au/"
            >Brisbane City Counsil - Weed Identification Tool</a
          >
          <a href="https://www.business.qld.gov.au/">Business Queensland</a>
        </li>
        <li>
          Icons by <a href="https://www.flaticon.com/">Flaticon</a> and
          <a href="https://www.iconfont.cn/">Iconfont</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Copyright',
  created() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
};
</script>

<style lang="scss" scoped>
.attribution {
  @include font_size($m);
  height: calc(100vh - 150px);
  @include bg_color_sub();
  overflow-x: hidden;
  padding-top: 75px;
  text-align: center;

  .container {
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;

    &::before,
    .bubble {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      top: -150px;
      right: -150px;
      width: 300px;
      height: 300px;
      @include bg_color_sub_before();
      animation: transform 25s ease-in-out infinite both alternate,
        movement 20s ease-in-out infinite both;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 100px;
      left: -220px;
      width: 400px;
      height: 400px;
      @include bg_color_sub_after();
      animation: transform 25s ease-in-out infinite both alternate,
        movement 20s ease-in-out infinite both;
    }
    h2 {
      margin: 30px 0 20px;
      @include font_size($ml);
      font-weight: 800;
    }

    ul {
      max-width: 600px;
      padding-top: 75px;
      text-align: left;
      margin: 0 auto;
      li {
        @include font_color();

        margin-bottom: 40px;
      }
      a {
        @include font_color();

        text-decoration: underline;
      }
      p:last-child {
        margin-top: 30px;
      }
      img {
        width: 88px;
        height: 31px;
        display: block;
        margin: 10px 0;
      }
      .image-li {
        a {
          display: block;
          line-height: 1.5;
          padding-left: 100px;
        }
      }
    }
  }
  @keyframes up {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes transform {
    0%,
    100% {
      border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
    }
    14% {
      border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
    }
    28% {
      border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
    }
    42% {
      border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
    }
    56% {
      border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
    }
    70% {
      border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
    }
    84% {
      border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
    }
  }

  @keyframes movement {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: translateY(20%) rotateY(10deg);
    }
  }
  @media (max-width: 600px) {
    .container {
      padding: 0 20px;
      ul .image-li {
        a {
          padding-left: 0;
          &:first-child {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
