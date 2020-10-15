import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home/Home';
import Report from 'views/Report/Report';
import Setting from 'views/Setting/Setting';
import Weeds from 'views/Weeds/Weeds';
import WeedInfo from 'views/Weeds/WeedInfo';
import About from 'views/Footer/About';
import Privacy from 'views/Footer/Privacy';
import Copyright from 'views/Footer/Copyright';
import Attributions from 'views/Footer/Attributions';
import NotFound from 'views/NotFound/NotFound';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/weeds',
    name: 'Weeds',
    component: Weeds
  },
  {
    path: '/weeds/:id',
    name: 'WeedInfo',
    component: WeedInfo
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/copyright',
    name: 'Copyright',
    component: Copyright
  },
  {
    path: '/attributions',
    name: 'Attributions',
    component: Attributions
  },
  {
    name: '404',
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
