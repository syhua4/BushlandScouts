<template>
  <div class="tab-control">
    <div class="tab-header">
      <span
        class="tab"
        :class="{ active: activeIndex === index }"
        v-for="(title, index) in titles"
        :key="index"
        @click="indexClick(index)"
        >{{ title }}</span
      >
    </div>
    <div class="tab-content-wrapper">
      <div id="tab-content-1" class="tab-content">
        <table>
          <tr>
            <td>Scientific Name</td>
            <td>{{ speciesInfo.SCIENTIFIC }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data() {
    return {
      activeIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    speciesInfo: {
      type: Object,
      default: () => {}
      // required: true
    }
  },
  methods: {
    indexClick(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-control {
  @include font_size($m);
  position: relative;
  height: 100%;
  .tab-header {
    display: flex;
    justify-content: flex-start;
    line-height: 0.9;
    border-bottom: 5px solid $background-color;
    margin-bottom: 10px;
    text-align: left;
    span {
      cursor: pointer;
      display: block;
      padding: 10px;
      margin-right: 15px;
      margin-bottom: -2px;
      border-radius: 5px 5px 0 0;
      &.active,
      &:hover {
        background-color: $background-color;
        color: #fff;
      }
    }
  }
}
</style>
