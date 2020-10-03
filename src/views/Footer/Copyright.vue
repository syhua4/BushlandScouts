<template>
  <div class="copyright">
    <div class="container">
      <h2>Copyright</h2>
      <ul>
        <li>
          <p>© 2020 Bushland Scouts Inc.</p>
          <img src="~assets/images/cc.png" alt="Creative Commons Attribution 4.0" />
          <p>
            Unless otherwise noted, all copyright material available on or through this website is
            licensed under a
            <a href="https://creativecommons.org/licenses/by/4.0/"
              >Creative Commons Attribution 4.0 International licence (CC BY 4.0).</a
            >
          </p>
          <p>
            You are free to use copyright material available on or through this website that is
            covered by a CC BY licence in line with the licence terms. You must keep the copyright
            notice on the copyright material and attribute the Bushland Scout as the source of the
            copyright material.
          </p>
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
.copyright {
  @include font_size($m);
  height: calc(100vh - 150px);
  background-color: #f0fff5;
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
      background: #78e08f30;
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
      background: #38ada940;
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
        color: $background-color;
        margin-bottom: 40px;
      }
      a {
        color: $background-color;
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
    }
  }
}
</style>
