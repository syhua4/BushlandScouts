import { SET_IS_MOBILE, SET_DPR } from './mutation-types';

export default {
  [SET_DPR](state, num) {
    state.dpr = num;
  },
  [SET_IS_MOBILE](state, status) {
    state.isMobile = status;
  }
};
