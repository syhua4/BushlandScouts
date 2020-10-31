// #region snippet1
<template>
  <div id="report">
    <img :src="image[themeNum]" alt="report background" class="report-bg" />
    <el-popover
      v-show="!isMobile"
      placement="bottom"
      title="Report an unusual plant pest"
      width="200"
      trigger="click"
      content="Report an unusual plant pest immediately on Exotic Plant Pest Hotline 1800084881."
    >
      <el-button slot="reference" type="primary" icon="el-icon-phone" circle class="popover" />
    </el-popover>
    <el-dialog title="" :visible.sync="showPopup" width="40%">
      <span
        >Oops, it seems like you have made 2 failed attempts. Do you want to re-visit some weeds
        around you?</span
      >
      <div class="link-wrapper">
        <span
          v-for="item in weedsAroundMe"
          :key="item.Species_ID"
          @click="$router.push(`/weeds/${item.Species_ID}`)"
          >{{ item.Common_name }}</span
        >
      </div>
    </el-dialog>
    <div class="map-wrapper">
      <i class="iconfont icon-close" @click="$router.go(-1)" v-show="!isMobile" />
      <mapbox class="map" ref="map" @getMarker="getMarker" />
      <div class="report-form">
        <report-form @uploaded="uploaded" ref="form" @failPopup="failPopup" />
      </div>
      <div class="report-btn">
        <el-button type="primary" plain circle size="medium" @click.native="toggleReportForm"
          >Report</el-button
        >
      </div>
      <div class="report-form--mobile" v-if="showForm">
        <i class="iconfont icon-close" @click="toggleReportForm" />
        <report-form
          class="report-form--mobile"
          @uploaded="uploaded"
          ref="form"
          @failPopup="failPopup"
        />
      </div>
    </div>
  </div>
</template>

// #endregion snippet1

// #region snippet2
<script>
import Mapbox from 'components/content/Map/Map';
import ReportForm from 'views/Report/ReportForm';
import { mapGetters } from 'vuex';
export default {
  name: 'Report',
  components: { ReportForm, Mapbox },
  data() {
    return {
      showForm: false,
      accessToken:
        'pk.eyJ1Ijoic3lodWE0IiwiYSI6ImNrMWhxZTJ4MDAwZ3kzbm53dGdwNnFleTQifQ.YzVccW0v9f4jV-kEAkOX6g',
      markers: [],
      themeNum: 0,
      image: {
        '': require('assets/images/report-bg.png'),
        1: require('assets/images/report-bg1.png'),
        2: require('assets/images/report-bg2.png')
      },
      showPopup: false,
      weedsAroundMe: []
    };
  },
  created() {
    let theme = document.documentElement.getAttribute('data-theme') || 0;
    this.themeNum = theme.replace(/^\D+/g, '');
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods: {
    getMarker(markers) {
      this.markers = markers;
    },
    toggleReportForm() {
      this.showForm = !this.showForm;
    },
    togglePopup() {
      this.showPopup = false;
    },
    failPopup() {
      this.showPopup = true;
      this.weedsAroundMe = this._removeDuplicate().slice(0, 3);
    },
    _removeDuplicate() {
      const result = [];
      const map = new Map();
      for (const item of this.markers) {
        if (!map.has(item.Species_ID)) {
          map.set(item.Species_ID, true); // set any value to Map
          result.push({
            Common_name: item.Common_name,
            Datetime: item.Datetime,
            Distance: item.Distance,
            IMAGE: item.IMAGE,
            Latitude: item.Latitude,
            Longitude: item.Longitude,
            Postcode: item.Postcode,
            Reporter: item.Reporter,
            Species_ID: item.Species_ID,
            Suburb: item.Suburb,
            Verified: item.Verified
          });
        }
      }
      return result;
    },

    uploaded(marker) {
      this.$refs.map.w_location.push(marker);
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

// #endregion snippet2

// #region snippet3
<style lang="scss" scoped>
#report {
  height: calc(100vh - 75px);
  overflow: hidden;
  padding-top: 75px;
  display: flex;
  align-items: center;
  position: relative;
  .report-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .popover {
    position: absolute;
    z-index: 100;
    bottom: 10px;
    right: 10px;
  }
  .link-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    span {
      @include font_color();
      text-decoration: underline;
      cursor: pointer;
    }
  }
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
// #endregion snippet3