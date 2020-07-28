import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCountry: '',
    trendingTopic: '',
  },
  mutations: {
    selectCountry(state, country) {
      this.state.selectedCountry = country;
    },
    setTrendingTopic(state, topic) {
      this.state.trendingTopic = topic;
    },
  },
});
