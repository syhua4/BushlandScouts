<template>
  <div class="plants">
    <modal :title="speciesInfo.COMMON_NAME" v-show="Object.keys(speciesInfo).length">
      <tab slot="modal-content" :titles="tabTitles" :speciesInfo="speciesInfo" />
    </modal>
    <gallery :content="plants" @showSpecies="showSpecies" />
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
  async created() {
    this.$parent.$refs.cards.$el.style.display = 'none';

    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    await getPlants().then(res => {
      this.plants = res.data;
    });
  },
  destroyed() {
    this.$parent.$refs.wrapper.style.position = '';
    this.$parent.$refs.cards.$el.style.display = 'block';

    this.loading.close();
  },
  data() {
    return {
      loading: null,
      plants: [],
      tabTitles: ['Species Information', 'Impact to Bushland', 'Help the Bushland'],
      speciesInfo: {}
    };
  },
  methods: {
    showSpecies(index) {
      this.speciesInfo = this.plants[index];
    }
  },
  watch: {
    plants: {
      deep: true,
      handler(val) {
        if (val.length) this.loading.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.plants {
  margin: 0 auto;

  @include font_size($m);
}
</style>
