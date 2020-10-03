<template>
  <div class="about">
    <div class="container">
      <h2>About Us</h2>
      <img src="~assets/images/logo.png" alt="logo" />
      <div class="text">
        <p>
          Bushland Scouts is educating young children in Victoria on the weed’s species in bushland.
        </p>
        <p>
          Help children to raise awareness on bushland protection and weeds that reside in bushland.
        </p>
      </div>
      <ul>
        <li><span>Name:</span> Bushland Scouts</li>
        <li><span>Email:</span> bushlandscouts@gmail.com</li>
        <li><span>Address:</span> Australia</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  created() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
};
</script>

<style lang="scss" scoped>
.about {
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
    img {
      width: 300px;
      background-color: $background-color;
      padding: 20px;
      border-radius: 10px;
      display: block;
      margin: 0 auto 20px;
    }
    .text {
      font-weight: 600;
      max-width: 600px;
      margin: 0 auto;
      p {
        margin-bottom: 20px;
      }
    }
    ul {
      max-width: 600px;
      padding-top: 75px;
      text-align: left;
      margin: 0 auto;
      li {
        color: $background-color;
        margin-bottom: 20px;
        span {
          color: $sub-color2;
          font-weight: 600;
          margin-right: 5px;
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
    }
  }
}
</style>
