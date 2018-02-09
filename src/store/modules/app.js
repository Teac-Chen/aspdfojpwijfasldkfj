import Cookies from 'js-cookie'
const LangKey = 'LANG'
import axios from 'axios';

const app = {
  state: {
    baseURL: '',
    lang: Cookies.get(LangKey) || 'zh-CN'
  },
  mutations: {
    SET_BASEURL: (state, baseURL) => {
      state.baseURL = baseURL;
    },
    SET_LANG: (state, lang) => {
      state.lang = lang;
    }
  },
  actions: {
    GetBaseURL({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('./static/config.properties')
          .then(res => {
            if (res) {
              const properties = {};
              const props = res.split(/\n/);
              for (let i = 0; i < props.length; i++) {
                if (props[i] !== '') {
                  const prop = props[i].split('=');
                  properties[prop[0]] = prop.length === 2 ? prop[1] : '';
                }
              }
              commit('SET_BASEURL', properties.API_URL + properties.API_Path);
              resolve();
            }
          })
          .catch(error => {
            console.log('GetBaseURL occur error', error);
            reject(error);
          });
      });
    },
    SwitchLang({ commit }, lang) {
      Cookies.set(LangKey, lang);
      commit('SET_LANG', lang);
    }
  }
};
export default app;
