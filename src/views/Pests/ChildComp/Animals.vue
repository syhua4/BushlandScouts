<template>
  <div class="animals">
    <modal :title="speciesInfo.COMMON_NAME" v-show="Object.keys(speciesInfo).length">
      <tab slot="modal-content" :titles="tabTitles" :speciesInfo="speciesInfo" />
    </modal>

    <gallery :content="animals" @showSpecies="showSpecies" />
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
  async created() {
    this.$parent.$refs.cards.$el.style.display = 'none';
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    await getAnimals().then(res => {
      this.animals = res.data;
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
      animals: [],
      tabTitles: ['Species Information', 'Impact to Bushland', 'Help the Bushland'],
      speciesInfo: {}
    };
  },
  methods: {
    showSpecies(index) {
      this.speciesInfo = this.animals[index];
    }
  },
  watch: {
    animals: {
      deep: true,
      handler(val) {
        if (val.length) this.loading.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.animals {
  margin: 0 auto;
  @include font_size($m);
}
</style>
