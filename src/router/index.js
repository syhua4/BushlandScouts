import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home/Home';
import Report from 'views/Report/Report';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
