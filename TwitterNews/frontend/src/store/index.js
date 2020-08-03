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
      // eslint-disable-next-line no-param-reassign
      topic.name = topic.name
        .replace(/#/g, '')
        .replace(/_/g, ' ')
        .replace(/([A-Z][a-z0-9]+)/g, ' $1 ')
        .replace(/\s{2}/g, ' ')
        .trim()
        .toLowerCase();
      this.state.trendingTopic = topic;
    },
  },
});
