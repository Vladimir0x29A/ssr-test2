import Vue from 'vue';
import Vuex from 'vuex';

import cases from "./modules/cases";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      baseApiUrl: 'http://api.vue.kobal.cc',
      someVal: false,
      isErrorPage: false,
      isCasesGot: false,
    }),
    mutations: {
      updateStoreVal(store, payload) {
        store.someVal = payload;
      },
      updateErrorPageStatus(state, payload) {
        state.isErrorPage = payload;
      },
      updateCasesGotStatus(state, payload) {
        state.isCasesGot = payload;
      },
    },
    modules: {
      cases,
    },
  });
}
