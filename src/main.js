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
  Loading,
  Pagination,
  Input,
  Select,
  Upload,
  Option,
  Button,
  Form,
  FormItem,
  Message
} from 'element-ui';
import './assets/css/base.scss';
import './theme/element/index.css';

Vue.config.productionTip = false;
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Option);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
