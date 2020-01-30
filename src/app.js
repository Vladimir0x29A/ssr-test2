import Vue from 'vue';
import App from './App.vue';
import i18n from "./i18n";
import axios from 'axios';
import {sync} from 'vuex-router-sync';
import {createRouter, handleAnyRoute} from './router';
import {createStore} from './store';

import VueMeta from 'vue-meta';
import SetMeta from "./util/SetMeta";
Vue.use(SetMeta);
Vue.use(VueMeta);

Vue.config.productionTip = false;
Vue.config.devtools = true;

export function createApp() {
  const router = createRouter();
  const store = createStore();

  axios.interceptors.request.use(function (config) {
    // const token = store.state.user.token;

    /*if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }*/

    config.baseURL = store.state.baseApiUrl;
    config.params = {
      ...config.params,
      // ...requestDebug,
      lang: i18n.locale,
    };

    return config;
  });

  handleAnyRoute(store, router);

  sync(store, router);

  const app = new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
  });

  return {app, router, store};
}
