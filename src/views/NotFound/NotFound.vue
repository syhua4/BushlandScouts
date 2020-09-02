<template>
  <div class="error">
    <img src="~assets/images/404_2.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Error'
};
</script>

<style lang="scss" scoped>
.error {
  @include font_size($m);
  background-color: $background-color;
  img {
    position: relative;
    height: 80vh;
    width: 100%;
  }
}
</style>
