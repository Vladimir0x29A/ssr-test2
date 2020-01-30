import axios from 'axios';
import i18n from '../i18n';

export default {
  state: {
    casesState: {},
    caseLinks: [],
    casesLang: '',
  },
  getters: {
    cases(state) {
      return state.casesState;
    },
    caseLinksGetter(state) {
      return state.caseLinks;
    },
    caseAliasGetter(state) {
      return state.caseLinks.map(cs => `/${cs.static_name}`);
    },
  },
  mutations: {
    updateCases(state, cases) {
      state.casesState = cases;
    },
    updateCaseLinks(state, payload) {
      state.caseLinks = [].concat(payload);
    },
    updateCasesLang(state, lang) {
      state.casesLang = lang;
    },
  },
  actions: {
    getCases({state, getters, commit}) {
      return new Promise((resolve, reject) => {
        if (getters.cases.sections && getters.cases.sections.length && state.casesLang === i18n.locale) {
          resolve(getters.cases);
        } else {
          axios.get('/get_goods')
            .then((response) => {
              commit('updateCases', response.data.data);
              commit('updateCasesLang', i18n.locale);
              resolve(getters.cases);
            })
            .catch((error) => {
              console.error('getWinners error:', error);
            });
        }
      });
    },
    fetchCasesLinks({getters, commit}) {
      return new Promise((resolve, reject) => {
        if (getters.caseLinksGetter.length) {
          resolve(getters.caseLinksGetter);
        } else {
          axios.get('/cases')
            .then((response) => {
              // console.log('Fetch cases links:', response.data.data.cases);
              commit('updateCaseLinks', response.data.data.cases);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
  }
}
