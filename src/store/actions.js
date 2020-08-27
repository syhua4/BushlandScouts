import { SET_IS_MOBILE } from './mutation-types';

export default {
  setIsMobile({ commit }, status) {
    commit(SET_IS_MOBILE, status);
  }
};
