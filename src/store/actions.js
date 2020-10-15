import { SET_IS_MOBILE, SET_DPR, SET_SOUND } from './mutation-types';

export default {
  setDpr({ commit }, num) {
    commit(SET_DPR, num);
  },
  setIsMobile({ commit }, status) {
    commit(SET_IS_MOBILE, status);
  },
  setSound({ commit }, status) {
    commit(SET_SOUND, status);
  }
};
