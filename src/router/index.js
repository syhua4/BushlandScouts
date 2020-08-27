import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home/Home';
import Pests from 'views/Pests/Pests';
import Games from 'views/Games/Games';
import Explore from 'views/Explore/Explore';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pests',
    name: 'Pests',
    component: Pests
  },
  {
    path: '/games',
    name: 'Game',
    component: Games
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
