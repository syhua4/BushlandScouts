import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  Menu,
  MenuItem,
  Row,
  Col,
  Loading,
  Input,
  Select,
  Upload,
  Option,
  Button,
  Form,
  FormItem,
  Message,
  Popover,
  Switch,
  Backtop,
  Dialog
} from 'element-ui';
import './assets/css/base.scss';
import './theme/element/index.css';
import VueLazyLoad from 'vue-lazyload';
Vue.config.productionTip = false;
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Option);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Popover);
Vue.use(Switch);
Vue.use(Backtop);
Vue.use(Dialog);

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.use(VueLazyLoad, {
  loading: require('assets/images/placeholder.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
