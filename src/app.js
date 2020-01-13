const Vue = require('vue');
const App = require('./components/App.vue');

export default function createApp() {
  const app = new Vue({
    render: h => h(App),
  });

  return {app};
};
