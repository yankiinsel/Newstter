<template>
    <div id="trending-topics">
      <ul class="trending" id="mytopics">
        <h2 v-if="!didFindTopics"> Rate limit exceeded</h2>
        <h2 v-else>2. Choose A Topic</h2>
        <li v-for="topic in topics" :key="topic.name">
          <b-button
            class="buttonlink"
            variant="'link'"
            v-bind:style="{
              fontSize: getFontSize(topic.tweet_volume)
            }"
            v-on:click="setTrendingTopic(topic)">
            {{ topic.name }}
          </b-button>
          <br>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import topicsService from '../services/TopicsService';

export default {
  name: 'TrendingTopicsView',

  data() {
    return {
      didFindTopics: true,
      topics: [],
      picked: '',
    };
  },

  created() {
    // eslint-disable-next-line no-unused-vars
    this.$store.watch(state => this.$store.state.selectedCountry,
      (selectedCountry) => {
        topicsService.getTopics(selectedCountry.id, (res) => {
          this.topics = res.data[0].trends;
        });
      });
  },

  methods: {
    ...mapMutations([
      'setTrendingTopic',
    ]),

    getFontSize(volume) {
      const retVal = `${5 * Math.log(parseInt(volume, 10)) / Math.log(7)}px`;
      return retVal;
    },

  },
};
</script>

<style>
#trending-topics {
  grid-area: trending;
  background-color: #30303d;
  color: #fff;
  padding-bottom: 48px;
  margin: 0;
}


.buttonlink:hover {
    color: rgb(150, 219, 185) !important;
    text-decoration: none;
}

.buttonlink {
  color: #42b983 !important;
  margin-top: 1px;
  margin-bottom: 1px;
  background-color: transparent;
  border: none;
}

.buttonlink:focus {
  outline: none !important;
}

</style>
