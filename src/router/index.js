import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home/Home2';
import Pests from 'views/Pests/Pests';
import Games from 'views/Games/Games';
import Explore from 'views/Explore/Explore';
import JigsawPuzzle from 'views/Games/ChildComp/JigsawPuzzle';
import WhacAPest from 'views/Games/ChildComp/WhacPest';
import NotFound from 'views/NotFound/NotFound';
import Animals from 'views/Pests/ChildComp/Animals';
import Plants from 'views/Pests/ChildComp/Plants';

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
    component: Pests,
    children: [
      {
        name: 'Animals',
        path: 'animals',
        component: Animals
      },
      {
        name: 'Plants',
        path: 'plants',
        component: Plants
      }
    ]
  },
  {
    path: '/games',
    name: 'Game',
    component: Games,
    children: [
      {
        name: 'JigsawPuzzle',
        path: 'jigsaw',
        component: JigsawPuzzle
      },
      {
        name: 'WhacAPest',
        path: 'whac-a-pest',
        component: WhacAPest
      }
    ]
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
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
  base: '/',
  routes
});

export default router;
