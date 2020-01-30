import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Terms from "./views/terms/Terms.vue";
import SiteMap from "./views/sitemap/SiteMap.vue";

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) return { selector: to.hash };
      if (savedPosition) return savedPosition;
      return { y: 0 };
    },
    routes: [
      {
        path: '/',
        component: Terms,
      },
      /*{
        path: '/terms',
        component: Terms,
      },*/
      {
        path: '/sitemap',
        component: SiteMap,
      },
      /*{
        path: '*',
        redirect: '/',
      },*/
    ],
  });
}

export function handleAnyRoute(store, router) {
  router.addRoutes([{
    path: '*',
    beforeEnter(to, from, next) {
      const navFails = () => {
        // if (typeof window !== 'undefined') {
          store.commit('updateErrorPageStatus', true);
          next();
        // } else {
        //   next(new Error());
        // }
      };
      if (!store.state.isCasesGot) {
        store.dispatch('fetchCasesLinks').then(() => {
          store.commit('updateCasesGotStatus', true);
          const alias = [].concat(store.getters.caseAliasGetter);
          const path = alias.splice(0, 1)[0];
          router.addRoutes([{
            path,
            component: Terms,
            alias,
          }]);
          if (store.getters.caseAliasGetter.includes(to.path)) {
            next(to);
          } else {
            navFails();
          }
        });
      } else {
        navFails();
      }
    },
  }]);
}
