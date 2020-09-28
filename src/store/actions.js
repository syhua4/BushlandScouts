import { SET_IS_MOBILE, SET_DPR } from './mutation-types';

export default {
  setDpr({ commit }, num) {
    commit(SET_DPR, num);
  },
  setIsMobile({ commit }, status) {
    commit(SET_IS_MOBILE, status);
  }
};
