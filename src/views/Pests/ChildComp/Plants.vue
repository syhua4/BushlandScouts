<template>
  <div class="plants">
    <modal :title="speciesInfo.COMMON_NAME" v-show="Object.keys(speciesInfo).length">
      <tab slot="modal-content" :titles="tabTitles" :speciesInfo="speciesInfo" />
    </modal>
    <gallery :content="plants" @showSpecies="showSpecies" />
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

import { getPlants } from 'networks/api';
export default {
  name: 'Plants',
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
      plants: [],
      tabTitles: ['Species Information', 'Impact to Bushland', 'Help the Bushland'],
      speciesInfo: {},
      totalCount: 20,
      currentPage: 1
    };
  },
  methods: {
    getData() {
      getPlants(this.currentPage).then(res => {
        this.totalCount = res.count;
        this.plants = res.data;
      });
    },
    showSpecies(index) {
      this.speciesInfo = this.plants[index];
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
    plants: {
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
.plants {
  margin: 0 auto;
  @include font_size($m);
  .pagination-wrapper {
    position: relative;
    z-index: 9;
    text-align: center;
    margin: 30px 0;
  }
}
</style>
