<template>
  <div id="report">
    <div class="map-wrapper">
      <i class="iconfont icon-close" @click="$router.go(-1)" v-show="!isMobile" />

      <mapbox class="map" ref="map" />
      <div class="report-form">
        <report-form @uploaded="uploaded" ref="form" />
      </div>
      <div class="report-btn">
        <el-button type="primary" plain circle size="medium" @click.native="toggleReportForm"
          >Report</el-button
        >
      </div>
      <div class="report-form--mobile" v-if="showForm">
        <i class="iconfont icon-close" @click="toggleReportForm" />
        <report-form class="report-form--mobile" @uploaded="uploaded" ref="form" />
      </div>
    </div>
  </div>
</template>

<script>
import Mapbox from 'components/content/Map/Map';
import ReportForm from 'views/Report/ReportForm';
import { mapGetters } from 'vuex';
export default {
  name: 'Report',
  components: { Mapbox, ReportForm },
  data() {
    return {
      showForm: false,
      accessToken:
        'pk.eyJ1Ijoic3lodWE0IiwiYSI6ImNrMWhxZTJ4MDAwZ3kzbm53dGdwNnFleTQifQ.YzVccW0v9f4jV-kEAkOX6g'
    };
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    toggleReportForm() {
      this.showForm = !this.showForm;
    },
    uploaded(marker) {
      this.$refs.map.w_location.unshift(marker);
      this.$refs.form.resetForm();
      this.$refs.form.loading.close();
      this.$message.success('Report has been uploaded!');
      this.$refs.map.mapActions.flyTo({
        center: [marker.Longitude, marker.Latitude],
        zoom: 14,
        speed: 1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#report {
  height: calc(100vh - 75px);
  overflow: hidden;
  background: url('~assets/images/report-bg.png');
  padding-top: 75px;
  display: flex;
  align-items: center;

  .map-wrapper {
    position: relative;
    background-color: #fff;
    margin: 0 auto;
    border: 20px solid #fff;
    width: 70vw;
    height: 70vh;
    box-shadow: 0px 10px 15px 0px rgba(153, 153, 153, 0.3);
    i {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      z-index: 10;
    }
  }
  .report-form {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 26vw;
  }
  .report-btn {
    display: none;
  }
  .report-form--mobile {
    height: 75vh;
    width: 90vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: #fff;
    border-radius: 10px;
    .icon-close {
      position: absolute;
      top: 0;
      right: 0;
      color: #999;
      margin: 10px;
      cursor: pointer;
      z-index: 10;
    }
  }
}

@media (max-width: 766px) {
  #report {
    padding-top: 58px;
    height: calc(100vh - 58px);
    .map-wrapper {
      width: 100vw;
      height: calc(100vh - 58px);
      border-width: 10px;
      border: none;
      box-sizing: border-box;
    }
    .report-form {
      display: none;
    }
    .report-btn {
      display: flex;
      position: absolute;
      bottom: 10%;
      z-index: 1;
      width: 100%;
      justify-content: center;
      button {
        width: 60px;
        height: 60px;
        transform: scale(1);
        animation: pulse-btn 2s infinite;
        box-shadow: 0 0 0 0 rgba($color: #00c3a4, $alpha: 1);
      }
    }
  }
}

@media (max-width: 426px) {
  #report {
    .report-btn {
      bottom: 20%;
    }
    .report-form--mobile {
      height: calc(100vh - 58px);
      width: 100vw;
      .icon-close {
        top: 10px;
        right: 5px;
      }
    }
  }
}

@keyframes pulse-btn {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba($color: #00c3a4, $alpha: 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba($color: #00c3a4, $alpha: 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba($color: #00c3a4, $alpha: 0);
  }
}
</style>
