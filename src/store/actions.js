import { SET_IS_MOBILE, SET_DPR, SET_LOCATION } from './mutation-types';

export default {
  setDpr({ commit }, num) {
    commit(SET_DPR, num);
  },
  setIsMobile({ commit }, status) {
    commit(SET_IS_MOBILE, status);
  },
  setLocation({ commit }, location_arr) {
    commit(SET_LOCATION, location_arr);
  }
};
