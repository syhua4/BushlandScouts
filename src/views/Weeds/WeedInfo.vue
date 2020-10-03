<template>
  <div class="weed-info">
    <div class="main">
      <el-button
        type="primary"
        class="back-btn"
        @click="$router.push('/weeds')"
        :size="isMobile ? 'mini' : 'medium'"
        >{{ isMobile ? 'Back' : 'Back to Weeds' }}</el-button
      >
      <fullpage :content="info" v-if="Object.keys(info).length" />
    </div>
  </div>
</template>

<script>
import Fullpage from 'components/content/Fullpage/Fullpage';
import { getWeedInfo } from 'networks/api';
import { mapGetters } from 'vuex';
export default {
  name: 'WeedInfo',
  components: {
    Fullpage
  },
  data() {
    return {
      info: {},
      loading: null
    };
  },
  created() {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    getWeedInfo(Number(this.$route.params.id)).then(res => {
      this.info = res.data;
    });
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  watch: {
    info: {
      deep: true,
      handler(val) {
        if (Object.keys(val).length) {
          this.loading.close();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.weed-info {
  height: calc(100vh - 75px);
  overflow: hidden;
  padding-top: 75px;
  @include font_size($m);
  position: relative;
  .back-btn {
    position: absolute;
    top: 180px;
    left: 50px;
    z-index: 2;
  }
}
@media (max-width: 767px) {
  .weed-info {
    height: calc(100vh - 58px);
    padding-top: 58px;
    .back-btn {
      left: 10px;
      width: 50px;
      top: 165px;
      padding: 7px;
    }
  }
}
</style>
