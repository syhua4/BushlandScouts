<template>
  <div id="map">
    <MglMap
      :accessToken="this.$parent.accessToken"
      :mapStyle="mapStyle"
      :center="coordinates"
      :attributionControl="false"
      @load="onMapLoad"
    >
      <MglMarker
        v-for="(item, index) in w_location"
        :key="index"
        color="#00c3a4"
        :coordinates="[item.Longitude, item.Latitude]"
      >
        <MglPopup>
          <div class="popup-wrapper">
            <div class="header">
              <i class="iconfont icon-plant-verified" v-if="item.Verified != 0" />
              {{ item.Common_name }}
            </div>
            <p class="discoverer" v-if="item.Reporter">Scout: {{ item.Reporter }}</p>
            <p class="found" v-if="item.Datetime">Found: {{ formatDate(item.Datetime) }}</p>
            <div class="popup-btn" @click="$router.push(`/weeds/${item.Species_ID}`)">
              Discover More
            </div>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox';
import { getWeedLocation } from 'networks/api';

export default {
  name: 'Map',
  components: {
    MglMap,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      mapActions: null,
      w_location: [],
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      coordinates: [144.946457, -37.840935],
      currentLocation: null
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
  computed: {
    formatDate() {
      return function(date) {
        let str = '' + date;
        return str.slice(0, 4) + '-' + str.slice(4, -2) + '-' + str.slice(-2);
      };
    }
  },
  watch: {
    mapActions: {
      deep: true,
      handler(val) {
        if (Object.keys(val).length) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              this.currentLocation = [pos.coords.longitude, pos.coords.latitude];
              this.mapActions.flyTo({
                center: this.currentLocation,
                zoom: 10,
                speed: 1
              });
              this.markMap(pos.coords.longitude, pos.coords.latitude);
            },

            err => {
              console.log(err);
              this.mapActions.flyTo({
                center: this.coordinates,
                zoom: 10,
                speed: 1
              });
              this.markMap(this.coordinates[0], this.coordinates[1]);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
          );
        }
      }
    }
  },
  methods: {
    onMapLoad(event) {
      this.mapActions = event.component.actions;
    },
    async markMap(lon, lat) {
      await getWeedLocation(lon, lat).then(res => {
        this.w_location = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 60%;
  height: 70vh;
  ::v-deep.mapboxgl-marker svg {
    height: 21px;
  }
  .popup-wrapper {
    max-width: 120px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
      font-weight: 700;
      text-align: center;
      line-height: 1;
      margin-bottom: 5px;
      .icon-plant-verified {
        color: $background-color;
        font-weight: 400;
      }
    }
    p {
      margin: 0;
    }
    .popup-btn {
      cursor: pointer;
      text-align: center;
      color: #fff;
      width: 100px;
      height: 18px;
      line-height: 18px;
      border-radius: 8px;
      margin-top: 5px;
      background-color: $background-color;
    }
  }
}

@media (max-width: 766px) {
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
