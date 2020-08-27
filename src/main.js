import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Menu, MenuItem, Row, Col, Submenu, MenuItemGroup, Card } from 'element-ui';
import './assets/css/base.scss';
import './assets/js/DragDropTouch';

Vue.config.productionTip = false;
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
