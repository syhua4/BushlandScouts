<template>
  <div class="error">
    <img src="~assets/images/404.svg" alt="not found" />
  </div>
</template>

<script>
export default {
  name: 'Error'
};
</script>

<style lang="scss" scoped>
.error {
  height: calc(100vh - 75px);
  @include font_size($m);
  background-color: #c6fdd8;
  img {
    position: relative;
    height: 80vh;
    width: 100%;
  }
}
</style>
