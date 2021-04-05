
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import messages from '~/locales/en.js'


import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages
});

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: (h) => h(App),
})
