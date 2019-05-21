import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

Vue.use(Donut);

import beosStore from './beosStore';

const vuexPersist = new VuexPersist({
  key: 'beosapp',
  storage: localStorage,
});

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: {
      beosStore,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
