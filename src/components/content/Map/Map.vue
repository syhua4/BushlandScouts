<template>
  <div id="map">
    <MglMap
      :accessToken="this.$parent.accessToken"
      :mapStyle="mapStyle"
      :center="coordinates"
      :attributionControl="false"
      @load="onMapLoad"
    >
      <transition name="fade">
        <div class="marker-detail" v-show="duplicatedCoords.length > 1 && showPopup">
          <i
            class="iconfont icon-close"
            @click="
              () => {
                showPopup = false;
              }
            "
          />
          <h2>Multiple weeds are found in this location:</h2>
          <div
            class="marker-detail-pop"
            v-for="item in duplicatedCoords"
            :key="item.Species_ID + Math.random() * 100"
          >
            <div class="header" @click="$router.push(`/weeds/${item.Species_ID}`)">
              {{ item.Common_name }}
            </div>
            <img :src="item.IMAGE" :alt="item.Common_name" v-if="item.IMAGE" />
            <p class="discoverer" v-if="item.Reporter">Scout: {{ item.Reporter }}</p>
            <p class="found" v-if="item.Datetime">Found: {{ formatDate(item.Datetime) }}</p>
            <p>Verified: {{ item.Verified ? 'Yes' : 'No' }}</p>
          </div>
        </div>
      </transition>
      <MglGeolocateControl position="top-right" />
      <MglMarker
        v-for="(item, index) in w_location"
        :key="index"
        :color="item.Verified != 0 ? '#00c3a4' : '#ff7675'"
        :coordinates="[item.Longitude, item.Latitude]"
        @click="findDuplicate([item.Longitude, item.Latitude])"
      >
        <MglPopup v-show="duplicatedCoords.length === 1">
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
import { MglMap, MglMarker, MglPopup, MglGeolocateControl } from 'vue-mapbox';
import { getWeedLocation } from 'networks/api';

export default {
  name: 'Map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglGeolocateControl
  },
  data() {
    return {
      mapActions: null,
      duplicatedCoords: [],
      showPopup: true,
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
    findDuplicate(coords) {
      this.showPopup = true;
      this.duplicatedCoords = this.w_location.filter(item => {
        return item.Longitude == coords[0];
      });
      console.log(this.duplicatedCoords);
    },
    async markMap(lon, lat) {
      await getWeedLocation(lon, lat).then(res => {
        this.w_location = res.data;
        this.$emit('getMarker', res.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.css';

#map {
  width: 60%;
  height: 70vh;
  ::v-deep.mapboxgl-marker svg {
    height: 21px;
  }
  .marker-detail {
    position: relative;
    padding: 10px 20px 10px 10px;
    height: 90%;
    max-width: 40%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(10px, -50%);
    border-radius: 10px;
    overflow: scroll;
    i {
      position: absolute;
      right: 10px;
      cursor: pointer;
      @include font_size($s);
    }
    h2 {
      line-height: 1;
      padding-bottom: 10px;
    }
    .marker-detail-pop {
      @include font_size($ms);
      margin-bottom: 20px;
      .header {
        margin: 5px 0 2px;
        @include font_color();

        font-weight: 600;
        text-align: left;
        cursor: pointer;
      }
      img {
        width: 100%;
        max-height: 100px;
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }
  .mapboxgl-ctrl button .mapboxgl-ctrl-icon {
    background-position: 0;
  }
  .mapboxgl-user-location-accuracy-circle {
    display: none;
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
        @include font_color();

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
      @include bg_color();
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

@media (max-width: 766px) {
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
