import i18n from '@/locales/index';
// dataio
import DateFnsAdapter from '@date-io/date-fns';
import enUS from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';
import zhTW from 'date-fns/locale/zh-TW';
import ja from 'date-fns/locale/ja';
import th from 'date-fns/locale/th';
// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { md3 } from 'vuetify/blueprints';
import { createVuetify } from 'vuetify';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { myCustomLightTheme } from '@/assets/style/defaltTheme';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi' //图标
  },
  blueprint: md3, //蓝图
  components,
  directives,
  // theme: {
  //   defaultTheme: 'dark',
  // },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  date: {
    // 日期组件的国际化
    adapter: DateFnsAdapter,
    locale: {
      en: enUS,
      ja,
      zhTW,
      zhCN,
      th
    }
  }
});

export default vuetify;
