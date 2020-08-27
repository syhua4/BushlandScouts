import { SET_IS_MOBILE } from './mutation-types';

export default {
  [SET_IS_MOBILE](state, status) {
    state.isMobile = status;
  }
};
