import Vue from 'vue';
import store from 'store';
import VueI18n from 'vue-i18n';
import el_EnLocale from 'element-ui/lib/locale/lang/en';
import el_ZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from './lang/en';
import zhCNLocale from './lang/zh-CN';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: store.getters.lang, // set locale
  messages: {
    en: {
      ...enLocale,
      ...el_EnLocale
    },
    'zh-CN': {
      ...zhCNLocale,
      ...el_ZhLocale
    }
  }
})

export default i18n;
