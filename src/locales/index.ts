import { createI18n } from 'vue-i18n';
import zhCNLocal from '@/locales/zhCN.json';
import zhTWLocal from '@/locales/zhTW.json';
import enLocal from '@/locales/en.json';
import jaLocal from '@/locales/ja.json';
import thLocal from '@/locales/th.json';
import { en, ja, th, zhHans, zhHant } from 'vuetify/locale';

const messages = {
  en: {
    $vuetify: {
      ...en,
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}'
      }
    },
    ...enLocal
  },
  zhCN: {
    $vuetify: {
      ...zhHans,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}'
      }
    },
    ...zhCNLocal
  },
  zhTW: {
    $vuetify: {
      ...zhHant,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}'
      }
    },
    ...zhTWLocal
  },
  ja: {
    $vuetify: {
      ...ja,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} の {2}'
      }
    },
    ...jaLocal
  },
  th: {
    $vuetify: {
      ...th,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}'
      }
    },
    ...thLocal
  }
};
const language = navigator.language || 'en'; // 获取浏览器的语言
const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: localStorage.getItem('lang') || language.replace('-', '') || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  messages
});
// "selectMainMonster": "主なモンスターを選択",
// "selectSecondaryMonster": "マイナーモンスターを選択",

export default i18n;
