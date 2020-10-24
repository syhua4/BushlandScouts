<template>
  <div id="weeds">
    <div class="container">
      <h2>WEEDS</h2>
      <div class="weed-desc">
        <p>Weeds are plants growing where it is not wanted.</p>
        <p>They outgrow native plants and takeover the bushland.</p>
        <p>Native animals can lose their home and food.</p>
        <p>Some weeds can also affect poeple's health, by giving them allergies.</p>
      </div>

      <div class="weed-location">
        <p>Is there any weeds around you?</p>
        <p>Find the nearby top 5 weeds by enter your postcode!</p>
        <el-form
          ref="zipCode"
          :model="zipCode"
          size="medium"
          class="zip-wrapper"
          label-width="0px"
          @submit.native.prevent
        >
          <el-form-item prop="zipInput">
            <el-input
              v-model.number="zipCode.zipInput"
              placeholder="Enter Postcode"
              :maxlength="4"
              @keyup.enter.native="submitForm"
              @keyup.delete.native="resetForm"
              type="zipInput"
            />
            <span>OR</span>
            <el-select
              v-model="zipCode.topZip"
              clearable
              placeholder="Choose among the active postcode"
            >
              <el-option
                v-for="(item, index) in topZipOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="submitForm" size="small">Search</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="hidden-gallery">
        <gallery :content="weeds" background @showSpecies="showSpecies" />
        <div class="gallery-placeholder" v-show="noWeed || !weeds.length">
          {{
            noWeed
              ? 'Congratulations! There are no weeds in your area!'
              : 'Find the nearby weeds by enter your postcode!'
          }}
        </div>
      </div>

      <div class="weed-text">Check out some top dangerous weeds in Victoria!</div>
      <gallery :content="wons" @showSpecies="showSpecies" class="wons" />
    </div>
  </div>
</template>

<script>
import { searchNearbyWeed } from 'networks/api';
import Gallery from 'components/content/Gallery/Gallery';
export default {
  name: 'Weeds',
  components: { Gallery },
  created() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  },
  data() {
    return {
      loading: null,
      noWeed: false,
      placeholder: this.noWeed
        ? 'Congratulations! There are no weeds in your area!'
        : 'Find the nearby top 5 weeds by enter your postcode!',
      weeds: [],
      wons: [
        {
          Species_ID: 25,
          Common_name: "Paterson's Curse",
          IMAGE: 'https://i.ibb.co/Jv34F5K/Paterson-039-s-Curse.jpg'
        },
        {
          Species_ID: 24,
          Common_name: 'Chilean Needle Grass',
          IMAGE: 'https://i.ibb.co/PjwVHM0/Chilean-Needle-Grass.jpg'
        },
        {
          Species_ID: 15,
          Common_name: 'Noogoora Burr',
          IMAGE: 'https://i.ibb.co/Rjxp29B/Noogoora-Burr.jpg'
        }
      ],
      zipCode: {
        zipInput: '',
        topZip: ''
      },
      topZipOptions: [
        {
          label: '3029 - Tarneit',
          value: 3029
        },
        {
          label: '3336 - Deanside',
          value: 3336
        },
        {
          label: '3046 - Glenroy',
          value: 3046
        },
        {
          label: '3024 - Wyndham Value',
          value: 3024
        },
        {
          label: '3639 - Barmah',
          value: 3639
        }
      ]
    };
  },

  methods: {
    submitForm() {
      console.log(this.zipCode);
      if (!this.zipCode.zipInput && !this.zipCode.topZip) {
        this.$message.error(
          'Please enter either a postcode or select one from the top five from the drop down menu.'
        );
        return;
      } else if (this.zipCode.zipInput && this.zipCode.topZip) {
        this.zipCode.topZip = '';
        this.submitForm();
      } else if (!/^3\d{3}$/.test(this.zipCode.zipInput | this.zipCode.topZip)) {
        this.$message.error(
          'Oops, Victoria postcode should be 4 digits and it starts with 3. Please try again.'
        );
        return;
      } else {
        this.weeds = [];
        this.noWeed = false;
        if (this.loading) {
          this.loading.close();
        }
        this.startLoading();
        searchNearbyWeed(this.zipCode.zipInput ? this.zipCode.zipInput : this.zipCode.topZip).then(
          res => {
            if (res.status === 200) {
              this.weeds = res.data;
              this.noWeed = !res.data.length;
            }
          }
        );
      }
    },
    resetForm() {
      this.weeds = [];
    },
    showSpecies(id) {
      this.$router.push(`/weeds/${id}`);
    },
    startLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Checking Postcode',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  },
  watch: {
    weeds: {
      deep: true,
      handler(val) {
        if (val.length || this.noWeed) {
          this.loading.close();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#weeds {
  @include bg_color_sub();
  overflow-x: hidden;
  padding-top: 75px;
  text-align: center;

  .container {
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    &::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      top: -150px;
      right: -150px;
      width: 300px;
      height: 300px;
      @include bg_color_sub_before();
      animation: transform 25s ease-in-out infinite both alternate,
        movement 20s ease-in-out infinite both;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 100px;
      left: -220px;
      width: 400px;
      height: 400px;
      @include bg_color_sub_after();
      animation: transform 25s ease-in-out infinite both alternate,
        movement 20s ease-in-out infinite both;
    }
    h2 {
      margin: 30px 0 20px;
      @include font_size($ml);
      font-weight: 800;
    }
    .weed-text {
      margin-top: 40px;
      font-weight: 600;
    }
    .wons {
      margin-bottom: 30px;
    }
    .weed-location {
      margin-top: 20px;
      .el-form-item {
        width: 100%;
      }
      .zip-wrapper {
        display: flex;
        max-width: 800px;
        align-items: center;
        justify-content: space-between;
        margin: 20px auto;
        .el-input {
          width: 200px;
        }
        span {
          margin: 0 10px;
          font-weight: 600;
          @include font_color();
        }
        .el-select {
          width: 270px;
        }
        .el-button {
          display: inline;
          padding: 10px 15px;
          margin-left: 10px;
        }
        .el-form-item__error {
          padding-left: 10px;
        }
      }
    }
    .hidden-gallery {
      margin-top: -25px;
      animation: 2s up;
      position: relative;
      .gallery-placeholder {
        max-width: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        @include font_color();
      }
    }
  }
  @keyframes up {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes transform {
    0%,
    100% {
      border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
    }
    14% {
      border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
    }
    28% {
      border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
    }
    42% {
      border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
    }
    56% {
      border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
    }
    70% {
      border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
    }
    84% {
      border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
    }
  }

  @keyframes movement {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: translateY(20%) rotateY(10deg);
    }
  }
  @media (max-width: 600px) {
    .container {
      padding: 0 20px;
      .weed-location .zip-wrapper {
        max-width: 100%;
        .el-input,
        .el-select,
        .el-button {
          width: 100%;
        }

        .el-button {
          margin: 20px 0 0 0;
        }
      }
    }
  }
}
</style>
