<template>
    <div id="trending-topics">
      <ul class="trending" id="mytopics">
        <h2 v-if="!didFindTopics"> Rate limit exceeded</h2>
        <h2 v-else>2. Choose A Topic</h2>
        <li v-for="topic in topics" :key="topic.name">
          <b-button class="buttonlink" variant="'link'"
          :style="{ fontSize: 5*Math.log(parseInt(topic.tweet_volume)) / Math.log(7) + 'px'}"
              v-on:click="getNews(topic)">{{ topic.name }}</b-button>
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

    getNews(topic) {
      this.setTrendingTopic(topic);
    },
  },
};
</script>

<style>
.trending {
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
}

.buttonlink:focus {
  outline: none !important;
}
</style>
