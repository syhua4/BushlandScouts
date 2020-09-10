<template>
  <div class="animals" ref="animals">
    <modal :title="speciesInfo.COMMON_NAME" v-show="Object.keys(speciesInfo).length">
      <tab slot="modal-content" :titles="tabTitles" :speciesInfo="speciesInfo" />
    </modal>
    <gallery :content="animals" @showSpecies="showSpecies" />
    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="12"
        background
        @current-change="changePage($event)"
      />
    </div>
  </div>
</template>

<script>
import Gallery from 'components/content/Gallery';
import Modal from 'components/content/Modal';
import Tab from 'components/content/Tab';

import { getAnimals } from 'networks/api';
export default {
  name: 'Animals',
  components: { Gallery, Modal, Tab },
  created() {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.getData();
  },
  destroyed() {
    this.$parent.$refs.wrapper.style.position = '';
    this.loading.close();
  },
  data() {
    return {
      loading: null,
      totalCount: 20,
      animals: [],
      currentPage: 1,
      tabTitles: ['Species Information', 'Impact to Bushland', 'Help the Bushland'],
      speciesInfo: {}
    };
  },
  methods: {
    getData() {
      getAnimals(this.currentPage).then(res => {
        this.totalCount = res.count;
        this.animals = res.data;
      });
    },
    showSpecies(index) {
      this.speciesInfo = this.animals[index];
    },
    changePage(e) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.currentPage = e;
      this.getData();
    }
  },
  watch: {
    animals: {
      deep: true,
      handler(val) {
        if (val.length) {
          this.loading.close();
          window.scrollTo(0, 0);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.animals {
  margin: 0 auto;
  @include font_size($m);
  .pagination-wrapper {
    margin: 30px 0;
    position: relative;
    z-index: 9;
    text-align: center;
  }
}
</style>
