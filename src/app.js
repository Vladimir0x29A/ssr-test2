import Vue from 'vue';
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.config.devtools = true;

export default function createApp() {
  const app = new Vue({
    render: h => h(App),
  });

  return {app};
};
