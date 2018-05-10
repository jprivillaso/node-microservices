import Vue from 'vue';
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueGoodTable);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
