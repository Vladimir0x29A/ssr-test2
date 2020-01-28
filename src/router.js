import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import First from './components/First.vue';
import Second from './components/Second.vue';

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
      },
      {
        path: '/first',
        component: First,
      },
      {
        path: '*',
        component: Second,
      },
    ],
  });
}
