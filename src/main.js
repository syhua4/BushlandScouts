import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  Menu,
  MenuItem,
  Row,
  Col,
  Submenu,
  MenuItemGroup,
  Card,
  Dialog,
  Loading
} from 'element-ui';
import './assets/css/base.scss';
import './assets/js/DragDropTouch';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Dialog);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.use(VueLazyLoad, {
  loading: require('assets/images/placeholder.png')
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
