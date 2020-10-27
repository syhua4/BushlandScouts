<template>
  <div class="privacy">
    <div class="container">
      <h2>Privacy Policy</h2>
      <h3>Information about our Privacy Policy</h3>
      <ul>
        <li>
          <span>1.INFORMATION FROM CHILDREN</span>When a child accesses and interacts with the
          website services, we may collect certain information about those visits. The information
          we collect includes, IP address and/or mobile device identifier, web browser type, picture
          which children upload and nicknames children provided. We do not collect registration
          information from children on this site. We only use these types of information to support
          the internal operations of the Company Services. We only use these types of information to
          support the internal operations of the Company Services.
        </li>
        <li>
          <span>2. USE AND DISCLOSURE</span>We use the information we collect from and about a child
          to provide the Company Services and features to him or her, and for various purposes
          related to our business including: to improve our database ; to measure and improve those
          Company Services and features.
        </li>
        <li>
          <span>3. SECURITY </span>Company uses commercially reasonable administrative, technical,
          personnel and physical measures to safeguard information in its possession against loss,
          theft and unauthorized use, disclosure or modification. Please be aware that, despite our
          best efforts, no security measures are perfect or impenetrable.
        </li>
        <li>
          <span>4. OTHER IMPORTANT INFORMATION </span>Updates to Privacy Policy. From time to time,
          we may change this privacy policy to accommodate new technologies, industry practices,
          regulatory requirements or for other purposes. Notice may be by posting notice of such
          changes on our sites and applications, or by other means, consistent with applicable law.
        </li>
        <li>
          <span>5. PARENTAL RIGHTS </span>In the event we start collecting registration information
          from children, we will provide parents with the ability to access the information
          collected from their children.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy',
  created() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
};
</script>

<style lang="scss" scoped>
.privacy {
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
    h3 {
      font-weight: 600;
    }
    ul {
      max-width: 600px;
      padding-top: 75px;
      text-align: left;
      margin: 0 auto;
      li {
        @include font_color();

        margin-bottom: 40px;
        span {
          display: block;
          color: $sub-color2;
          font-weight: 600;
          margin-right: 5px;
          margin-bottom: 5px;
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
