import { SET_IS_MOBILE, SET_DPR, SET_LOCATION } from './mutation-types';

export default {
  [SET_DPR](state, num) {
    state.dpr = num;
  },
  [SET_IS_MOBILE](state, status) {
    state.isMobile = status;
  },
  [SET_LOCATION](state, location_arr) {
    state.location = location_arr;
  }
};
