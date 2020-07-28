import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCountry: '',
  },
  mutations: {
    selectCountry(state, country) {
      // mutate state
      this.state.selectedCountry = country;
    },
  },
});
