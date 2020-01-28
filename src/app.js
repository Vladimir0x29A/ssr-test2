import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './router';

Vue.config.productionTip = false;
Vue.config.devtools = true;

export function createApp() {
  const router = createRouter();

  const app = new Vue({
    router,
    render: h => h(App),
  });

  return {app, router};
}
