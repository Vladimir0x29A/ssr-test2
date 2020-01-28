import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      storeVal: true,
    }),
    mutations: {
      updateStoreVal(store, payload) {
        store.storeVal = payload;
      },
    },
  });
}
