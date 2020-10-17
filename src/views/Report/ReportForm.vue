<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="" prop="uploadImage" class="img-upload-wrapper">
        <el-upload
          class="upload"
          ref="uploadImage"
          :action="uploadUrl"
          :on-change="afterRead"
          :on-remove="handleRemove"
          :auto-upload="false"
          :file-list="fileList"
          list-type="picture-card"
          accept="image/jpeg, image/png, image/jpg"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">Note: The maximum image size is 1MB.</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="Nickname" prop="Nickname">
        <el-input
          :disabled="!verified"
          v-model="formData.Nickname"
          placeholder="Scout name"
          :maxlength="10"
          show-word-limit
          clearable
          prefix-icon="el-icon-user"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="Weed" prop="Weed">
        <el-select
          :disabled="!verified"
          v-model="formData.Weed"
          placeholder="What weed did you find?"
          filterable
          clearable
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in WeedOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large" class="el-btn-group">
        <el-button type="primary" class="submit-btn" @click="submitForm">Submit</el-button>
        <el-button @click="resetForm" type="primary">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { compressImage } from 'utils/CompressImg';
import { scanImage, uploadReport } from 'networks/api';
export default {
  created() {
    this.getLocation();
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  },
  data() {
    return {
      loading: null,
      formData: {
        uploadImage: null,
        Nickname: '',
        Weed: ''
      },
      location: {},
      rules: {
        Nickname: [],
        Weed: [
          {
            required: true,
            message: 'Please choose a weed species that you have found.',
            trigger: 'change'
          }
        ],
        uploadImage: [
          {
            required: true,
            message: 'Please upload an image.',
            trigger: 'change'
          }
        ]
      },
      fileList: [],
      uploadUrl: '',
      WeedOptions: [
        {
          label: 'African boxthorn',
          value: '18-African boxthorn'
        },
        {
          label: 'African daisy',
          value: '14-African daisy'
        },
        {
          label: 'Artichoke thistle',
          value: '13-Artichoke thistle'
        },
        {
          label: 'Boneseed',
          value: '6-Boneseed'
        },
        {
          label: 'Caltrop',
          value: '3-Caltrop'
        },
        {
          label: 'Cape tulip',
          value: '19-Cape tulip (one leaf)'
        },
        {
          label: 'Cardoon',
          value: '8-Cardoon'
        },
        {
          label: 'Chilean cestrum',
          value: '11-Chilean cestrum'
        },
        {
          label: 'Chilean needle grass',
          value: '24-Chilean needle grass'
        },
        {
          label: 'English broom',
          value: '9-English broom'
        },
        {
          label: 'Erect prickly pear',
          value: '5-Erect prickly pear'
        },
        {
          label: 'Flax-leaved broom',
          value: '23-Flax-leaved broom'
        },
        {
          label: 'Golden thistle',
          value: '1-Golden thistle'
        },
        {
          label: 'Gorse',
          value: '21-Gorse'
        },
        {
          label: 'Illyrian thistle',
          value: '20-Illyrian thistle'
        },
        {
          label: 'Khaki weed',
          value: '12-Khaki weed'
        },
        {
          label: 'Noogoora burr',
          value: '15-Noogoora burr'
        },
        {
          label: "Paterson's curse",
          value: '25-Paterson s Curse'
        },
        {
          label: 'Prickly pear (drooping)',
          value: '22-Prickly pear (drooping)'
        },
        {
          label: 'Serrated tussock',
          value: '10-Serrated tussock'
        },
        {
          label: 'Silverleaf nightshade',
          value: '2-Silverleaf nightshade'
        },
        {
          label: 'Skeleton weed',
          value: '16-Skeleton weed'
        },
        {
          label: 'Spiny broom',
          value: '7-Spiny broom'
        },
        {
          label: 'Spiny burr grass',
          value: '17-Spiny burr grass'
        },
        {
          label: 'Star thistle',
          value: '4-Star thistle'
        },
        {
          label: 'Stemless thistle',
          value: '26-Stemless thistle'
        }
      ],
      verified: false,
      verifiedSpecies: '',
      failAttempt: 0
    };
  },

  methods: {
    _getDate() {
      let d = new Date();
      let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      let year = d.getFullYear();
      return String(year) + String(month) + String(date);
    },
    submitForm() {
      if (!Object.keys(this.location).length) {
        this.$message.error('Report can not be sent without the location');
        return;
      }
      var sameLocation = this.$parent.markers.filter(el => {
        return (
          el.Latitude == this.location.latitude &&
          el.Longitude == this.location.longitude &&
          el.Species_ID == this.formData.Weed.split('-')[0]
        );
      });
      if (sameLocation.length) {
        this.$message.error('A report on this weed has already been placed!');
        return;
      }
      this.$refs['elForm'].validate(valid => {
        if (!valid) {
          return;
        } else {
          const fd = new FormData();
          let date = this._getDate();
          console.log(
            this.formData.Weed.split('-')[1]
              .toLowerCase()
              .trim()
          );
          let verified =
            this.verifiedSpecies ==
            this.formData.Weed.split('-')[1]
              .toLowerCase()
              .trim()
              ? 1
              : 0;
          fd.append('image', this.formData.uploadImage);
          fd.append('name', this.formData.Nickname);
          fd.append('weed', this.formData.Weed);
          fd.append('latitude', this.location.latitude);
          fd.append('longitude', this.location.longitude);
          fd.append('suburb', this.location.suburb);
          fd.append('postcode', this.location.postcode);
          fd.append('verified', verified);
          fd.append('date', date);
          this.loading = this.$loading({
            lock: true,
            text: 'Sending Report',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          uploadReport(fd).then(res => {
            this.verified = false;
            if (res.status == 200) {
              this.$parent.showForm = false;
              let marker = {
                Species_ID: this.formData.Weed.split('-')[0],
                Common_name:
                  this.formData.Weed.split('-')[0] == 25
                    ? "Paterson's curse"
                    : this.formData.Weed.split('-')[1],
                Datetime: date,
                Latitude: this.location.latitude,
                Longitude: this.location.longitude,
                Reporter: this.formData.Nickname,
                Verified:
                  this.verifiedSpecies ==
                  this.formData.Weed.split('-')[1]
                    .toLowerCase()
                    .trim()
              };
              this.$emit('uploaded', marker);
            } else {
              console.log(res.message);
              this.loading.close();
              this.$message.error('Report submission failed. Please try again!');
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs.uploadImage.clearFiles();
      this.$refs['elForm'].resetFields();
    },
    // read the image file
    async afterRead(file) {
      this.verified = false;
      this.verifiedSpecies = '';
      this.loading = this.$loading({
        lock: true,
        text: 'Checking image',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let blob = null;
      this.$refs['elForm'].clearValidate('uploadImage');
      if (!this._validateFile(file)) {
        this.$refs.uploadImage.clearFiles();
        return;
      }
      if (file.size > 100000) {
        console.log('large');
        let _file = this.$refs.uploadImage.uploadFiles[0];
        await this._compress(_file).then(res => {
          blob = new window.File([res], file.name, { type: file.type });
        });
      } else {
        blob = file.raw;
      }
      this.formData.uploadImage = blob;
      const imageForm = new FormData();
      imageForm.append('image', blob);
      console.log(blob);
      await scanImage(imageForm).then(res => {
        this.loading.close();
        console.log(res);
        if (res.message.trim() != 'negative') {
          this.verified = true;
          this.verifiedSpecies = res.message.toLowerCase().trim();
          this.failAttempt = 0;
        } else {
          this.$message.error('Oops, you are too close to identify it... better luck next time!');
          this.$refs.uploadImage.clearFiles();
          this.failAttempt = this.failAttempt + 1;
          if (this.failAttempt > 1) {
            this.$emit('failPopup');
          }
        }
      });
    },
    async _compress(file) {
      for (let i = 500; i > 0; i -= 50) {
        let result = await compressImage(file.url, i);
        if (result.size < 100000) return result;
      }
    },
    _validateFile(file) {
      let isRightSize = file.size / 1024 / 1024 < 1;
      if (!isRightSize) {
        this.$message.error('Image size exceeds 1MB.');
      }
      return isRightSize;
    },
    async getLocation() {
      await navigator.geolocation.getCurrentPosition(
        position => {
          this.location['latitude'] = position.coords.latitude.toFixed(5);
          this.location['longitude'] = position.coords.longitude.toFixed(5);
          this._geoReverse(position.coords.latitude, position.coords.longitude);
        },
        () => {
          this.$message('Please allow location service to make a report.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    },
    async _geoReverse(lat, lon) {
      await axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${this.$parent.accessToken}&types=postcode%2Clocality`
        )
        .then(res => {
          this.location['postcode'] = res.data.features[0].text;
          this.location['suburb'] = res.data.features[1].text;
        });
    },
    handleRemove() {
      this.verified = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-upload__tip {
  line-height: 1.2;
}
.el-upload {
  width: 100%;
  overflow: hidden;
}
.upload {
  width: 100%;
  width: 150px;
  height: 150px;
  overflow: hidden;
}
.el-upload-list__item-thumbnail {
  object-fit: cover;
}

.el-form-item label {
  line-height: 1;
  font-weight: 600;
}
.el-btn-group {
  padding-top: 30px;
}
@media (max-width: 766px) {
  .el-form {
    padding: 35px 20px 20px;
    display: block;
    box-sizing: border-box;
    .img-upload-wrapper {
      display: flex;
      justify-content: center;
    }
  }
}

@media (max-width: 426px) {
  .el-form {
    margin-top: 20px;
  }
}
</style>
